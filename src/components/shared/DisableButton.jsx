import React from "react";

function DisableButton({label, disable, clickHandler}) {
  return (
    <div
      className={`rounded-full select-none px-2 text-bold text-white  ${
        disable
          ? "cursor-not-allowed border-gray-200 bg-gray-500"
          : "cursor-pointer border-[#0d0e0e] bg-slate-900"
      }`}
      onClick={() => {
        clickHandler()
      }}
    >
      {label}
    </div>
  );
}

export default DisableButton;
