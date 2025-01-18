export default function Button({
  text,
  isDisabled,
  clickHandler,
  style = null,
  widthStyle = null,
}) {
  return (
    <button
      className={`px-4 py-2 rounded-md ${
        style
          ? style
          : `border enabled:border-slate-900 disabled:text-slate-900 enabled:bg-slate-900 enabled:text-white enabled:hover:bg-black disabled:opacity-50 disabled:border-gray-400 disabled:cursor-not-allowed max-[550px]:text-sm ${widthStyle}`
      }`}
      onClick={() => {
        clickHandler();
      }}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
