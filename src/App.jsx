import { useState } from "react";
import "./App.css";

function App() {
  const [targetDateTime, setTargetDateTime] = useState("");

  const handleDateTimeChange = (event) => {
    const newDateTime = event.target.value;
    setTargetDateTime(newDateTime);

    console.log(new Date(newDateTime).getTime() - new Date().getTime());
  };
  return (
    <>
      <h1>Countdown Timer</h1>
      <input
        type="datetime-local"
        onChange={handleDateTimeChange}
        value={targetDateTime}
      />
      <p>{targetDateTime}</p>
    </>
  );
}

export default App;
