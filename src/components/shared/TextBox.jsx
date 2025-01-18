export default function TextBox({ label, value, changeHandler }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-900 text-sm mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => changeHandler(e.target.value)}
        className="w-full px-3 py-2 border border-slate-400 rounded focus:border-2 focus:border-black focus:outline-none"
        required
      />
    </div>
  );
}
