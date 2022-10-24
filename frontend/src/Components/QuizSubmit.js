import { Button, Card, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { QuizContext } from "../contexts/QuizContext";

const QuizSubmit = () => {
    const quizInfo = useContext(QuizContext);
    const { quizId = "" } = useParams();
    const {questionsAttempted = [], submitQuiz = () => {} } = quizInfo;
  return (
    <div style={{ position: "absolute", top: "20%" }}>
      <Card
        sx={{
          padding: "20px",
          width: "fit-content",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <Typography variant="h5">
            Questions Attempted: <span>{questionsAttempted.length}</span>
        </Typography>
        <br />
        <Button variant="contained" color="success" onClick={() => submitQuiz({quizId})}>
          Submit Quiz
        </Button>
      </Card>
    </div>
  );
};

export default QuizSubmit;
