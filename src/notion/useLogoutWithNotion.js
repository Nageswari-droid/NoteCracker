import { useMutation } from "@tanstack/react-query";
import { supabase } from "../superbaseClient";

export default function useLogoutWithNotion() {
    const logout = useMutation({
        mutationKey: "logout",
        mutationFn: async() => {
            const { error } = await supabase.auth.signOut();
            sessionStorage.clear();
            if (error) {
                throw new Error(error.message);
            }
        },
    });

    return logout;
}