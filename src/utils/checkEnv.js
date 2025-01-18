export function checkEnv() {
  return (
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_KEY &&
    import.meta.env.VITE_OPENAI_API_KEY
  );
}

