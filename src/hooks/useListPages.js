import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useListPages(accessToken, providerToken) {
    const [error, setError] = useState(null);
    const supabaseUrl = localStorage.getItem("supabaseUrl");

    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || supabaseUrl;

    const listPages = useQuery({
        queryKey: ["listPages"],
        queryFn: async() => {
            if (!accessToken || !providerToken) {
                return null;
            }

            const cacheKey = "notion_pages_cache";
            const cacheData = sessionStorage.getItem(cacheKey);

            if (cacheData) {
                return JSON.parse(cacheData);
            }

            try {
                const response = await fetch(
                    `${SUPABASE_URL}/functions/v1/notion_pages`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            name: "Functions",
                            providerToken: providerToken,
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                sessionStorage.setItem(cacheKey, JSON.stringify(data));
                return data;
            } catch (err) {
                console.error("Fetch List Pages error:", err);
                setError("Could not fetch list pages. Please try again later.");
                return null;
            }
        },
    });

    return { listPages, error };
}