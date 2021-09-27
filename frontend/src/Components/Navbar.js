import { Navbar, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Navbar.css'
import {useDispatch, useSelector} from 'react-redux'
import {FaUserCircle} from 'react-icons/fa'
import { logout } from '../actions/auth'
import { Redirect } from 'react-router'

const NavbarHead = () => {
    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)
    console.log(authState)
    
    const Logout = () => {
        dispatch(logout())
    }

    const {isAuth, user} = authState
    
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <Link to="/">
                            QuizUp
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        {/* <Navbar.Text>
                            <Link to="/login">Login</Link>
                        </Navbar.Text>
                        <Navbar.Text>
                            <Link to="/">Sign Up</Link>
                        </Navbar.Text> */}
                        {
                            isAuth && user ? (
                            // <Navbar.Text>
                            //     <Link to={`/${user?.data._id}`}>{user?.data.name}</Link>
                            // </Navbar.Text>
                            <NavDropdown title={`${user?.data.name}` }>
                                <NavDropdown.Item href={`/${user?.data._id}/profile`}>
                                    <FaUserCircle/> Profile
                                </NavDropdown.Item>
                                <NavDropdown.Divider></NavDropdown.Divider>
                                <NavDropdown.Item onClick={Logout} href={"/login"}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            ) : (<>
                        <Navbar.Text>
                            <Link to="/login">Login</Link>
                        </Navbar.Text>
                        <Navbar.Text>
                            <Link to="/signup">Sign Up</Link>
                        </Navbar.Text>
                            </>
                                 
                            )
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    )
}

export default NavbarHead
