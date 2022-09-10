import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CardheadingStyle = { 
    textAlign: 'center', 
    fontSize: 22, 
    fontWeight: 'bold' 
}

const InstructionStyle = {
    textAlign: 'center',
    fontSize:18
}


const QuizStart = ({noOfQuestions, quizId}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Card style={{ marginTop: 10, borderRadius: 5, paddingBottom: 10 }}>
        <CardContent>
          <Typography sx={CardheadingStyle} color="primary" gutterBottom testId="instructionHeading">
            Instructions
          </Typography>

          <Typography sx={InstructionStyle} gutterBottom>
            The total time for this test is {noOfQuestions*5} minutes.
            <br />
            <br />
            There are a total of {noOfQuestions} questions in this quiz.
          </Typography>
        </CardContent>
        <CardActions sx={{justifyContent: 'center'}}>
            <Button variant='contained' onClick={() => navigate(`/quiz/start/${quizId}`, {
              replace: true
            })}>
                Start Quiz
            </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default QuizStart