import React from "react";
import { v4 as uuidv4 } from "uuid";
import TimeInput from "./TimeInput";
import { IoIosAddCircle } from "react-icons/io";
import { useContext } from "react";
import DataContext from "../context/DataContext";

function AddTimer() {
  const { timerQueue, setTimerQueue } = useContext(DataContext);

  function handleClick(timeInMS) {
    if (timeInMS > 0) {
      const id = uuidv4();
      const newTimer = { id: id, duration: timeInMS };
      setTimerQueue([...timerQueue, newTimer]);
    } else {
      alert("enter a time!");
    }
  }

  return (
    <div className="timerWrapper" style={{ border: "dotted" }}>
      <TimeInput
        submitBtnText={<IoIosAddCircle />}
        handleSubmit={handleClick}
      />
    </div>
  );
}

export default AddTimer;
