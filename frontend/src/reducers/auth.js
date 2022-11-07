/* eslint-disable import/no-anonymous-default-export */
import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    REGISTER_FAIL,
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
            console.log(payload, "this is payload reducer")
            return {
                ...state,
                ...payload,
                loading: true,
                isAuth: true, 
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                loading: false,
                isAuth: false,
                token:localStorage.getItem('token')
            }
        default:
            return state
    }
}