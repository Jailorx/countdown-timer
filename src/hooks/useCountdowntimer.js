import { useState, useEffect } from "react";
import completeAudio from "../assets/complete.mp3";
import error from "../assets/error.mp3";

const useCountdownTimer = () => {
  const [targetDateTime, setTargetDateTime] = useState(() => {
    const savedTargetDateTime = localStorage.getItem("targetDateTime");
    return savedTargetDateTime || "";
  });
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

  const countdownFinishedAudio = new Audio(completeAudio);
  const countdownErrorAudio = new Audio(error);

  useEffect(() => {
    const savedTargetDateTime = localStorage.getItem("targetDateTime");
    if (savedTargetDateTime) {
      setTargetDateTime(savedTargetDateTime);
    }
  }, []);

  useEffect(() => {
    if (targetDateTime) {
      localStorage.setItem("targetDateTime", targetDateTime);
    } else {
      localStorage.removeItem("targetDateTime");
    }
  }, [targetDateTime]);

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
      countdownErrorAudio.play();
      setisAnyMessage(true);
      return;
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() + 99);

    if (new Date(newDateTime) > cutoffDate) {
      setMessage("Selected time is more than 100 days");
      countdownErrorAudio.play();
      setisAnyMessage(true);
    } else {
      setMessage("");
      setisAnyMessage(false);
    }
  };

  const handleStartTimer = () => {
    if (!targetDateTime) {
      setMessage("Please select target time before starting the timer");
      countdownErrorAudio.play();
      setisAnyMessage(true);
      return;
    }
    if (!isAnyMessage) {
      setIsTimerStarted(true);
      setTimer(
        setInterval(() => {
          setTimeRemaining(calculateRemainingTime());
        }, 1000)
      );
    }
  };

  const handleStopTimer = () => {
    clearInterval(timer);
    setTimer(null);
    setIsTimerStarted(false);
    localStorage.removeItem("targetDateTime");
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
      localStorage.removeItem("targetDateTime");
      setisAnyMessage(true);
      setMessage("🎉The countdown is over! What's next on your adventure?🎉");
      countdownFinishedAudio.play();
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
    targetDateTime,
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
