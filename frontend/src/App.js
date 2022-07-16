// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './actions/auth'
import { Container } from 'react-bootstrap'
import Login from './Screens/Login';
import Signup from './Screens/Signup'
import Homepage from './Screens/Homepage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddQuizForm from './Screens/AddQuizForm'
import AdminRoutes from './utils/ProtectedRoutes'
import {BrowserRouter as Router,Routes, Route, useLocation} from 'react-router-dom'

function App(props) {
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)
  const alertState = useSelector(state => state.error);
  const {isAuth, user} = authState;

  // console.log("This is the authState at App.js", authState)
  if(localStorage.getItem('token') && !authState.user){
    dispatch(loadUser())
  }

  // console.log("The state at location: "+location.state)

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Homepage />} />

            {/* Login Route */}
            <Route path="/login" element={<Login />}></Route>
            {/* SignUp Route */}
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/admin/addQuiz"
              element={
                <AdminRoutes isLoggedIn={isAuth} isAdmin={user?.data?.isAdmin}>
                  <AddQuizForm />
                </AdminRoutes>
              }
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
