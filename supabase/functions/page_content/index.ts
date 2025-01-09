// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { corsHeaders } from "../_shared/header.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  let token = "";
  let pageId = "";
  if (req.body) {
    const body = await req.json();
    token = body.providerToken;
    pageId = body.page_id;
  }

  const fetchChildren = async (
    blockId: string,
    accessToken: string,
    startCursor?: string,
  ) => {
    let pageContent = "";
    let nextCursor = startCursor || null;
    let hasMore = true;

    while (hasMore) {
      const response = await axiod.get(
        `https://api.notion.com/v1/blocks/${blockId}/children`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Notion-Version": "2022-06-28",
          },
          params: {
            page_size: 100,
            ...(nextCursor && { start_cursor: nextCursor }),
          },
        },
      );

      const data = response.data;
      hasMore = data.has_more;
      nextCursor = data.next_cursor;

      for (const element of data.results) {
        const type = element["type"];
        const richText = element[type]?.["rich_text"];

        if (richText) {
          richText.forEach((txt: { plain_text: string }) => {
            pageContent += txt["plain_text"] + "\n";
          });
        }

        if (element.has_children) {
          const childrenContent = await fetchChildren(element.id, accessToken);
          pageContent += childrenContent;
        }
      }
    }

    return pageContent;
  };

  try {
    const pageContent = await fetchChildren(pageId, token);

    return new Response(JSON.stringify({ content: pageContent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data from Notion API:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching data from Notion API" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});