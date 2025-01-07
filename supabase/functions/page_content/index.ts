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
    let page_id = "";
    if (req.body) {
        const body = await req.json();
        token = body.providerToken;
        page_id = body.page_id;
    }

    try {
        const response = await axiod.get(
            `https://api.notion.com/v1/blocks/${page_id}/children`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Notion-Version": "2022-06-28",
                    "Content-Type": "application/json",
                },
            },
        );

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        const data = response.data;
        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
