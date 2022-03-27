import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { login } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import ShowAlert from "../Components/ShowAlert";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  const authState = useSelector((state) => state.auth);
  const { isAuth } = authState;

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Box sx={{ height: "100vh", width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>

          <Grid item xs={4}>
            <Paper style={{padding:"10px 40px 40px 40px", marginTop:"10%"}} elevation={3}>
              <h1 style={{ marginTop: "2rem" }}>Sign In</h1>
              <ShowAlert />

              <Form style={{ marginTop: "2rem" }}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
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
