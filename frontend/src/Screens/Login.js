import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { login } from '../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(username, password)
        dispatch(login({ username, password }))
    }

    const authState = useSelector(state => state.auth)
    const { isAuth } = authState

    if (isAuth) {
        console.log("Hey I am here")
        return < Redirect to="/" />
    }

    return (
        <div>
            <h1 style={{ marginTop: "2rem" }}>Sign In</h1>

            <Form style={{ marginTop: "2rem" }}>
                <Row>

                    <Col>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
                        </Form.Group>

                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="dark" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default Login
