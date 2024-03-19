import { useState, useEffect } from "react";
import "./App.css";
import TimerCard from "./components/TimerCard/TimerCard";

function App() {
  const [targetDateTime, setTargetDateTime] = useState("");
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [isAnyMessage, setisAnyMessage] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  const handleDateTimeChange = (event) => {
    const newDateTime = event.target.value;
    setTargetDateTime(newDateTime);

    const currDate = new Date();
    const selectedDate = new Date(newDateTime);

    if (currDate > selectedDate) {
      setMessage("Please select a future date and time");
      setisAnyMessage(true);
      return;
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() + 99);

    if (new Date(newDateTime) > cutoffDate) {
      setMessage("Selected time is more than 100 days");
      setisAnyMessage(true);
    } else {
      setMessage("");
      setisAnyMessage(false);
    }
  };

  const handleStartTimer = () => {
    if (!targetDateTime) {
      setMessage("Please select target time before starting the timer");
      setisAnyMessage(true);
      return;
    }
    if (!isAnyMessage) {
      setTimer(
        setInterval(() => {
          setTimeRemaining(calculateRemainingTime());
        }, 1000)
      );
      setIsTimerStarted(true);
    }
  };

  const handleStopTimer = () => {
    clearInterval(timer);
    setTimer(null);
    setIsTimerStarted(false);
    setTimeRemaining({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  };

  const calculateRemainingTime = () => {
    const remainingTime = new Date(targetDateTime) - new Date();

    if (remainingTime <= 0) {
      setisAnyMessage(true);
      setMessage("🎉The countdown is over!Whats next on your adventure🎉");
      handleStopTimer();
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    let seconds = Math.floor((remainingTime / 1000) % 60);

    if (days > 99) {
      days = 99;
    }
    if (hours > 23) {
      hours = 23;
    }
    if (minutes > 59) {
      minutes = 59;
    }
    if (seconds > 59) {
      seconds = 59;
    }

    return { days, hours, minutes, seconds };
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
        <button onClick={handleStopTimer}>Cancel Timer</button>
      ) : (
        <button onClick={handleStartTimer}>Start Timer</button>
      )}
      {isAnyMessage ? (
        <p>{message}</p>
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
