import { supabase } from "../superbaseClient";
import { useMutation } from "@tanstack/react-query";

export default function useLoginWithNotion() {  
  const login = useMutation({
    mutationKey: "login",
    mutationFn: async () => {
      const { data, error } = await supabase().auth.signInWithOAuth({
        provider: "notion",
      });

      if (error) {
        throw new Error(error.message);
      }

      return { data, error };
    },
  });

  return login;
}
