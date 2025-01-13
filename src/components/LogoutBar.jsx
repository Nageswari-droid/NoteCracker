import { useState } from "react";
import useLogoutWithNotion from "../notion/useLogoutWithNotion";
import Loader from "../Loader";
import { logoutTitle } from "../constants/text";

export default function LogoutBar() {
  const logout = useLogoutWithNotion();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (isLoggingOut) return <Loader />;

  const logoutWithNotion = () => {
    setIsLoggingOut(true);
    logout.mutateAsync();
  };

  return (
    <div className="w-full fixed bg-[#171717] flex justify-end">
      <button
        onClick={logoutWithNotion}
        className="border-2 bg-white border-white text-slate-900 font-semibold py-2 px-4 rounded-md my-4 mr-6 hover:bg-slate-900 hover:text-white cursor-pointer"
      >
        {logoutTitle}
      </button>
    </div>
  );
}
