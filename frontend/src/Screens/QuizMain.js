import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchQuizById } from "../api/quizApis/Query";
import { Box, Fade, Grid, Modal, Typography, Button } from "@mui/material";
import QuestionListButtons from "../Components/QuestionListButtons";
import QuizMainComponent from "../Components/QuestionMainComponent";
import QuizSubmit from "../Components/QuizSubmit";
import { QuizContext } from "../contexts/QuizContext";
import Backdrop from "@mui/material/Backdrop";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const QuizMain = () => {
  const params = useParams();
  const {
    modalOpen = false,
    setModalOpen = () => {},
    modalData = {},
    submitQuiz = () => {},
  } = useContext(QuizContext);
  const { quizId } = params;
  const {
    data: { data: { data = {} } = {} } = {},
    isLoading,
    isError,
    error,
  } = useQuery(["quiz", quizId], () => fetchQuizById(quizId), {
    refetchOnReconnect: true,
  });
  if (isLoading) return <h1>Loading.....</h1>;
  if (isError) return <h1>{error.message}</h1>;

  return data ? (
    <>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Typography variant="h5" component="h2">
              {modalData.title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {`Questions Attempted: ${modalData?.subTitle?.numberOfQuestionsAttempted}`}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {`Total Questions: ${modalData?.subTitle?.totalQuestions}`}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "20px",
                marginTop: "20px",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                sx={{ marginRight: "15px" }}
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => submitQuiz({ quizId })}
              >
                Submit
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Grid container spacing={2}>
        <Grid item xs={1.5}>
          <QuestionListButtons questions={data?.questions} />
        </Grid>
        <Grid item xs={7.5}>
          <QuizMainComponent data={data} />
        </Grid>
        <Grid item xs={3} sx={{ position: "relative" }}>
          <QuizSubmit data={data} />
        </Grid>
      </Grid>
    </>
  ) : (
    <h1>Nothing</h1>
  );
};

export default QuizMain;
