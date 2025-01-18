import React from "react";
import Button from "./shared/Button";
import { chooseAgain } from "../constants/text";

export default function Popup({ heading, message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 w-full">
      <div className="bg-white p-6 rounded-md shadow-md xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-1/2 max-[640px]:w-1/2 max-[550px]:w-3/4 flex flex-col items-center">
        <h2 className="text-xl max-[640px]:text-lg max-[550px]:text-base font-semibold mb-4 text-[#882525]">{heading}</h2>
        <p className="mb-4 max-[550px]:text-sm text-center">{message}</p>
        <Button text={chooseAgain} isDisabled={false} clickHandler={onClose} />
      </div>
    </div>
  );
}
