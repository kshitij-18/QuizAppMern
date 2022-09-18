import React, { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchQuizById } from "../api/quizApis/Query";
import { useFullScreenHandle, FullScreen } from "react-full-screen";
import { Grid } from "@mui/material";
import QuestionListButtons from "../Components/QuestionListButtons";
import QuizMainComponent from "../Components/QuestionMainComponent";
import { REDUCER_ACTIONS } from "../utils/constants";

const modalState = {
  exitModal: false,
  submitModal: false,
  timeUpModal: false,
};

const modalReducer = (action, modalState) => {
  const { TOGGLE_EXIT_MODAL, TOGGLE_SUBMIT_MODAL, TOGGLE_TIMEUP_MODAL } =
    REDUCER_ACTIONS;
  switch (action.type) {
    case TOGGLE_EXIT_MODAL:
      return {
        ...modalState,
        exitModal: !modalState.exitModal,
      };
    case TOGGLE_SUBMIT_MODAL:
      return {
        ...modalState,
        submitModal: !modalState.submitModal
      }
    case TOGGLE_TIMEUP_MODAL:
      return {
        ...modalState,
        timeUpModal: !modalState.timeUpModal,
      };
    default:
      return modalState;
  }
};

const QuizMain = () => {
  const [modalsState, dispatchModalState] = useReducer(modalReducer, modalState)
  console.log('::::MODALSATE', modalsState);
  const params = useParams();
  const { quizId } = params;
  const {
    data: { data: { data = {} } = {} } = {},
    isLoading,
    isError,
    error,
  } = useQuery(["quiz", quizId], () => fetchQuizById(quizId));
  const handleFullScreen = useFullScreenHandle();

  if (isLoading) return <h1>Loading.....</h1>;
  if (isError) return <h1>{error.message}</h1>;

  const handleChange = (e, handle) => {
    // e.preventDefault();
    console.log(handle);
  };

  return data ? (
    <>
      <h1>To start the quiz you have to go into full screen Mode.</h1>
      <button onClick={handleFullScreen.enter}>Go Full Screen</button>
      <FullScreen
        handle={handleFullScreen}
        onChange={handleChange}
      >
        {handleFullScreen.active && (
          <Grid container spacing={2}>
            <Grid item xs={1.5}>
              <QuestionListButtons questions={data?.questions} />
            </Grid>
            <Grid item xs={7.5}>
              <QuizMainComponent data={data} />
            </Grid>
            <Grid item xs={3}>
              <h1 style={{ textAlign: "center" }}>hello</h1>
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
