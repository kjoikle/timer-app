import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddTimer({ timerChain, setTimerChain }) {
  const [duration, setDuration] = useState(0);

  function handleClick() {
    if (duration > 0) {
      const id = uuidv4();
      const newTimer = { id: id, duration: duration };
      setTimerChain([...timerChain, newTimer]);
    } else {
      alert("enter a time!");
    }
    setDuration(0);
  }

  function handleChange(e) {
    setDuration(e.target.value);
  }

  return (
    <div className="timerWrapper" style={{ border: "dotted" }}>
      <input type="number" value={duration} onChange={handleChange} />
      <button className="addTimerBtn" onClick={handleClick}>
        Add Timer
      </button>
    </div>
  );
}

export default AddTimer;
