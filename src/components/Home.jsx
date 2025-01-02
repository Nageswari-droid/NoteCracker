import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogoutWithNotion from "../supabase/useLogoutWithNotion";
import Loader from "../Loader";
import Pages from "./Pages";

export default function Home() {
  const navigate = useNavigate();
  const logout = useLogoutWithNotion();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (isLoggingOut) return <Loader />;

  const logoutWithNotion = async () => {
    setIsLoggingOut(true);
    await logout.mutateAsync();
    navigate("/login");
  };

  return (
    <div>
      <Pages />
      <h1 className="cursor-pointer" onClick={logoutWithNotion}>
        Sign out
      </h1>
    </div>
  );
}
