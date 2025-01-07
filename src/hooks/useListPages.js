import { useQuery } from "@tanstack/react-query";

export default function useListPages(accessToken, providerToken) {
  const listPages = useQuery({
    queryKey: ["listPages"],
    queryFn: async () => {
      const cacheKey = "notion_pages_cache";
      const cacheData = sessionStorage.getItem(cacheKey);

      if (cacheData) return JSON.parse(cacheData);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_BASE_URL}/notion_pages`,
        {
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
        throw new Error(response.statusText);
      }

      const data = await response.json();
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    },
  });

  return listPages;
}
