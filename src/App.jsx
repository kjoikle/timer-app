import React, { useState } from "react";
import Timer from "./components/Timer";

function App() {
  return (
    <div className="App">
      <Timer duration={60000} />
    </div>
  );
}

export default App;
