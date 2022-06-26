// TODO - Complete sending the data to the server in handleSubmit function 
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
import { Navigate, useNavigate } from 'react-router-dom'
import { setErrors } from '../actions/errors'
import {v4 as uuidv4} from 'uuid'
import './AddQuizForm.css'
import { AVAILABLE_QUIZ_COURSES } from '../utils/constants';
import { createQuiz } from '../actions/quiz';
import { Nav } from 'react-bootstrap';

function getNewChoice(isCorrect=false){
  this.isCorrect = isCorrect;
  const newChoice = {
      choice_id: uuidv4(),
      text: "",
      choiceError: {
        msg: "",
        status: false,
      },
      isCorrect: this.isCorrect,
    }
  return newChoice;
}

function getNewQuestion(){
const newQuestion = {
  id: uuidv4(),
  text: "",
  questionError: {
    msg: "",
    status: false,
  },
  choices: [new getNewChoice(true), new getNewChoice(false)]
};
return newQuestion;
}



const AddQuizForm = ({isAuth, user}) => {
  console.log('::::::::::::::RENDERED::::::::::::::::')
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const {user, isAuth} = useSelector(state => state.auth);
  console.log(`User is: ${user} isAuth is: ${isAuth}`);
  const {errors} = useSelector(state => state.error)
  const {quiz , loading, error, errorMsg} = useSelector(state => state.quiz);
  

  
  // This is where our states go
  const [quizTitle, setQuizTitle] = useState('')
  const [quizCourse, setQuizCourse] = useState('')
  const questionToStartWith = new getNewQuestion();
  const [questions, setQuestions] = useState([questionToStartWith]);
  const [quizError, setQuizError] = useState({
    title:{
      msg:"",
      state:false
    },
    course:{
      msg:"",
      state:false
    }
  })
  
  if (quiz.data && !loading) {
    navigate("/", {
      replace: true,
      state: {
        message: "Quiz created successfully",
        severity: "success",
      },
    });
  }
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
    const newChoice = new getNewChoice();

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
    const newQuestion = new getNewQuestion();
    setQuestions([...questions, newQuestion])
  }

  const deleteQuestion = (question_id) => {
    setQuestions(questions.filter(ques => ques.id !== question_id))
  }

  const verifyInput = () => {
    let hasIssues = false;
    const errorObj = {
      title:{
        msg:'',
        state:false
      },
      course:{
        msg:'',
        state:false
      }
    }
    if (quizTitle === ''){
      errorObj.title.msg = 'The Quiz Title cannot be empty'
      errorObj.title.state = true;
      hasIssues=true;
    }
    if (quizCourse === '') {
      errorObj.course.msg = 'The Quiz Course cannot be empty'
      errorObj.course.state = true
      hasIssues = true;
    }
    setQuizError(errorObj);
    questions.forEach(ques => {
      if (ques.text === ''){
        ques.questionError.msg = 'Question Text cannot be empty';
        ques.questionError.status = true;
        hasIssues = true;
      }
      ques.choices.forEach(choice => {
        if (choice.text === ''){
          choice.choiceError.msg = 'The Choice text cannot be empty.'
          choice.choiceError.status = true;
          hasIssues=true;
        }
      })
    })
    setQuestions(questions);
    return hasIssues;
  }

  const handleSubmit = () => {
    const doesFormHaveIssues = verifyInput();
    if (!doesFormHaveIssues){
      console.log('Submitting your quiz...')
      const data = {
        name: quizTitle,
        course: quizCourse,
      };
      const finalQuestions = questions;
      /*
        * Important - for each question and choice remove id and error object.
        * and add course key for questions.
    */
      finalQuestions.forEach((ques) => {
        delete ques.id;
        delete ques.questionError;
        ques.course = quizCourse;
        ques.choices.forEach((ch) => {
          delete ch.choice_id;
          delete ch.choiceError
        });
      });
      data.questions = finalQuestions;
      dispatch(createQuiz(data));
    } else {
      dispatch(setErrors("Your form has issues please check before submitting"))
    }
    
  }
  return (
    <div className="addquiz_form">
      {errors.map((err) => (
        <>
          <Snackbar open={err !== null} key={err.id} color="danger">
            <Alert severity={err.severity} sx={{ width: "100%" }}>
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
                required={true}
                error={quizError.title.state && quizTitle === ""}
                helperText={
                  quizError.title.state && quizTitle === ""
                    ? quizError.title.msg
                    : "What will your quiz be called?"
                }
              />
            </div>
            <div id="quiz_course" style={{ marginBottom: "2%" }}>
              <TextField
                value={quizCourse}
                label="Quiz Course"
                onChange={(e) => setQuizCourse(e.target.value)}
                select
                fullWidth
                required={true}
                error={quizError.course.state && quizCourse === ""}
                helperText={
                  quizError.course.state && quizCourse === ""
                    ? quizError.course.msg
                    : "What is the course your quiz comes under?"
                }
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
                error={question.questionError?.status && question.text === ''}
                helperText={
                  question.questionError?.status && question.text === '' && question.questionError?.msg
                }
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
                        error={choice.choiceError?.status && choice.text === ''}
                        helperText={choice.choiceError?.status && 
                          choice.text === '' 
                          && choice.choiceError?.msg }
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
                        <AddIcon />
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
                        {choices_arr.length > 2 && <DeleteIcon></DeleteIcon>}
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