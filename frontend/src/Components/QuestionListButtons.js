import { Avatar, Paper } from '@mui/material'
import React from 'react'

const QuestionListButtons = ({questions}) => {
    console.log(':::QUESTIONS', questions);
  return (
    <Paper elevation={12} sx={{width: 'max-content', padding: '20px 10px', height:'100vh'}}>
        {
            questions?.map((question, idx) => {
                return (
                    <Avatar sx={{marginTop: '15px'}} key={question._id}>{idx+1}</Avatar>
                )
            })
        }
    </Paper>
  )
}

export default QuestionListButtons