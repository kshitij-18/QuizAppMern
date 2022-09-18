import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DoDontComponent from '../Components/DoDontComponent';
import QuizStart from '../Components/QuizStart';

const QuizRules = () => {
  const {quizId} = useParams();
  const [quiz, setQuiz] = useState({}); 
  const navigate = useNavigate()
  useEffect(() => {
    const fetchQuizById = async () => {
        try {
            const {data:{data}} = await axios.get(`/api/quiz/${quizId}`);
            setQuiz(data);
        } catch (error) {
            navigate('/', {
                replace: true,
                state:{
                    message: "Sorry could not find the quiz you were looking for",
                    severity: "warning"
                }
            })
        }
    }
    fetchQuizById()
  }, [quizId, navigate])

  return (
    <div>
      <Typography variant="h2" style={{ textAlign: "center" }}>
        {quiz.name}
      </Typography>
      <Typography variant="h4">Rules and Regulations</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <DoDontComponent />
        </Grid>
        <Grid item xs={12} sm={4}>
          <QuizStart noOfQuestions={!!quiz && quiz.questions?.length} quizId={quizId} />
        </Grid>
      </Grid>
    </div>
  );
}

export default QuizRules