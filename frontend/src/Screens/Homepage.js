import { Typography, 
  Box, 
  CardContent, 
  Card, 
  CardActions, 
  Button, 
  Chip, 
  FormControl, 
  Select, 
  InputLabel, 
  Pagination} from '@mui/material'
import React, {useEffect, useState, useMemo} from 'react'
import {fetchAllQuizes} from '../actions/quizzes'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useSearchParams, useNavigate} from 'react-router-dom'
import {Snackbar, Alert, CircularProgress, Skeleton, Grid, Autocomplete, TextField, MenuItem} from '@mui/material'
import { setErrors } from '../actions/errors'
import axios from 'axios'
import { ITEMS_PER_PAGE_OPTIONS } from '../utils/constants'


function Homepage() {
  const dispatch = useDispatch()
  const {quizzes = {}, loading} = useSelector(state => state.quizzes)
  const [quizCourseOptions, setQuizCourseOptions] = useState([]);
  const {errors} = useSelector(state => state.error)
  const [cardContentLoading, setCardContentLoading] = useState(false)
  const [pageSize, setPageSize] = useState(1);
  const [page, setPage] = useState(1);
  let location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
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
  }, [dispatch])

  const course = searchParams.get("course");
  const search = searchParams.get('search');

  const skip = (page-1) * pageSize;

  useEffect(() => {
    dispatch(fetchAllQuizes(course, search, pageSize, skip));
  }, [dispatch, pageSize, page, course, search, skip])

  const resetPagination = () => {
    setPage(1);
    setPageSize(1);
  } 

  const handleChnageInNameQuery = (e) => {
    searchParams.set('search', e.target.value);
    resetPagination();
    setSearchParams(searchParams);
  }

  const handleChangeInCourse = (e) => {
    searchParams.set('course', e.target.value);
    resetPagination();
    setSearchParams(searchParams);
  }

  const handleClearFilters = () => {
    const filters = {}
    resetPagination();
    setSearchParams(filters);
  }

  const handleMovingToQuizPage = (id) => {
    navigate(`/quiz/${id}`);
  }

  const handleChangeInPageSize = (event) => {
    setPageSize(event.target.value);
  }

  const getCorrectCountOfPages = () => {
    const {totalCount = 0} = quizzes;
    return Math.ceil(totalCount/pageSize);
  }

  const handleChangeInPage = (_, value) => {
    setPage(value);
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
                          onChange={handleChnageInNameQuery}
                        />
                      )}
                      value={searchParams.get("search") || ""}
                      options={[].map(() => {})}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      label="Quiz Course"
                      fullWidth
                      select
                      value={searchParams.get("course") || ""}
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
              <>
                <Grid container mb={4} spacing={2}>
                  <Grid item xs={8}>
                    <Pagination
                      page={page}
                      size="large"
                      count={!loading && getCorrectCountOfPages()}
                      onChange={handleChangeInPage}
                      defaultPage={1}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Items Per Page
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={pageSize}
                        defaultValue={10}
                        label="Items Per Page"
                        onChange={handleChangeInPageSize}
                      >
                        {ITEMS_PER_PAGE_OPTIONS.map(({ label, value }) => (
                          <MenuItem value={value}>{label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={2}></Grid> */}
                </Grid>
              </>
              {Boolean(quizzes?.data?.length) ? (
                quizzes?.data?.map(({ name, course, _id }) => (
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
                          <Typography
                            sx={{ fontSize: 30 }}
                            color="text.primary"
                          >
                            {name}
                          </Typography>
                          <Typography sx={{ fontSize: 10 }}>
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
                        <Button
                          onClick={() => handleMovingToQuizPage(_id)}
                          size="medium"
                        >
                          Start Quiz
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                ))
              ) : (
                <Typography variant='h2' textAlign='center'>No Results...</Typography>
              )}
            </div>
            <div style={{ height: "200px", width: "300px", flex: 1 }}></div>
          </Box>
        </>
      )}
    </div>
  );
}

export default Homepage