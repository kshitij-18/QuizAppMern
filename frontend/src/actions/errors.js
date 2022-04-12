import {SET_ERROR, REMOVE_ERROR} from './constants'
import {v4} from 'uuid';

export const setErrors = (message, severity="error") => dispatch => {
    const id = v4()
    dispatch({
        type:SET_ERROR,
        payload:{
            id,
            error:message,
            severity
        }
    })

    setTimeout(() => dispatch(removeErrors(id)), 5000)
}

export const removeErrors = (id) => dispatch => {
    
    dispatch(
         {
            type:REMOVE_ERROR,
            payload:id
        }
    )
}