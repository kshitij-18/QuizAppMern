import { QUIZ_CREATED, QUIZ_CREATE_ERROR, INITIAL_STATE_QUIZ } from "../actions/constants";

const initialState = {
    quiz:{},
    loading:true,
    error:false,
    errorMsg:''
};

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case QUIZ_CREATED:
            return {
                ...state,
                quiz:payload,
                loading:false
            }
        case QUIZ_CREATE_ERROR:
            return {
                ...state,
                loading:false,
                error:true,
                errorMsg:payload
            }
        case INITIAL_STATE_QUIZ:
            return state;
        default:
            return state;

    }
}