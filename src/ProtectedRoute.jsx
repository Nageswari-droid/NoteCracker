import React from "react";
import { Navigate } from "react-router-dom";
import useSession from "./hooks/useSession";
import Loader from "./Loader";
import { checkEnv } from "./utils/checkEnv";

const ProtectedRoute = ({ children }) => {
  const storedSupabaseUrl = localStorage.getItem("supabaseUrl");
  const storedSupabaseKey = localStorage.getItem("supabaseKey");
  const storedOpenAiKey = localStorage.getItem("openAiKey");

  if (
    !checkEnv() &&
    !storedSupabaseUrl &&
    !storedSupabaseKey &&
    !storedOpenAiKey
  ) {
    return <Navigate to="/login" />;
  }

  const session = useSession();
  const { data: sessionData, isLoading } = session;

  if (isLoading) {
    return <Loader />;
  }

  if (!sessionData) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
