import { Typography, Box, Paper, CardContent, Card, CardActions, Button, Stack, Chip } from '@mui/material'
import React, {useEffect, useState} from 'react'
import {fetchAllQuizes} from '../actions/quizzes'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useSearchParams, useNavigate} from 'react-router-dom'
import {Snackbar, Alert, CircularProgress, Skeleton, Grid, Autocomplete, TextField, MenuItem} from '@mui/material'
import { setErrors } from '../actions/errors'
import axios from 'axios'


function Homepage() {
  const dispatch = useDispatch()
  const {quizzes = {}, loading, error, errorMsg} = useSelector(state => state.quizzes)
  const [quizCourseOptions, setQuizCourseOptions] = useState([]);
  const [quizCourseFilter, setQuizCourseFilter] = useState("");
  const {errors} = useSelector(state => state.error)
  const [cardContentLoading, setCardContentLoading] = useState(false)
  let location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({});
  if (location.state !== null){
    let message = location.state.message;
    let severity = location.state.severity;
    location.state = null;
    dispatch(setErrors(message, severity));
  }
  const navigate = useNavigate();
  useEffect(() => { 
    const fetchCategories = async () => {
      try {
        const {data: {result}} = await axios.get('/api/quiz/categories');
        setQuizCourseOptions([...result]);
      } catch (error) {
        dispatch(setErrors(error.message, 'error'))
      }
    }
    fetchCategories();
  }, [])

  const course = searchParams.get("course");

  useEffect(() => {
    console.log(':::::::Fetching all quizzes::::::::')
    dispatch(fetchAllQuizes(course));
  }, [dispatch, searchParams.toString()])

  const handleChangeInCourse = (e) => {
    setSearchParams({
      ...searchParams,
      course: e.target.value
    })
  }

  const handleClearFilters = () => {
    const filters = {}
    setSearchParams(filters);
  }

  const handleMovingToQuizPage = (id) => {
    navigate(`/quiz/${id}`);
  }

  return (
    <div style={{ height: "100vh" }}>
      {errors?.map((err) => (
        <>
          <Snackbar
            open={err !== null}
            key={location.key}
            color={err?.severity}
            autoHideDuration={3000}
          >
            <Alert severity={err?.severity} sx={{ width: "100%" }}>
              {err?.error}
            </Alert>
          </Snackbar>
        </>
      ))}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
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
              <>
                <Grid container mt={2} mb={4} spacing={2}>
                  <Grid item xs={6}>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search"
                          InputProps={{ ...params.InputProps, type: "search" }}
                        />
                      )}
                      options={[].map(() => {})}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      label="Quiz Course"
                      fullWidth
                      select
                      onChange={handleChangeInCourse}
                    >
                      {quizCourseOptions.map((course, idx) => (
                        <MenuItem key={idx} value={course}>
                          {course}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={3}>
                    <Chip
                      variant="outlined"
                      onClick={handleClearFilters}
                      label="Clear filters"
                    />
                  </Grid>
                </Grid>
              </>
              {quizzes?.data?.map(({ name, course, _id }) => (
                <Card
                  sx={{
                    minWidth: 250,
                    margin: "10px",
                    maxHeight: 150,
                    paddingBottom: 5,
                  }}
                  key={_id}
                >
                  <CardContent>
                    {cardContentLoading ? (
                      <React.Fragment>
                        <Skeleton
                          animation="wave"
                          variant="text"
                          width={100}
                          height={40}
                        />
                      </React.Fragment>
                    ) : (
                      <>
                        <Typography sx={{ fontSize: 30 }} color="text.primary">
                          {name}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 10 }}
                        >
                          {course}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                  <CardActions>
                    {cardContentLoading ? (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={50}
                        height={40}
                      />
                    ) : (
                      <Button onClick={() => handleMovingToQuizPage(_id) } size="medium">Start Quiz</Button>
                    )}
                  </CardActions>
                </Card>
              ))}
            </div>
            <div style={{ height: "200px", width: "300px", flex: 1 }}></div>
          </Box>
        </>
      )}
    </div>
  );
}

export default Homepage