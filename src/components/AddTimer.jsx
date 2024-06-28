import React from "react";
import { v4 as uuidv4 } from "uuid";
import TimeInput from "./TimeInput";

function AddTimer({ timerChain, setTimerChain }) {
  function handleClick(timeInMS) {
    if (timeInMS > 0) {
      const id = uuidv4();
      const newTimer = { id: id, duration: timeInMS };
      setTimerChain([...timerChain, newTimer]);
    } else {
      alert("enter a time!");
    }
  }

  return (
    <div className="timerWrapper" style={{ border: "dotted" }}>
      <TimeInput submitBtnText="Add" handleSubmit={handleClick} />
    </div>
  );
}

export default AddTimer;
