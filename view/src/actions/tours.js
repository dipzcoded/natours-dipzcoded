import axios from 'axios';
import {
    GET_TOURS,
    GET_TOUR,
    CLEAR_TOUR,
    TOUR_ERROR
} from '../types'

// get all tours
export const getAllTours = () => async dispatch => {
    try {
        const res  = await axios.get('/api/v1/tours').data;
        dispatch({type : GET_TOURS, payload:res.data})
    } catch (error) {
        const errors = errors.response.data.errors;
        dispatch({
            type : TOUR_ERROR
        })
    }

}