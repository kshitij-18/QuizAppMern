import { useDispatch } from 'react-redux'
import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    USER_LOADED
} from '../actions/constants'

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    loading: true,
    isAuth: null
}


export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                loading: false,
                isAuth: true
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            console.log(payload)
            return {
                ...state,
                ...payload,
                loading: false,
                isAuth: true, 
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
            return {
                ...state,
                user: null,
                loading: false,
                isAuth: false
            }
        default:
            return state
    }
}