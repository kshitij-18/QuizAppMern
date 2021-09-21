import axios from 'axios'
import { useDispatch } from 'react-redux'
import setAuthToken from '../utils/setAuthToken'
import { AUTH_ERROR, LOGIN_SUCCESS, USER_LOADED } from './constants'


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
        dispatch(loadUser)
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
        console.log(error.message)
    }
}