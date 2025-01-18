import { createClient } from "@supabase/supabase-js";
let supabaseClient = null;

export const supabase = () => {
  if (!supabaseClient) {
    const supabaseUrl = localStorage.getItem("supabaseUrl");
    const supabaseKey = localStorage.getItem("supabaseKey");

    const URL = import.meta.env.VITE_SUPABASE_URL || supabaseUrl;
    const KEY = import.meta.env.VITE_SUPABASE_KEY || supabaseKey;

    supabaseClient = createClient(URL, KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    });
  }

  return supabaseClient;
};
