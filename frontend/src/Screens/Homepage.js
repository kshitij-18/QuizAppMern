import React from 'react'
import {Card, Container , Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { Carousel } from 'react-bootstrap'
import './Homepage.css'


const notLoggedin = (
        
        <div className="pricing--container">
            <Card className="price--cards text-center" border="dark">
                <Card.Body>
                    <Card.Title className="text-center">NOVICE</Card.Title>
                    <Card.Text>
                    <span>&#10003;</span> All Quizzes 
                    </Card.Text>
                    <Card.Text>
                    <span>&#10005;</span> Video solutions to questions
                    </Card.Text>
                    <Card.Text>
                    <span>&#10005;</span> 24/7 Live Doubt Support
                    </Card.Text>
                    <Button variant="primary">
                        Signup for Free
                    </Button>
                </Card.Body>

            </Card>
            <Card className="price--cards text-center" border="dark" >
                <Card.Body>
                    <Card.Title className="text-center">SELECT</Card.Title>
                    <Card.Text>
                    <span>&#10003;</span> All Quizzes 
                    </Card.Text>
                    <Card.Text>
                    <span>&#10003;</span> Video solutions to questions
                    </Card.Text>
                    <Card.Text>
                    <span>&#10005;</span> 24/7 Live Doubt Support
                    </Card.Text>
                    <Button variant="primary">
                        Signup for <span>&#8377;</span>100
                    </Button>
                </Card.Body>
            </Card>
            <Card className="price--cards text-center" border="dark">
                <Card.Body>
                    <Card.Title className="text-center">SELECT PLUS</Card.Title>
                    <Card.Text>
                    <span>&#10003;</span> All Quizzes 
                    </Card.Text>
                    <Card.Text>
                    <span>&#10003;</span> Video solutions to questions
                    </Card.Text>
                    <Card.Text>
                    <span>&#10003;</span> 24/7 Live Doubt Support
                    </Card.Text>
                    <Button variant="primary">
                    Signup for <span>&#8377;</span>200
                    </Button>
                </Card.Body>
            </Card>
        </div>
)

const loggedIn = (
    <div className="quiz--holder">
        <h1>Logged In</h1>
        <h1>Logged In</h1>
        <h1>Logged In</h1>
    </div>
    
)

const Homepage = () => {
    const authState = useSelector(state => state.auth)
    const {isAuth, user} = authState
    return (<div className="homepage">
    
    {
        isAuth ? (
            <Container>
                {loggedIn}
            </Container>
        ) : notLoggedin 
    }
    
    </div>
        
       
    )
}

export default Homepage
