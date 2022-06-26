import { combineReducers } from "redux";
import auth from './auth'
import error from './error'
import quizzes from './quizzes'
import quiz from "./quiz";

export default combineReducers({
    auth,
    error,
    quizzes,
    quiz
})