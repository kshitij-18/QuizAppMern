import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {fetchQuizById} from '../api/quizApis/Query'
import {useFullScreenHandle, FullScreen} from 'react-full-screen'
import { Grid } from "@mui/material";
import QuestionListButtons from "../Components/QuestionListButtons";



const QuizMain = () => {
  const params = useParams();
  const { quizId } = params;
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    setIsFullScreen(true);
  }, []);
  const { data:{data:{data ={} } = {}} = {}, isLoading, isError, error } = useQuery(["quiz", quizId], () =>
  fetchQuizById(quizId)
  );
  const handleFullScreen = useFullScreenHandle();

  if (isLoading) return <h1>Loading.....</h1>;
  if (isError) return <h1>{error.message}</h1>;
  return data ? (
    
    <>
      <h1>To start the quiz you have to go into full screen Mode.</h1>
      <button onClick={handleFullScreen.enter}>Go Full Screen</button>
      <FullScreen isFullScreen={isFullScreen} handle={handleFullScreen}>
        {handleFullScreen.active && (
          <Grid container spacing={2}>
            <Grid item xs={1.5}>
             <QuestionListButtons questions={data?.questions} />
            </Grid>
            <Grid item xs={7.5}>
              <h1 style={{textAlign: 'center'}}>hello</h1>
            </Grid>
            <Grid item xs={3}>
              <h1 style={{textAlign:'center'}}>hello</h1>
            </Grid>
          </Grid>
        )}
      </FullScreen>
    </>
  ) : (
    <h1>Nothing</h1>
  );
};

export default QuizMain;
