import React, {
  useEffect,
  useState,
  useContext,
  useImperativeHandle,
} from "react";
import TimeInput from "./TimeInput";
import { FaCirclePause, FaCirclePlay, FaCircleCheck } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { TiCancel } from "react-icons/ti";
import beep1sec from "../assets/beep1sec.mp3";
import DataContext from "../context/DataContext";

// duration in ms

function Timer({ id, duration, callback, isActive, resetting }, ref) {
  const { timerQueue, setTimerQueue } = useContext(DataContext);
  const [timerDuration, setTimerDuration] = useState(duration);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        resetTimer();
      },
    }),
    []
  );

  useEffect(() => {
    if (resetting) {
      resetTimer();
    }
  }, [resetting]);

  useEffect(() => {
    let interval;
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1000);
      }, 1000);
    } else if (timeLeft == 0) {
      handleTimerEnd();
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft]);

  function handleTimerEnd() {
    setIsEnded(true);
    new Audio(beep1sec).play();
    callback();
  }

  function handleDelete() {
    const newTimerQueue = timerQueue.filter((timer) => timer.id != id);
    setTimerQueue(newTimerQueue);
  }

  function handleStartStop() {
    setIsPaused(!isPaused);
  }

  function resetTimer() {
    setIsPaused(false);
    setTimeLeft(timerDuration);
    setIsEnded(false);
  }

  function openPopup() {
    setShowPopup(true);
    setIsPaused(true);
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
    <div
      className={`timerWrapper ${isActive ? "isActive" : ""} ${
        isEnded ? "isEnded" : ""
      }`}
    >
      {!showPopup ? (
        <>
          <button className="deleteBtn" onClick={handleDelete}>
            <MdDelete />
          </button>
          <div className="timer">
            <h2>{getTimeInfo().formattedTime}</h2>
          </div>
          <div className="timerControlsWrapper">
            <button onClick={handleStartStop} disabled={!isActive}>
              {!isPaused ? <FaCirclePause /> : <FaCirclePlay />}
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
    </div>
  );
}

export default React.forwardRef(Timer);
