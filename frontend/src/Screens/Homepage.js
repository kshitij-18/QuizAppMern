import { Typography, Box, Paper, CardContent, Card, CardActions, Button } from '@mui/material'
import React, {useEffect} from 'react'
import {fetchAllQuizes} from '../actions/quizzes'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {Snackbar, Alert} from '@mui/material'
import { setErrors } from '../actions/errors'


function Homepage() {
  const dispatch = useDispatch()
  const {quizzes} = useSelector(state => state.quizzes)
  const {errors} = useSelector(state => state.error)
  let location = useLocation();
  if (location.state !== null){
    let message = location.state.message;
    let severity = location.state.severity;
    location.state = null;
    dispatch(setErrors(message, severity));
  }

  useEffect(() => {
    dispatch(fetchAllQuizes())
  },[dispatch])

  return (
    <div style={{ height: "100vh" }}>
      {errors?.map((err) => (
          <>
          <Snackbar open={err !== null} key={location.key} color={err?.severity} autoHideDuration={3000}>
            <Alert severity={err?.severity} sx={{ width: "100%" }}>
              {err?.error}
            </Alert>
          </Snackbar>
        </>
      ))
        
      }
      <Box
        mt={2}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ height: "200px", width: "300px", flex: 1 }}></div>
        <div
          style={{
            width: "300px",
            flex: 3.5,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Card sx={{ minWidth: 275, margin: "10px" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium">Start Quiz</Button>
            </CardActions>
          </Card>

          <Card sx={{ minWidth: 275, margin: "10px" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium">Start Quiz</Button>
            </CardActions>
          </Card>

          <Card sx={{ minWidth: 275, margin: "10px" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium">Start Quiz</Button>
            </CardActions>
          </Card>

          <Card sx={{ minWidth: 275, margin: "10px" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium">Start Quiz</Button>
            </CardActions>
          </Card>

          <Card sx={{ minWidth: 275, margin: "10px" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium">Start Quiz</Button>
            </CardActions>
          </Card>
        </div>
        <div style={{ height: "200px", width: "300px", flex: 1 }}></div>
      </Box>
    </div>
  );
}

export default Homepage