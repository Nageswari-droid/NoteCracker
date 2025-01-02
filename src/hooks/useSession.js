import { useQuery } from "@tanstack/react-query";
import { supabase } from "../superbaseClient";

export default function useSession() {
  const session = useQuery({
    queryKey: ["sessionValidate"],
    queryFn: () => {
      return supabase.auth.getSession().then(({ data }) => {
        if (!data.session && !data.session.provider_token) {
          return null;
        }

        return {
          accessToken: data?.session.access_token,
          providerToken: data?.session.provider_token,
          refreshToken: data?.session.refresh_token,
          user: data?.session.user,
        };
      });
    },
  });

  return session;
}
