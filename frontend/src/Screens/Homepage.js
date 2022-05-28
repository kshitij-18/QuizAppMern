import { Typography, Box, Paper, CardContent, Card, CardActions, Button } from '@mui/material'
import React, {useEffect} from 'react'
import {fetchAllQuizes} from '../actions/quizzes'
import {useDispatch, useSelector} from 'react-redux'

function Homepage() {
  const dispatch = useDispatch()
  const {quizzes} = useSelector(state => state.quizzes)

  useEffect(() => {
    dispatch(fetchAllQuizes())
  },[dispatch])

  return (
    <div style={{height:"100vh"}}>   
        <Box mt={2} sx={{display:'flex', flexWrap:"wrap", justifyContent:"space-evenly"}}>
          <div style={{height:"200px", width:"300px", flex:1}}></div>
          <div style={{width:"300px", flex:3.5, display:'flex', flexWrap:"wrap"}}>
            <Card sx={{minWidth:275, margin:"10px"}}>
              <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
             Word of the Day
              </Typography>
              </CardContent>
              <CardActions>
        <Button size="medium">Start Quiz</Button>
      </CardActions>
            </Card>


            <Card sx={{minWidth:275, margin:"10px"}}>
              <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
             Word of the Day
              </Typography>
              </CardContent>
              <CardActions>
        <Button size="medium">Start Quiz</Button>
      </CardActions>
            </Card>


            <Card sx={{minWidth:275, margin:"10px"}}>
              <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
             Word of the Day
              </Typography>
              </CardContent>
              <CardActions>
        <Button size="medium">Start Quiz</Button>
      </CardActions>
            </Card>


            <Card sx={{minWidth:275, margin:"10px"}}>
              <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
             Word of the Day
              </Typography>
              </CardContent>
              <CardActions>
        <Button size="medium">Start Quiz</Button>
      </CardActions>
            </Card>


            <Card sx={{minWidth:275, margin:"10px"}}>
              <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
             Word of the Day
              </Typography>
              </CardContent>
              <CardActions>
        <Button size="medium">Start Quiz</Button>
      </CardActions>
            </Card>


          </div>
          <div style={{height:"200px", width:"300px", flex:1}}></div>
        </Box>
        
    </div>
  )
}

export default Homepage