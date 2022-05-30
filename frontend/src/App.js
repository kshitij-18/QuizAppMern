// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './actions/auth'
import { Container } from 'react-bootstrap'
import Login from './Screens/Login';
import Signup from './Screens/Signup'
import Homepage from './Screens/Homepage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddQuizForm from './Screens/AddQuizForm'
import ProtectedRoutes from './utils/ProtectedRoutes'

function App() {
  // const theme = React.useMemo(() => createTheme({
  //   palette:{
  //     mode:"dark"
  //   }
  // }), [])
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)
  const {isAuth} = authState
  // useEffect(() => {
  //   dispatch(loadUser())
  // }, [])

  // if(authState.isAuth){
  //   dispatch(loadUser())
  // }

  console.log("This is the authState at App.js", authState)
  if(localStorage.getItem('token') && !authState.user){
    dispatch(loadUser())
  }

  return (
    <div className="App">
      
      <Router>
        <Navbar />
        <Switch>
        <Route exact path="/" component={Homepage} />
          <Container>
            {/* Login Route */}
            <Route exact path="/login" component={Login}></Route>
            {/* SignUp Route */}
            <Route exact path="/signup" component={Signup} />
            <ProtectedRoutes isLoggedIn={isAuth}>
              <Route exact path="/admin/addQuiz" component={AddQuizForm} />
            </ProtectedRoutes>
          </Container>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
