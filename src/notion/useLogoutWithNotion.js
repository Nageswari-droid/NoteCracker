import { useMutation } from "@tanstack/react-query";
import { supabase } from "../superbaseClient";
import { useNavigate } from "react-router-dom";

export default function useLogoutWithNotion() {
  const navigate = useNavigate();

  const logout = useMutation({
    mutationKey: "logout",
    mutationFn: async () => {
      const supabseClient = supabase();
      const { data: sessionData, error: sessionError } =
        await supabseClient.auth.getSession();

      if (sessionError || !sessionData.session) {
        console.error(
          "Session error:",
          sessionError?.message || "No session found"
        );

        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (accessToken && refreshToken) {
          const { error: setSessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (setSessionError) {
            console.error("Set session error:", setSessionError.message);
            throw new Error(setSessionError.message);
          }
        } else {
          throw new Error("No valid session or tokens found");
        }
      }

      const { error } = await supabseClient.auth.signOut();
      sessionStorage.clear();
      if (error) {
        console.error("Logout error:", error.message);
        throw new Error(error.message);
      }
    },
    onError: () => {
      sessionStorage.clear();
      navigate("/login");
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  return logout;
}
