import AddTimer from "./components/AddTimer";
import { DataProvider } from "./context/DataContext";
import TimerChain from "./components/TimerChain";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Modal />
        <TimerChain />
        <AddTimer />
      </div>
    </DataProvider>
  );
}

export default App;
