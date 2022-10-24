import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchQuizById } from "../api/quizApis/Query";
import { useFullScreenHandle, FullScreen } from "react-full-screen";
import { Button, Grid, Modal, Typography } from "@mui/material";
import QuestionListButtons from "../Components/QuestionListButtons";
import QuizMainComponent from "../Components/QuestionMainComponent";
import QuizContextComponent from "../contexts/QuizContext";
import QuizSubmit from "../Components/QuizSubmit";

const QuizMain = () => {
  const params = useParams();
  const { quizId } = params;
  const {
    data: { data: { data = {} } = {} } = {},
    isLoading,
    isError,
    error,
  } = useQuery(["quiz", quizId], () => fetchQuizById(quizId), {refetchOnReconnect: true});
  if (isLoading) return <h1>Loading.....</h1>;
  if (isError) return <h1>{error.message}</h1>;  

  return data ? (
    <QuizContextComponent>
      <Grid container spacing={2}>
        <Grid item xs={1.5}>
          <QuestionListButtons questions={data?.questions} />
        </Grid>
        <Grid item xs={7.5}>
          <QuizMainComponent data={data} />
        </Grid>
        <Grid item xs={3} sx={{position: "relative"}}>
          <QuizSubmit />
        </Grid>
      </Grid> 
    </QuizContextComponent>
  ) : (
    <h1>Nothing</h1>
  );
};

export default QuizMain;
