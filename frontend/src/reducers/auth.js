import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS
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
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                user: payload,
                loading: false,
                isAuth: true
            }
        default:
            return state
    }
}