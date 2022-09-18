import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionMainComponent = ({ data }) => {
  const timerId = useRef();
  const minutes = data.questions.length;
  const [secondsLeft, setSecondsLeft] = useState(minutes * 10);
  const navigate = useNavigate();

  const submitQuiz = () => {
    navigate("/", {
      replace: true,
      state: {
        message: "Quiz submitted successfully",
        severity: "success",
      },
    });
  };

  if (secondsLeft === 0) {
    submitQuiz();
  }

  const startTimer = () => {
    timerId.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
  };

  const clearTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, []);

  const getHours = () => {
    const hoursRemain = Math.floor(secondsLeft / (60 * 60));
    return hoursRemain < 10 ? `0${hoursRemain}` : `${hoursRemain}`;
  };

  const getMinutes = () => {
    const minutesRemain = Math.floor(secondsLeft / 60);
    return minutesRemain < 10 ? `0${minutesRemain}` : `${minutesRemain}`;
  };

  const getSeconds = () => {
    const secondsRemain = Math.floor(secondsLeft % 60);
    return secondsRemain < 10 ? `0${secondsRemain}` : `${secondsRemain}`;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {`${getHours()} : ${getMinutes()} : ${getSeconds()}`}
    </div>
  );
};

export default QuestionMainComponent;
