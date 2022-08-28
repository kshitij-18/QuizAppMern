import axios from 'axios'
import { QUIZES_FETCHED, QUIZES_FETCH_ERROR } from './constants'

export const fetchAllQuizes = (course) => async dispatch => {
    try {
        const {data} = await axios.get("/api/quiz", {
            params:{
                course
            }
        })
        dispatch({
            type:QUIZES_FETCHED,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:QUIZES_FETCH_ERROR,
            payload:error.response.data
        })
    }
}