export default function Button({ text, isDisabled, clickHandler }) {
  return (
    <button
      className="px-4 py-2 enabled:border enabled:border-slate-900 disabled:text-slate-900 enabled:bg-slate-900 enabled:text-white enabled:hover:bg-black rounded-md disabled:cursor-not-allowed disabled:opacity-50"
      onClick={() => {
        clickHandler();
      }}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
