import { useState, useEffect } from "react";

const useCountdownTimer = (targetDateTime, setTargetDateTime) => {
  const [timeRemaining, setTimeRemaining] = useState({
    Days: 0,
    Hours: 0,
    Minutes: 0,
    Seconds: 0,
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
      Days: 0,
      Hours: 0,
      Minutes: 0,
      Seconds: 0,
    });
  };

  const calculateRemainingTime = () => {
    const remainingTime = new Date(targetDateTime) - new Date();

    if (remainingTime <= 0) {
      setisAnyMessage(true);
      setMessage("🎉The countdown is over! Whats next on your adventure🎉");
      handleStopTimer();
      return {
        Days: 0,
        Hours: 0,
        Minutes: 0,
        Seconds: 0,
      };
    }

    let Days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    let Hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    let Minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    let Seconds = Math.floor((remainingTime / 1000) % 60);

    if (Days > 99) {
      Days = 99;
    }
    if (Hours > 23) {
      Hours = 23;
    }
    if (Minutes > 59) {
      Minutes = 59;
    }
    if (Seconds > 59) {
      Seconds = 59;
    }

    return { Days, Hours, Minutes, Seconds };
  };

  return {
    timeRemaining,
    isTimerStarted,
    isAnyMessage,
    message,
    handleStartTimer,
    handleStopTimer,
    handleDateTimeChange,
  };
};

export default useCountdownTimer;
