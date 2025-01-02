import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useSession from "./hooks/useSession";
import Loader from "./Loader";
import { useEffect } from "react";

export default function AuthRouter({ children }) {
  const navigate = useNavigate();
  const session = useSession();
  const { data, isError, isLoading } = session;

  useEffect(() => {
    if (!isLoading && isError) {
      navigate("/login");
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return <Loader />;
  }

  return data ? children : null;
}

AuthRouter.propTypes = {
  children: propTypes.node,
};
