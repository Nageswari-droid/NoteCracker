import React from "react";
import Button from "./shared/Button";
import { chooseAgain } from "../constants/text";

export default function Popup({ heading, message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 w-full">
      <div className="bg-white p-6 rounded-md shadow-md w-1/4 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 text-[#531515]">{heading}</h2>
        <p className="mb-4 text-center">{message}</p>
        <Button text={chooseAgain} isDisabled={false} clickHandler={onClose} />
      </div>
    </div>
  );
}
