import React from "react";
import useLogoutWithNotion from "../notion/useLogoutWithNotion";
import error from "../assets/error.svg";
import Button from "./shared/Button";
import { returnToLogin } from "../constants/text";

export default function ErrorPage() {
  const logout = useLogoutWithNotion();

  const handleLogoutAndRedirect = async () => {
    logout.mutateAsync();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1a1a19]">
      <div className="mb-12">
        <img src={error} alt="Error" className="w-72 h-auto" />
      </div>
      <Button
        text={returnToLogin}
        isDisabled={false}
        clickHandler={handleLogoutAndRedirect}
        style={
          "border-2 text-white border-white hover:bg-white hover:text-black hover:font-semibold cursor-pointer"
        }
      />
    </div>
  );
}
