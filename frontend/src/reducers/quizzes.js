import { QUIZES_FETCHED, QUIZES_FETCH_ERROR } from "../actions/constants"

const initialState = {
    quizzes:null,
    loading:true,
    error:false,
    errorMsg:""
}

export default function (state=initialState, action){
    const {type, payload} = action
    state=initialState
    switch(type){
        case QUIZES_FETCHED:
            return {
                ...state,
                quizzes:payload,
                loading:false
            }
        case QUIZES_FETCH_ERROR:
            return {
                ...state,
                error:true,
                errorMsg:payload,
                loading:false
            }
        default:
            return state
    }
}