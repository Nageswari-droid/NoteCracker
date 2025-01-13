import { useMutation } from "@tanstack/react-query";
import { supabase } from "../superbaseClient";
import { useNavigate } from "react-router-dom";

export default function useLogoutWithNotion() {
    const navigate = useNavigate();

    const logout = useMutation({
        mutationKey: "logout",
        mutationFn: async() => {
            const { error } = await supabase.auth.signOut();
            sessionStorage.clear();
            if (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            navigate("/login");
        },
    });

    return logout;
}