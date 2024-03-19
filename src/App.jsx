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
      <p>{message}</p>
    </div>
  );
}

export default App;
