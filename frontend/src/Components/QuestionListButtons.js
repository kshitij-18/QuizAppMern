import { Avatar, Paper } from "@mui/material";
import React, { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

const QuestionListButtons = ({ questions }) => {
  const quizInfo = useContext(QuizContext);
  console.log("::::INFO", quizInfo);
  const getProperColourForQuestionListing = (questionIdParam) => {
    const { currentQuestion = "", questionsAttempted = [] } = quizInfo;
    if (questionIdParam === currentQuestion) {
      return {
        height: 56,
        width: 56,
        backgroundColor: "#2EFF2E",
        color: "white"
      }
    } else if (
      questionsAttempted.filter(
        ({ questionId }) => questionId === questionIdParam
      ).length > 0
    ) {
      return {
        color: "green"
      }
    }
    return {
      color: "white",
      backgroundColor: "#FF2E2E"
    }
  };

  // setting default question to 1st question.
  if (quizInfo.currentQuestion === ""){
    quizInfo.setCurrentQuestion(questions?.[0]?._id)
  }

  return (
    <Paper
      elevation={12}
      sx={{ width: "max-content", padding: "20px 10px", height: "100vh" }}
    >
      {questions?.map(({ _id: questionId }, idx) => {
        return (
          <Avatar
            sx={{
              marginTop: "15px",
              ...getProperColourForQuestionListing(questionId),
              cursor: 'pointer',
            }}
            key={questionId}
            onClick={() => quizInfo.setCurrentQuestion(questionId)}
          >
            {idx + 1}
          </Avatar>
        );
      })}
    </Paper>
  );
};

export default QuestionListButtons;
