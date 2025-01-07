import React from "react";
import DisableButton from "./DisableButton";

function Counter({ style, updateCounter, count }) {
  function decrement() {
    if (count > 10) {
      updateCounter(count - 1);
    }
  }

  function increment() {
    if (count < 20) {
      updateCounter(count + 1);
    }
  }

  return (
    <div className={`flex flex-wrap items-center justify-between ${style}`}>
      <DisableButton
        label="-"
        disable={count == 10}
        clickHandler={decrement}
      ></DisableButton>
      <div className="text-lg">{count}</div>
      <DisableButton
        label="+"
        disable={count == 20}
        clickHandler={increment}
      ></DisableButton>
    </div>
  );
}

export default Counter;
