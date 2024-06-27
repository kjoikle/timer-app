import React, { useEffect, useState } from "react";

// duration in ms

// add leading zeros
function Timer({ duration }) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time == 0) {
      alert("done!");
    } else {
      setTimeout(() => {
        setTime(time - 1000);
      }, 1000);
    }
  }, [time]);

  function getFormattedTime() {
    let total_seconds = parseInt(Math.floor(time / 1000));
    let total_minutes = parseInt(Math.floor(total_seconds / 60));
    let total_hours = parseInt(Math.floor(total_minutes / 60));
    let days = parseInt(Math.floor(total_hours / 24));

    let seconds = parseInt(total_seconds % 60);
    let minutes = parseInt(total_minutes % 60);
    let hours = parseInt(total_hours % 24);

    return `${days}: ${hours}: ${minutes}: ${seconds}`;
  }

  return (
    <div className="timer">
      <h2>{getFormattedTime()}</h2>
    </div>
  );
}

export default Timer;
