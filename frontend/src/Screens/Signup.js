import React, { useEffect } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import useForm from '../hooks/useForm'
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Input

} from "@mui/material"
import ShowAlert from "../Components/ShowAlert";
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../actions/auth'
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material'

const SignUp = () => {
    const [values, onChange, onSubmit] = useForm()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        dispatch(signup(values))
    }
    useEffect(() => console.log(values), [values])
    const authState = useSelector(state => state.auth)

    if(authState.isAuth){
        return <Redirect to="/" />
    }

    const Input = styled('input')({
        display: 'none',
      });

    return (
        <div>
        <Box sx={{ height: "100vh", width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
  
            <Grid item xs={12} sm={6} >
              <Paper className="paper__class" 
              style={{padding:"10px 40px 40px 40px", marginTop:"10%", alignItems:"center", justifyContent:"center", display:"flex", flexDirection:"column"}} elevation={3}>
                {/* <h1 style={{ marginTop: "2rem" }}>Sign In</h1> */}
                <Typography variant="h3" >Sign Up</Typography>
                <ShowAlert />
  
                <Form style={{ marginTop: "2rem" }} enctype="multipart/form-data">
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="name">
                        <TextField 
                          id="outlined-basic" 
                          label="Name" 
                          variant="outlined" 
                          name="name"
                          value={values.name ? values.name:" "}
                          onChange={(e) => onChange(e)}
                          type="text"
                          required
                          helperText={"Enter your name"}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="email">
                        <TextField 
                          id="outlined-basic" 
                          label="Email" 
                          variant="outlined" 
                          name="email"
                          value={values.email ? values.email : ""}
                          type="email"
                          onChange={e => onChange(e)}
                          required
                          helperText={"Enter your email"}
                        />
                      </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="username">
                        <TextField 
                          id="outlined-basic" 
                          label="Username" 
                          variant="outlined" 
                          name="username"
                          value={values.username ? values.username : ""}
                          onChange={e => onChange(e)}
                          type="text"
                          required
                          helperText={"Enter your Username"}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="password">
                        <TextField 
                          id="outlined-basic" 
                          label="Password" 
                          variant="outlined" 
                          name="password"
                          value={values.password ? values.password : ""}
                          onChange={e => onChange(e)}
                          type="password"
                          required
                          helperText={"Enter your password"}
                        />
                      </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                  <Form.Group className="mb-3" controlId="password">
                      <p>Profile Picture</p>
                  <label htmlFor="contained-button-file">
                    <Input 
                    accept="image/*" 
                    name='profilePicture'
                    id="contained-button-file" 
                    onChange={e => onChange(e)}
                    multiple 
                    filename={values.profilePicture}
                    type="file" 
                    display="none" />
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                        <span>
                            {values?.profilePicture?.name}
                        </span>
                    </label>
                    
                    </Form.Group>
                    </Row>
                  <Button variant="contained" onClick={handleSubmit}>
                    Login
                  </Button>
                </Form>
              </Paper>
            </Grid>
  
            <Grid item xs={4}></Grid>
          </Grid>
        </Box>
      </div>
        
    )
}

export default SignUp
