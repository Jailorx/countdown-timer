import { useState } from "react";
import "./App.css";
import TimerCard from "./components/TimerCard/TimerCard";
import useCountdownTimer from "./hooks/useCountdowntimer";

function App() {
  const [targetDateTime, setTargetDateTime] = useState("");
  const {
    timeRemaining,
    isTimerStarted,
    isAnyMessage,
    message,
    handleStartTimer,
    handleStopTimer,
    handleDateTimeChange,
  } = useCountdownTimer(targetDateTime, setTargetDateTime);

  return (
    <div className="container">
      <h1>
        Countdown <span>Timer</span>
      </h1>
      <input
        type="datetime-local"
        onChange={handleDateTimeChange}
        value={targetDateTime}
      />
      {isTimerStarted ? (
        <button onClick={handleStopTimer}>Cancel Timer</button>
      ) : (
        <button onClick={handleStartTimer}>Start Timer</button>
      )}
      {isAnyMessage ? (
        <p className="message">{message}</p>
      ) : (
        <div className="timer">
          {Object.entries(timeRemaining).map(([label, value]) => (
            <TimerCard key={label} value={value} label={label} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
