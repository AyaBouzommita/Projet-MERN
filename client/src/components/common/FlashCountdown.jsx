import React, { useState, useEffect } from "react";

function FlashCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <div className="d-flex align-items-center gap-2">
      <span className="fw-bold text-danger text-uppercase small">Fin dans :</span>
      <div className="d-flex align-items-center gap-1 font-monospace fw-bold">
        <span className="badge bg-dark text-white p-2 rounded">{formatNumber(timeLeft.hours)}</span>
        <span>:</span>
        <span className="badge bg-dark text-white p-2 rounded">{formatNumber(timeLeft.minutes)}</span>
        <span>:</span>
        <span className="badge bg-danger text-white p-2 rounded">{formatNumber(timeLeft.seconds)}</span>
      </div>
    </div>
  );
}

export default FlashCountdown;
