import React from "react";

const TimerCard = ({ value, label }) => {
  return (
    <div className="card">
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  );
};

export default TimerCard;
