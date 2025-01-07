import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";

export default function usePageContent(accessToken, providerToken, pageId, enable) {
  const listPages = useQuery({
    queryKey: ["pageContent"],
    queryFn: async () => {
      if (!accessToken || !providerToken || !pageId) {
        return null;
      }

      const cacheKey = pageId;
      const cacheData = sessionStorage.getItem(cacheKey);

      if (cacheData) return JSON.parse(cacheData);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_BASE_URL}/page_content`,
        {
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
        throw new Error(response.statusText);
      }

      const data = await response.json();
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    },
    enabled: enable,
  });

  return listPages;
}
