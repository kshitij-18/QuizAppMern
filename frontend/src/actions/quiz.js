import axios from "axios";
import { QUIZ_CREATED, QUIZ_CREATE_ERROR, INITIAL_STATE_QUIZ } from "./constants";

export const createQuiz = (data) => async dispatch => {
    // delete data.name;
    const dataFromForm = JSON.stringify(data);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
        const {data} = await axios.post("/api/quiz", dataFromForm, config);
        dispatch({
            type:QUIZ_CREATED,
            payload:data
        })
        dispatch({
            type:INITIAL_STATE_QUIZ
        })
    } catch (error) {
        console.log(error.response?.data.msg);
        dispatch({
            type:QUIZ_CREATE_ERROR,
            payload:error.response?.data.msg
        })
    }
}