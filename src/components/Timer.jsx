import React, { useEffect, useState } from "react";

// duration in ms

function Timer({ duration }) {
  const [time, setTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1000);
      }, 1000);
    } else if (time == 0) {
      alert("done!");
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  function toggleRunning() {
    setIsRunning(!isRunning);
  }

  function resetTimer() {
    setIsRunning(false);
    setTime(duration);
  }

  function addLeadingZero(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function getFormattedTime() {
    let total_seconds = parseInt(Math.floor(time / 1000));
    let total_minutes = parseInt(Math.floor(total_seconds / 60));
    let total_hours = parseInt(Math.floor(total_minutes / 60));
    let days = parseInt(Math.floor(total_hours / 24));

    let seconds = parseInt(total_seconds % 60);
    let minutes = parseInt(total_minutes % 60);
    let hours = parseInt(total_hours % 24);

    seconds = addLeadingZero(seconds);
    minutes = addLeadingZero(minutes);

    return `${days}: ${hours}: ${minutes}: ${seconds}`;
  }

  return (
    <>
      <div className="timer">
        <h2>{getFormattedTime()}</h2>
      </div>
      <div className="timerControlsWrapper">
        <button onClick={toggleRunning}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </>
  );
}

export default Timer;
