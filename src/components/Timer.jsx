import React, { useEffect, useState, useRef } from "react";
import TimeInput from "./TimeInput";
import { FaCirclePause, FaCirclePlay, FaCircleCheck } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { TiCancel } from "react-icons/ti";
import beep1sec from "../assets/beep1sec.mp3";
import countdown from "../assets/countdown.1.mp3";
import start from "../assets/countdown.2.mp3";

// duration in ms

function Timer({ id, duration, timerChain, setTimerChain }) {
  const [timerDuration, setTimerDuration] = useState(duration);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [initialPlay, setInitialPlay] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1000);
      }, 1000);
    } else if (timeLeft == 0) {
      setIsRunning(false);
      handleTimerEnd();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  function handleTimerEnd() {
    new Audio(beep1sec).play();
  }

  function handleDelete() {
    const newTimerChain = timerChain.filter((timer) => timer.id != id);
    setTimerChain(newTimerChain);
  }

  function startCountdown() {
    if (audioRef.current) {
      console.log(`Audio Ref ${audioRef.current}`);
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }

  function handleCountdownEnded() {
    new Audio(start).play();
    setIsRunning(true);
  }

  function handleStartStop() {
    if (initialPlay) {
      startCountdown();
      setInitialPlay(false);
    } else {
      setIsRunning(!isRunning);
    }
  }

  function resetTimer() {
    setIsRunning(false);
    setTimeLeft(timerDuration);
    setInitialPlay(true);
  }

  function openPopup() {
    setShowPopup(true);
    setIsRunning(false);
  }

  function closePopup() {
    setShowPopup(false);
  }

  function submitEditDuration(timeInMS) {
    setTimeLeft(timeInMS);
    setTimerDuration(timeInMS);
    closePopup();
  }

  function cancelEdit() {
    closePopup();
  }

  function addLeadingZero(n) {
    return (n < 10 ? "0" : "") + n;
  }

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
            <MdDelete />
          </button>
          <div className="timer">
            <h2>{getTimeInfo().formattedTime}</h2>
          </div>
          <div className="timerControlsWrapper">
            <button onClick={handleStartStop}>
              {isRunning ? <FaCirclePause /> : <FaCirclePlay />}
            </button>
            <button onClick={resetTimer}>
              <GrPowerReset />
            </button>
            <button onClick={openPopup}>
              <MdEdit />
            </button>
          </div>
        </>
      ) : (
        <div className="editPopup">
          <h2>Edit Timer:</h2>
          <TimeInput
            submitBtnText={<FaCircleCheck />}
            cancelBtnText={<TiCancel />}
            handleSubmit={submitEditDuration}
            handleCancel={cancelEdit}
            initialHours={getTimeInfo().hours}
            initialMinutes={getTimeInfo().minutes}
            initialSeconds={getTimeInfo().seconds}
          />
        </div>
      )}
      <audio ref={audioRef} onEnded={handleCountdownEnded} src={countdown} />
    </div>
  );
}

export default Timer;
