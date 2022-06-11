// TODO - Add Validation for input fields while submitting the form 

import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import {Card, 
  CardContent, 
  Typography, 
  TextField, 
  MenuItem, 
  Button, 
  Switch, 
  FormGroup, 
  FormControlLabel,
  IconButton,
  Snackbar,
  Alert} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import { Redirect } from 'react-router-dom'
import { setErrors } from '../actions/errors'
import {v4 as uuidv4} from 'uuid'
import './AddQuizForm.css'
import { AVAILABLE_QUIZ_COURSES } from '../utils/constants';

const AddQuizForm = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const {errors} = useSelector(state => state.error)
  useEffect(() => {
    console.log(user && user.data && !user.data.isAdmin)
    if(user && user.data && !user.data.isAdmin){
      <Redirect to="/" />
      dispatch(setErrors("You are not the Admin you are not allowed back there"))
    }
    
  }, [])

  // This is where our states go
  const [quizTitle, setQuizTitle] = useState('')
  const [quizCourse, setQuizCourse] = useState('')
  const [questions, setQuestions] = useState([
    {
      id:uuidv4(),
      text:'',
      choices:[
        { choice_id:uuidv4(),
          text:'',
          isCorrect:true
        }
      ]
    }
  ])
  const [choicesError, setChoicesError] = useState(false)

  // This function handles the change in Quiz of the title
  const handleQuestionTextChange = (e, question) => {
    const newQuestions = questions.map(ques => {
      if(ques.id === question.id) question.text = e.target.value
      return ques
    })
    setQuestions(newQuestions)
  }

  // Function to add a new choice to a question
  const addChoice = (e, question) => {
    const newChoice = {
      choice_id:uuidv4(),
      text:'',
      isCorrect:false
    }

    const questionsWithUpdatedChoices = questions.map(ques => {
      if (ques.id === question.id) question.choices.push(newChoice);
      return ques
    })

    setQuestions(questionsWithUpdatedChoices);
  }

  const handleChangeInChoices = (e, question, choice, type='text') => {
    const questionMapping = new Map()
    questions.forEach(ques => questionMapping.set(ques.id, ques))
    const questionToChange = questionMapping.get(question.id);
    
    if(type === 'text'){  
      questionToChange.choices.map(ch => {
        if(ch.choice_id === choice.choice_id) choice.text = e.target.value
        return ch
      })
    } else if(type === 'switch'){
      /*
      This is done because if we are selecting one option to be
      correct we should automatically clear other option which are selected to be correct first
      */
      if (e.target.checked) {
        questionToChange.choices.map((ch) => {
          if (ch.isCorrect && choice.choice_id !== ch.choice_id) {
            ch.isCorrect = false;
          }
          if (ch.choice_id === choice.choice_id)
            choice.isCorrect = e.target.checked;
          return ch;
        });
      }
      else {
        dispatch(setErrors("A question must have at least one correct option"));
      }
    } else if(type === 'delete_choice'){
      const index = question.choices.indexOf(choice)
      if(index > -1) question.choices.splice(index,1)
    }
    setQuestions([...questionMapping.values()])
  }

  const addQuestions = () => {
    const newQuestion = {
      id:uuidv4(),
      text:'',
      choices:[
        { choice_id:uuidv4(),
          text:'',
          isCorrect:true
        }
      ]
    }
    setQuestions([...questions, newQuestion])
  }

  const deleteQuestion = (question_id) => {
    setQuestions(questions.filter(ques => ques.id !== question_id))
  }

  const handleSubmit = () => {
    const data = {
      name:quizTitle,
      course:quizCourse,
    };
    const finalQuestions = questions;
    /*
    for each question we need to remove the id of each question and choice_id of its choices 
    and add course key to each question
    */ 
   finalQuestions.map(ques => {
     delete ques.id;
     ques.course = quizCourse;
     ques.choices.map(ch => {
       delete ch.choice_id;
     })
   })
   data.questions = finalQuestions;
   console.log(data)
  }

  return (
    <div className="addquiz_form">
      {errors.map((err) => (
        <>
          <Snackbar
            open={err !== null}
            key={err.id}
            color="danger"
          >
            <Alert
              severity={err.severity}
              sx={{ width: "100%" }}
            >
              {err.error}
            </Alert>
          </Snackbar>
        </>
      ))}
      <Card
        sx={{ width: "100%", minHeight: 400, borderRadius: 4, padding: "15px" }}
      >
        <CardContent>
          <Typography fontSize={46} fontFamily={"'Koulen', cursive;"}>
            Create a Quiz
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
            <div id="quiz_course" style={{ marginBottom: "2%" }}>
              <TextField
                value={quizCourse}
                label="Quiz Course"
                onChange={(e) => setQuizCourse(e.target.value)}
                select
                fullWidth
              >
                {AVAILABLE_QUIZ_COURSES.map((course, idx) => {
                  return (
                    <MenuItem key={idx} value={course}>
                      {course}
                    </MenuItem>
                  );
                })}
              </TextField>
            </div>
          </div>
          {questions.map((question, idx, questions_arr) => (
            <div key={question.id} className="question">
              <hr />
              <Typography fontSize={30} fontFamily={"'Koulen', cursive;"}>
                {`Question ${idx + 1}`}
              </Typography>
              <TextField
                label="Question"
                variant="outlined"
                fullWidth
                value={question.text}
                onChange={(e) => handleQuestionTextChange(e, question)}
                style={{ marginBottom: "2%" }}
              />
              <Typography fontSize={20} fontFamily={"'Koulen', cursive;"}>
                {`Choices`}
              </Typography>
              {question.choices.map((choice, idx, choices_arr) => (
                <div key={choice.choice_id} className="choices">
                  <div className="choice_detail">
                    <div className="choice_number">
                      <Typography
                        fontSize={20}
                        fontFamily={"'Koulen', cursive;"}
                        marginRight
                      >
                        {`${idx + 1}.`}
                      </Typography>
                    </div>
                    <div className="choice_text">
                      <TextField
                        label="Choice Text"
                        variant="outlined"
                        fullWidth
                        value={choice.text}
                        onChange={(e) =>
                          handleChangeInChoices(e, question, choice)
                        }
                      />
                    </div>
                    <div className="choice_isCorrect">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={
                                choices_arr.length === 1
                                  ? true
                                  : choice.isCorrect
                              }
                              onChange={(e) =>
                                handleChangeInChoices(
                                  e,
                                  question,
                                  choice,
                                  "switch"
                                )
                              }
                            />
                          }
                          label="Is Correct?"
                          disabled={choices_arr.length === 1 ? true : false}
                        />
                      </FormGroup>
                    </div>
                    <div className="choice_options">
                      <IconButton onClick={(e) => addChoice(e, question)}>
                        <AddIcon></AddIcon>
                      </IconButton>
                      <IconButton
                        onClick={(e) =>
                          handleChangeInChoices(
                            e,
                            question,
                            choice,
                            "delete_choice"
                          )
                        }
                      >
                        {choices_arr.length > 1 && <DeleteIcon></DeleteIcon>}
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
              <div className="add__question__row">
                {questions_arr.length > 1 && (
                  <Button
                    variant="outlined"
                    color="danger"
                    onClick={() => deleteQuestion(question.id)}
                    style={{ marginRight: "10px", marginTop: "20px" }}
                  >
                    Delete Question
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="success"
                  onClick={addQuestions}
                  style={{ marginRight: "10px", marginTop: "20px" }}
                >
                  Add Question
                </Button>
              </div>
            </div>
          ))}
          <Button onClick={() => handleSubmit()}>Click Me</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddQuizForm