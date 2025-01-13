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

    let prompt = "";
    let token = "";
    if (req.body) {
        const body = await req.json();
        token = body.openAiKey;
        prompt = body.prompt;
    }

    try {
        const response = await axiod.post(
            "https://api.openai.com/v1/chat/completions",
            {
                "model": "gpt-4o-mini",
                "messages": [
                    {
                        role: "system",
                        content:
                            "You are an expert in creating educational content. Generate multiple-choice questions based on the provided notes. Ensure the questions are relevant to the content and avoid generic responses.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            },
        );

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        const data = response.data.choices[0].message;
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
