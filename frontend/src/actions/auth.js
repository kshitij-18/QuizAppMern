import axios from 'axios'
import { useDispatch } from 'react-redux'
import setAuthToken from '../utils/setAuthToken'
import { AUTH_ERROR, LOGIN_SUCCESS, LOGOUT_USER, REGISTER_SUCCESS, USER_LOADED } from './constants'


export const loadUser = () => async dispatch => {
    const tokenFromStorage = localStorage.getItem('token')
    console.log(tokenFromStorage)
    if (tokenFromStorage) {
        setAuthToken(tokenFromStorage)
    }

    try {
        const { data } = await axios.get("/api/users/auth")
        console.log(data, "This is data")
        dispatch({
            type: USER_LOADED,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const login = ({ username, password }) => async dispatch => {
    const dataFromForm = JSON.stringify({ username, password })
    console.log(dataFromForm)

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const { data } = await axios.post('http://localhost:5000/api/users/login', dataFromForm, config)
        console.log(data)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
        console.log("This area is after 1st dispatch")
        dispatch(loadUser())
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
        console.log(error.message)
    }
}

export const signup = ({name, username, email, password}) => async dispatch => {
    const dataFromForm = JSON.stringify({ username, password, name, email })
    console.log(dataFromForm)

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const {data} = await axios.post("/api/users", dataFromForm, config)
        console.log(data)
        dispatch({
            type:REGISTER_SUCCESS, 
            payload:data
        })
        console.log("This is after 1st dispatch")
        dispatch(loadUser())
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
        console.log(error.message)
    }

    

}

export const logout = () => async dispatch => {
    localStorage.removeItem('token')
    dispatch({
        type:LOGOUT_USER
    })
}