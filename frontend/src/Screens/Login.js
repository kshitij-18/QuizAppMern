import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { login } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ShowAlert from "../Components/ShowAlert";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField, Typography } from "@mui/material";
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({userNameError:false, passwordError:false})
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(username === ""){
      setError({...error, userNameError:true})
      return
    } else if(password === ""){
      setError({...error, passwordError:true})
      return
    } 
    else {
      dispatch(login({ username, password }));
      return
    }
  };

  const authState = useSelector((state) => state.auth);
  const { isAuth } = authState;

  if (isAuth) {
    navigate("/",{replace:true, state:{
      message:"You are already logged in",
      severity:"info"
    }})
  }

  return (
    <div>
      <Box sx={{ height: "100vh", width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>

          <Grid item xs={4} sm={3}>
            <Paper className="paper__class" 
            style={{padding:"10px 40px 40px 40px", marginTop:"10%", alignItems:"center", justifyContent:"center", display:"flex", flexDirection:"column"}} elevation={3}>
              {/* <h1 style={{ marginTop: "2rem" }}>Sign In</h1> */}
              <Typography variant="h3" >Sign In</Typography>
              <ShowAlert />

              <Form style={{ marginTop: "2rem" }}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="username">
                      {/* <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      /> */}
                      <TextField 
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined" 
                        value={username}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                        error={error.userNameError}
                        helperText={error.userNameError ? "Username cannot be empty":"Enter your Username"}
                      />
                    </Form.Group>
                  </Col>

                    <Form.Group className="mb-3" controlId="password">
                      {/* <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      /> */}
                      <TextField 
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" 
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                        error={error.passwordError}
                        helperText={error.passwordError ? "Password cannot be empty":"Enter your Password"}
                      />
                    </Form.Group>
                </Row>

                {/* <Button variant="dark" type="submit" onClick={handleSubmit}>
                    Submit
                </Button> */}
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
  );
};

export default Login;
