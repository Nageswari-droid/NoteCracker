import Option from "./shared/Options";
import Counter from "./shared/Counter";

export default function Inputs({
  subHead,
  options,
  updateHandler,
  defaultOption,
  value,
  count,
  isRequired,
}) {
  return (
    <div className="flex flex-row justify-center w-full mb-4 max-[500px]:text-sm">
      <div className="xl:w-1/2 lg:w-1/2 md:w-1/3 sm:w-2/5 max-[650px]:w-3/4">
        {subHead}
        {isRequired && <span className="text-red-500 text-sm">*</span>}
      </div>
      {options ? (
        <Option
          arr={options}
          updateHandler={updateHandler}
          defaultOption={defaultOption}
          value={value}
        />
      ) : (
        <div className="xl:w-1/4 lg:w-1/4 md:w-1/3 sm:w-2/5 max-[650px]:w-3/4">
          <Counter style="w-3/5" updateCounter={updateHandler} count={count} />
        </div>
      )}
    </div>
  );
}
