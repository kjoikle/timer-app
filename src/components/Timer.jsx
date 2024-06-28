import React, { useEffect, useState } from "react";
import TimeInput from "./TimeInput";

// duration in ms

function Timer({ id, duration, timerChain, setTimerChain }) {
  const [timerDuration, setTimerDuration] = useState(duration);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editDuration, setEditDuration] = useState(duration);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1000);
      }, 1000);
    } else if (timeLeft == 0) {
      setIsRunning(false);
      alert("done!");
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  function handleDelete() {
    const newTimerChain = timerChain.filter((timer) => timer.id != id);
    setTimerChain(newTimerChain);
  }

  function toggleRunning() {
    setIsRunning(!isRunning);
  }

  function resetTimer() {
    setIsRunning(false);
    setTimeLeft(timerDuration);
  }

  function openPopup() {
    setShowPopup(true);
    setIsRunning(false);
  }

  function closePopup() {
    setShowPopup(false);
  }

  function handleDurationChange(timeValue) {
    setEditDuration(timeValue);
  }

  function submitEditDuration(timeInMS) {
    setTimeLeft(timeInMS);
    setTimerDuration(timeInMS);
    closePopup();
  }

  function cancelEdit() {
    setEditDuration(timerDuration);
    closePopup();
  }

  function addLeadingZero(n) {
    return (n < 10 ? "0" : "") + n;
  }

  // function getFormattedTime() {
  //   let total_seconds = parseInt(Math.floor(timeLeft / 1000));
  //   let total_minutes = parseInt(Math.floor(total_seconds / 60));
  //   let total_hours = parseInt(Math.floor(total_minutes / 60));

  //   let seconds = parseInt(total_seconds % 60);
  //   let minutes = parseInt(total_minutes % 60);
  //   let hours = parseInt(total_hours % 24);

  //   seconds = addLeadingZero(seconds);
  //   minutes = addLeadingZero(minutes);
  //   hours = addLeadingZero(hours);

  //   return `${hours}: ${minutes}: ${seconds}`;
  // }

  function getTimeInfo() {
    let total_seconds = parseInt(Math.floor(timeLeft / 1000));
    let total_minutes = parseInt(Math.floor(total_seconds / 60));
    let total_hours = parseInt(Math.floor(total_minutes / 60));

    let seconds = parseInt(total_seconds % 60);
    let minutes = parseInt(total_minutes % 60);
    let hours = parseInt(total_hours % 24);

    seconds = addLeadingZero(seconds);
    minutes = addLeadingZero(minutes);
    hours = addLeadingZero(hours);

    return {
      formattedTime: `${hours}: ${minutes}: ${seconds}`,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  return (
    <div className="timerWrapper">
      {!showPopup ? (
        <>
          <button className="deleteBtn" onClick={handleDelete}>
            X
          </button>
          <div className="timer">
            <h2>{getTimeInfo().formattedTime}</h2>
          </div>
          <div className="timerControlsWrapper">
            <button onClick={toggleRunning}>
              {isRunning ? "Pause" : "Start"}
            </button>
            <button onClick={resetTimer}>Reset</button>
            <button onClick={openPopup}>Edit</button>
          </div>
        </>
      ) : (
        <div className="editPopup">
          <h2>Edit Timer:</h2>
          <TimeInput
            submitBtnText={"Submit"}
            cancelBtnText={"Cancel"}
            updateVal={handleDurationChange}
            handleSubmit={submitEditDuration}
            handleCancel={cancelEdit}
            initialHours={getTimeInfo().hours}
            initialMinutes={getTimeInfo().minutes}
            initialSeconds={getTimeInfo().seconds}
          />
        </div>
      )}
    </div>
  );
}

export default Timer;
