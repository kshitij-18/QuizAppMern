import {SET_ERROR, REMOVE_ERROR} from '../actions/constants'
const initialState = {
    errors:[]
}

export default function (state=initialState, action) {
    const {type, payload} = action
    switch(type){
        case SET_ERROR:
            return {errors:[...state.errors, payload]}
        case REMOVE_ERROR:
            return {errors:state.errors.filter(error => error.id!==payload)}
        default:
            return state
    }
}