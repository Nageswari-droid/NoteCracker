import { useQuery } from "@tanstack/react-query";

export default function useListPages(accessToken, providerToken) {
  const listPages = useQuery({
    queryKey: ["listPages"],
    queryFn: async () => {
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

      return response.json();
    },
  });

  return listPages;
}
