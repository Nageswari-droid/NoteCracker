import React, { useState } from "react";

export default function ButtonWithImage({ icon, activeIcon, label, onClickHandler }) {
  const [buttonIcon, setButtonIconn] = useState(icon);
  return (
    <div
      className="border-2 border-slate-900 text-slate-900 py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white cursor-pointer"
      onMouseEnter={() => {
        setButtonIconn(activeIcon);
      }}
      onMouseLeave={() => {
        setButtonIconn(icon);
      }}
      onClick={onClickHandler}
    >
      <img src={buttonIcon} className="object-fit w-8 h-8" />
      <div>{label}</div>
    </div>
  );
}

