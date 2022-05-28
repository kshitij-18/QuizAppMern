import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import {Card, CardContent, Typography, TextField, Select, MenuItem, FormControl, InputLabel} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setErrors } from '../actions/errors'
import './AddQuizForm.css'

const AddQuizForm = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  useEffect(() => {
    console.log(user && user.data && !user.data.isAdmin)
    if(user && user.data && !user.data.isAdmin){
      <Redirect to="/" />
      dispatch(setErrors("You are not the Admin you are not allowed back there"))
    }
    
  }, [])

  const [quizTitle, setQuizTitle] = useState('')
  const [quizCourse, setQuizCourse] = useState('')

  return (
    <div className="addquiz_form">
      <Card
        sx={{ width: "100%", minHeight: 400, borderRadius: 4, padding: "15px" }}
      >
        <CardContent>
          <Typography fontSize={46} fontFamily={"'Koulen', cursive;"}>
            Add Quiz
          </Typography>
          <div id="quiz_details">
            <div id="quiz_title">
              <TextField
                label="Quiz Title"
                variant="outlined"
                fullWidth
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
              />
            </div>
            <div id="quiz_course">
              <TextField
                value={quizCourse}
                label="Quiz Course"
                onChange={(e) => setQuizCourse(e.target.value)}
                select
                fullWidth
              >
                {["Basic G.K.", "Advanced G.K.", "Basic Current Affairs"].map(
                  (course, idx) => {
                    return (
                      <MenuItem key={idx} value={course}>
                        {course}
                      </MenuItem>
                    );
                  }
                )}
              </TextField>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddQuizForm