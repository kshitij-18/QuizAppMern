import { Button, Card, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { QuizContext } from "../contexts/QuizContext";

const QuizSubmit = ({data: {questions}}) => {
  const quizInfo = useContext(QuizContext);
  
  const {
    questionsAttempted = [],
    submitQuiz = () => {},
    setModalOpen = () => {},
    setModalData,
  } = quizInfo;

  const openModalOnSubmit = () => {
    setModalData({
      title: "Are you sure you want to submit the Quiz?",
      subTitle: {
        numberOfQuestionsAttempted: questionsAttempted.length,
        totalQuestions: questions.length
      }
    })
    setModalOpen(true)
  }

  return (
    <div style={{ position: "absolute", top: "20%" }}>
      <Card
        sx={{
          padding: "20px",
          width: "fit-content",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">
          Questions Attempted: <span>{questionsAttempted.length}</span>
        </Typography>
        <br />
        <Button
          variant="contained"
          color="success"
          // onClick={() => submitQuiz({ quizId })}
          onClick={openModalOnSubmit}
        >
          Submit Quiz
        </Button>
      </Card>
    </div>
  );
};

export default QuizSubmit;
