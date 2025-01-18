import React, { useState } from "react";

export default function ButtonWithImage({
  icon,
  activeIcon,
  label,
  onClickHandler,
  isDisabled,
}) {
  const [buttonIcon, setButtonIconn] = useState(icon);
  return (
    <button
      className="max-[600px]:w-1/2 max-[500px]:w-8/12 border-2 border-slate-900 enabled:text-slate-900 py-1 px-4 rounded-md flex items-center justify-center gap-2 enabled:hover:bg-slate-900 enabled:hover:text-white enabled:cursor-pointer disabled:cursor-not-allowed disabled:text-slate-900 disabled:opacity-50"
      onMouseEnter={() => {
        setButtonIconn(activeIcon);
      }}
      onMouseLeave={() => {
        setButtonIconn(icon);
      }}
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      <img src={buttonIcon} className="object-fit w-8 h-8 max-[600px]:w-6 max-[600px]:h-6 max-[500px]:w-4 max-[500px]:h-4" />
      <div className="max-[600px]:text-sm">{label}</div>
    </button>
  );
}
