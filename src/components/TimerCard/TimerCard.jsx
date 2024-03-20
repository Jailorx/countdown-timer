import React from "react";
import styles from "./TimerCard.module.css";

const TimerCard = ({ value, label }) => {
  return (
    <div className={styles.card}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default TimerCard;
