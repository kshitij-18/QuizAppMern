import axios from 'axios'
import { useDispatch } from 'react-redux'
import setAuthToken from '../utils/setAuthToken'
import { AUTH_ERROR, LOGIN_SUCCESS, LOGOUT_USER, REGISTER_SUCCESS, USER_LOADED, LOGIN_FAIL } from './constants'
import {setErrors, removeErrors} from './errors'


export const loadUser = () => async dispatch => {
    const tokenFromStorage = localStorage.getItem('token')
    if (tokenFromStorage) {
        setAuthToken(tokenFromStorage)
    }

    try {
        const { data } = await axios.get("/api/users/auth")
        dispatch({
            type: USER_LOADED,
            payload: data
        })
    } catch (error) {
        dispatch(setErrors(error.response?.data.msg))
    }
}

export const login = ({ username, password }) => async dispatch => {
    const dataFromForm = JSON.stringify({ username, password })
    // console.log(dataFromForm)

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const { data } = await axios.post('http://localhost:5000/api/users/login', dataFromForm, config)
        console.log(`This is the data after login ${data}`)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
        console.log("This area is after 1st dispatch")
        dispatch(loadUser())
    } catch (error) {
        console.log(error.response?.data.msg)
        dispatch(setErrors(error.response?.data.msg))
        dispatch({
            type:LOGIN_FAIL
        })
    }
}

export const signup = (values) => async dispatch => {
    const dataFromForm = new FormData()
    console.log(Object.entries(values))
    for(const [key, value] of Object.entries(values)){
        dataFromForm.append(key, value)
    }
    
    console.log(dataFromForm)

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
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
        console.log(error)
        dispatch(setErrors(error.response?.data.msg))
        dispatch({
            type: AUTH_ERROR
        })
        
    }

    

}

export const logout = () => async dispatch => {
    localStorage.removeItem('token')
    dispatch({
        type:LOGOUT_USER
    })
}