import { Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../contexts/QuizContext";

const QuestionMainComponent = ({ data }) => {
  const timerId = useRef();
  const minutes = data.questions.length * 60;
  const [secondsLeft, setSecondsLeft] = useState(minutes * 5);
  const [timerPaused, setTimerPaused] = useState(false);
  const navigate = useNavigate();
  const quizInfo = useContext(QuizContext);

  const submitQuiz = () => {
    navigate("/", {
      replace: true,
      state: {
        message: "Quiz submitted successfully",
        severity: "success",
      },
    });
  };

  const clearTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  if (secondsLeft === 0) {
    // submitQuiz();
    clearTimer();
  }

  const startTimer = useCallback(() => {
    timerId.current = setInterval(() => {
      !timerPaused && setSecondsLeft((prev) => prev - 1);
    }, 1000);
  }, [timerPaused]);

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [startTimer]);

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

  const getOptionSelectedValue = () => {
    const {questionsAttempted, currentQuestion} = quizInfo;
    // finding currentQuestion in questionsAttempted array.
    const attemptedQuestion = questionsAttempted.filter(({questionId}) => questionId === currentQuestion);
    if (attemptedQuestion.length > 0){
      return attemptedQuestion[0]?.choiceSelectedId;
    }
    return null
  }

  const handleChangeInOptionSelectedValue = (e) => {
    const {setQuestionsAttempted, currentQuestion, questionsAttempted} = quizInfo
    //  check to see if current question is in questions attempted.
    const isQuestionAttempted = questionsAttempted.some(({questionId}) => questionId === currentQuestion)
    if(!isQuestionAttempted) {
      setQuestionsAttempted((prev) => [
        ...prev,
        {
          questionId: currentQuestion,
          choiceSelectedId: e.target.value,
        },
      ]);
    } else {
      const newArray = questionsAttempted.map(({questionId, choiceSelectedId}) => {
        if(questionId !== currentQuestion) return {
          questionId,
          choiceSelectedId
        }

        return {
          questionId,
          choiceSelectedId: e.target.value
        }
      })
      setQuestionsAttempted(newArray);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
      }}
    >
      <Card
        sx={{
          paddingRight: "20px",
          paddingLeft: "20px",
          paddingTop: "5px",
          width: "fit-content",
        }}
      >
        <h1>{`${getHours()} : ${getMinutes()} : ${getSeconds()}`}</h1>
      </Card>
      <Card sx={{ width: "80%", padding: "20px", borderRadius: 4 }}>
        <h1>
          {
            data.questions.filter(
              ({ _id: questionId }) => questionId === quizInfo.currentQuestion
            )?.[0]?.text
          }
        </h1>
        <hr />
        <FormControl>
          <FormLabel>Options</FormLabel>
          <RadioGroup
            value={getOptionSelectedValue()}
            onChange={handleChangeInOptionSelectedValue}
          >
            {data.questions
              .filter(
                ({ _id: questionId }) => questionId === quizInfo.currentQuestion
              )?.[0]
              ?.choices?.map(({ _id: choiceId, text }) => (
                <FormControlLabel
                  value={choiceId}
                  control={<Radio />}
                  label={text}
                />
              ))}
          </RadioGroup>
        </FormControl>
      </Card>
    </div>
  );
};

export default React.memo(QuestionMainComponent);
