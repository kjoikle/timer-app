import React, { useState } from "react";
import Timer from "./components/Timer";
import AddTimer from "./components/AddTimer";
import TimeInput from "./components/TimeInput";

function App() {
  const [timerChain, setTimerChain] = useState([]); // array of all timers: {id: number, duration: number}

  return (
    <div className="App">
      {timerChain.map((timer) => {
        return (
          <Timer
            key={timer.id}
            id={timer.id}
            duration={timer.duration}
            timerChain={timerChain}
            setTimerChain={setTimerChain}
          />
        );
      })}
      <AddTimer timerChain={timerChain} setTimerChain={setTimerChain} />
    </div>
  );
}

export default App;
