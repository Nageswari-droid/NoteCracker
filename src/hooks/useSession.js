import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "../superbaseClient";

export default function useSession() {
    const sessionQuery = useQuery({
        queryKey: ["sessionValidate"],
        queryFn: async() => {
            const { data } = await supabase.auth.getSession();
            if (!data.session || !data.session.provider_token) {
                return null;
            }
            return {
                accessToken: data.session.access_token,
                providerToken: data.session.provider_token,
                refreshToken: data.session.refresh_token,
                user: data.session.user,
            };
        },
    });

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            sessionQuery.refetch();
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [sessionQuery]);

    return sessionQuery;
}