import {SET_ALERT, CLEAR_ALERT} from '../types' 
import { v4 as uuidv4 } from 'uuid'


export const setAlert = (msg, alertType, duration=5000) =>  dispatch => {

    const id = uuidv4();
    dispatch({
        type : SET_ALERT, payload:{msg, alertType, id}
    })

    setTimeout(() => {

        dispatch({
            type : CLEAR_ALERT, payload:id
        })

    },duration)

}