import React, { useReducer } from "react";

function counterReducer(state, action) {
  if (action.type === "PLUS") {
    return state + 1;
  }
  if (action.type === "MINUS") {
    if (state > 1) {
        return state - 1;
      }
      return state
  }
}

// const initialState = {
//     counter: 0
// }

const Counter = () => {
  const [counter, dispatchCounter] = useReducer(counterReducer, 0);

  function plusFunc() {
    dispatchCounter({type: "PLUS"});
  }
  function minusFunc() {
    dispatchCounter({type: "MINUS"});
  }
  return (
    <div>
      <h2>{counter}</h2>
      <button onClick={plusFunc}>+</button>
      <button onClick={minusFunc}>-</button>
    </div>
  );
};

export default Counter;
