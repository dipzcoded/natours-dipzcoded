import axios from 'axios';
import {
    GET_BOOKINGS,
    BOOKING_ERROR
} from '../types'
import {setAlert} from '../actions/alert'


export const createBookings = (formdata, history) => async dispatch => {
    const config = {
        headers : {
            "Content-type" : "application/json"
        }
    }
    const body = JSON.stringify(formdata);


    try {
        const res = await axios.post('/api/v1/booking/createBookingByUser',body,config);
        dispatch(setAlert(res.data.msg, 'success'));
        history.push('/')
    } catch (error) {
        console.log(error);
    }
    
}

export const getBookingsByUser = () => async dispatch => {
    try {

        const res = await axios.get('/api/v1/booking/getBookingByUser');
        dispatch({type : GET_BOOKINGS,payload : res.data})
        
    } catch (error) {
    
            dispatch({type : BOOKING_ERROR})    
    }
}