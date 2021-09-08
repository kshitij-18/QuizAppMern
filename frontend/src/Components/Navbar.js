import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Navbar.css'
const NavbarHead = () => {
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
                        <Navbar.Text>
                            <Link to="/login">Login</Link>
                        </Navbar.Text>
                        <Navbar.Text>
                            <Link to="/">Sign Up</Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    )
}

export default NavbarHead
