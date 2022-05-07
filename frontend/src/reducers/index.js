import { combineReducers } from "redux";
import auth from './auth'
import error from './error'
import quizzes from './quizzes'

export default combineReducers({
    auth,
    error,
    quizzes
})