import AddTimer from "./components/AddTimer";
import { DataProvider } from "./context/DataContext";
import TimerChain from "./components/TimerChain";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <TimerChain />
        <AddTimer />
      </div>
    </DataProvider>
  );
}

export default App;
