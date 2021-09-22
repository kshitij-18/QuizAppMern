import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import useForm from '../hooks/useForm'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../actions/auth'

const SignUp = () => {
    const [values, onChange, onSubmit] = useForm()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        dispatch(signup(values))
    }

    const authState = useSelector(state => state.auth)

    if(authState.isAuth){
        return <Redirect to="/" />
    }

    return (
        <div>
            <h1 style={{ marginTop: "2rem" }}>Sign In</h1>

            <Form style={{ marginTop: "2rem" }}>
                <Row>

                    <Col>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={values.name} onChange={onChange} />
                            
                        </Form.Group>

                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={values.email} onChange={onChange} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>

                    <Col>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" value={values.username} onChange={onChange} />
                        </Form.Group>

                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={values.password} onChange={onChange} />
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

export default SignUp
