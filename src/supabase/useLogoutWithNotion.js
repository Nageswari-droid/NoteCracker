import { useMutation } from "@tanstack/react-query";
import { supabase } from "../superbaseClient";

export default function useLogoutWithNotion() {
  const logout = useMutation({
    mutationKey: "logout",
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();

      console.log(error);

      return error;
    },
  });

  return logout;
}
