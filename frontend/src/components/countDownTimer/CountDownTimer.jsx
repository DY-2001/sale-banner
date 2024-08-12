import React, { useEffect, useState } from "react";
import styles from "./CountDownTimer.module.css";

const zeroTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const CountDownTimer = ({ bannerEndTime, timeLeft, setTimeLeft }) => {
  const calculateTimeLeft = () => {
    const currentTime = new Date().getTime();
    const difference = bannerEndTime - currentTime;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return {
        days,
        hours,
        minutes,
        seconds,
      };
    }
    return zeroTime;
  };

  useEffect(() => {
    if (timeLeft) {
      const timerId = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  return (
    <div className={styles.countDown}>
      {`${timeLeft.days} days ${timeLeft.hours} hrs ${timeLeft.minutes} mins ${timeLeft.seconds} secs`}
    </div>
  );
};

export default CountDownTimer;
