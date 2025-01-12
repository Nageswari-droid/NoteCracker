import { useQuery } from "@tanstack/react-query";

export default function useLLM(accessToken, prompt) {
  const fetchLLMData = async () => {
    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    if (!prompt || !accessToken || !API_KEY) {
      return null;
    }

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_BASE_URL}/llm_openai`,
      {
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
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
  };

  return useQuery({
    queryKey: ["llmData", prompt],
    queryFn: fetchLLMData,
    enabled: !!accessToken && !!prompt,
  });
}
