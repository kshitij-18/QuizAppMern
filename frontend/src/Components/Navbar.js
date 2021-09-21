import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Navbar.css'
import {useDispatch, useSelector} from 'react-redux'
const NavbarHead = () => {
    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)
    console.log(authState)

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
                            <Navbar.Text>
                                <Link to={`/${user?.data._id}`}>{user?.data.name}</Link>
                            </Navbar.Text>
                            ) : (<>
<Navbar.Text>
                            <Link to="/login">Login</Link>
                        </Navbar.Text>
                        <Navbar.Text>
                            <Link to="/">Sign Up</Link>
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
