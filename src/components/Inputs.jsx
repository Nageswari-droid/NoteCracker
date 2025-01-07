import Option from "./shared/Options";

export default function Inputs({
  subHead,
  options,
  updateHandler,
  defaultOption,
  value,
}) {
  return (
    <div className="flex flex-row justify-center w-full mb-4">
      <div className="w-1/2">{subHead}</div>
      {options ? (
        <Option
          arr={options}
          updateHandler={updateHandler}
          defaultOption={defaultOption}
          value={value}
        />
      ) : (
        <div className="w-1/4">{value}</div>
      )}
    </div>
  );
}
