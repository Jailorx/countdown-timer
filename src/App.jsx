import { useState, useEffect } from "react";
import "./App.css";

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
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  const handleDateTimeChange = (event) => {
    const newDateTime = event.target.value;
    setTargetDateTime(newDateTime);
  };

  const startTimer = () => {
    if (!targetDateTime) {
      setMessage("Please select target time before starting the timer");
    } else {
      setTimer(
        setInterval(() => {
          setTimeRemaining(calculateRemainingTime(targetDateTime));
        }, 1000)
      );
      setIsTimerStarted(true);
      setMessage("");
    }
  };

  const stopTimer = () => {
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

  const handleTimer = () => {
    if (isTimerStarted) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const calculateRemainingTime = () => {
    const remainingTime = new Date(targetDateTime) - new Date();

    if (remainingTime <= 0) {
      stopTimer();
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const seconds = Math.floor((remainingTime / 1000) % 60);

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
        <button onClick={handleTimer}>Cancel Timer</button>
      ) : (
        <button onClick={handleTimer}>Start Timer</button>
      )}
      <div className="timer">
        <div className="card">
          <div className="value">{timeRemaining.days}</div>
          <div className="label">Days</div>
        </div>
        <div className="card">
          <div className="value">{timeRemaining.hours}</div>
          <div className="label">Hours</div>
        </div>
        <div className="card">
          <div className="value">{timeRemaining.minutes}</div>
          <div className="label">Minutes</div>
        </div>
        <div className="card">
          <div className="value">{timeRemaining.seconds}</div>
          <div className="label">Seconds</div>
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
