import React from "react";

function Option({ arr, updateHandler, defaultOption, value }) {
  const changeHandler = (element) => {
    updateHandler(element);
  };

  return (
    <div className={"flex xl:w-1/4 lg:w-1/4 md:w-1/3 sm:w-2/5 max-[650px]:w-3/4 flex-wrap select-none justify-evenly"}>
      <form className="max-w-sm w-full">
        <select
          id={value}
          value={value || ""}
          className="text-ellipsis max-[500px]:text-sm border text-sm rounded-lg block w-full px-2 py-2 bg-gray-900 border-gray-900 placeholder-gray-600 text-white focus:outline-none"
          onChange={(e) => {
            changeHandler(e.target.options[e.target.selectedIndex].id);
          }}
        >
          <option value="" defaultValue={defaultOption} disabled hidden>
            {defaultOption}
          </option>
          {Object.keys(arr).map((key) => {
            return (
              <option id={key} key={key} value={arr[key]}>
                {arr[key]}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
}

export default Option;
