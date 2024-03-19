import { useState } from "react";
import "./App.css";

function App() {
  const [targetDateTime, setTargetDateTime] = useState("");
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [message, setMessage] = useState("");

  const handleDateTimeChange = (event) => {
    const newDateTime = event.target.value;
    setTargetDateTime(newDateTime);
  };

  const handleTimer = () => {
    if (!targetDateTime)
      setMessage("Please select target time before starting the timer");
    else {
      setIsTimerStarted(!isTimerStarted);
      setMessage("");
    }
  };
  return (
    <div className="container">
      <h1>Countdown Timer</h1>
      <input
        type="datetime-local"
        onChange={handleDateTimeChange}
        value={targetDateTime}
      />
      {isTimerStarted ? (
        <button onClick={handleTimer}>Cancel Timer</button>
      ) : (
        <button onClick={handleTimer}>Start Timer</button>
      )}
      <div className="timer">
        <div className="card">
          <div className="value">10</div>
          <div calssName="label">Days</div>
        </div>
        <div className="card">
          <div className="value">10</div>
          <div calssName="label">Hours</div>
        </div>
        <div className="card">
          <div className="value">10</div>
          <div calssName="label">Minutes</div>
        </div>
        <div className="card">
          <div className="value">10</div>
          <div calssName="label">Seconds</div>
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
