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
        const res  = await axios.get('/api/v1/tours');
        dispatch({type : GET_TOURS, payload:res.data})
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors)
        dispatch({
            type : TOUR_ERROR
        })
    }

}


export const getTour = (id) => async dispatch => {
    dispatch({
        type : CLEAR_TOUR
    })
    try {

        const res = await axios.get(`/api/v1/tours/${id}`);
      dispatch({type : GET_TOUR, payload:res.data})
        
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);
    
        dispatch({
            type : TOUR_ERROR,
            payload : "Sorry Tour not found..."
        })
    }

}

