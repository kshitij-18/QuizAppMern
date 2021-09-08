// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './actions/auth'
import { Container } from 'react-bootstrap'
import Login from './Screens/Login';


function App() {

  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(loadUser())
  }, [])
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Container>
            {/* Login Route */}
            <Route exact path="/login" component={Login}></Route>
            {/* SignUp Route */}
          </Container>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
