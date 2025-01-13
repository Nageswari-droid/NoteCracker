import React from "react";
import { Navigate } from "react-router-dom";
import useSession from "./hooks/useSession";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
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