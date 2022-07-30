import { Typography, Box, Paper, CardContent, Card, CardActions, Button, Stack } from '@mui/material'
import React, {useEffect, useState} from 'react'
import {fetchAllQuizes} from '../actions/quizzes'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {Snackbar, Alert, CircularProgress, Skeleton, Grid, Autocomplete, TextField} from '@mui/material'
import { setErrors } from '../actions/errors'


function Homepage() {
  const dispatch = useDispatch()
  const {quizzes = {}, loading, error, errorMsg} = useSelector(state => state.quizzes)
  const {errors} = useSelector(state => state.error)
  const [cardContentLoading, setCardContentLoading] = useState(false)
  let location = useLocation();
  console.log(location.key)
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
                  <Grid item xs={8}>
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

                  <Grid item xs={4}></Grid>
                </Grid>
              </>
              {quizzes?.data?.map(({ name, _id }) => (
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
                      <Typography sx={{ fontSize: 30 }} color="text.primary">
                        {name}
                      </Typography>
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
                      <Button size="medium">Start Quiz</Button>
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