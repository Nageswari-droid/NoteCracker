import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function usePageContent(
    accessToken,
    providerToken,
    pageId,
    context,
    enable
) {
    const [error, setError] = useState(null);

    const fetchLLMData = async(prompt) => {
        const API_KEY =
            import.meta.env.VITE_OPENAI_API_KEY;

        if (!prompt || !accessToken || !API_KEY) {
            return null;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SUPABASE_BASE_URL}/llm_openai`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        name: "Functions",
                        openAiKey: API_KEY,
                        prompt: prompt,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error("Fetch LLM Data error:", err);
            setError("Could not fetch LLM data. Please try again later.");
            return null;
        }
    };

    const pageContent = useQuery({
        queryKey: ["pageContent"],
        queryFn: async() => {
            if (!accessToken || !providerToken || !pageId || !context) {
                return null;
            }

            const cacheKey = pageId;
            const cacheData = sessionStorage.getItem(cacheKey);

            if (cacheData) {
                context = context + JSON.parse(cacheData).content;
                const llmData = await fetchLLMData(context);
                return llmData;
            }

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_SUPABASE_BASE_URL}/page_content`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            name: "Functions",
                            providerToken: providerToken,
                            page_id: pageId,
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                sessionStorage.setItem(cacheKey, JSON.stringify(data));
                context = context + data.content;

                const llmData = await fetchLLMData(context);
                return llmData;
            } catch (err) {
                console.error("Fetch Page Content error:", err);
                setError("Could not fetch page content. Please try again later.");
                return null;
            }
        },
        enabled: enable,
    });

    return { pageContent, error };
}