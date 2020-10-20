import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js'
import {
    GET_TOURS,
    GET_TOUR,
    CLEAR_TOUR,
    TOUR_ERROR,
    PAYMENT_PROCESSING,
    PAYMENT_PROCESSED,
    PAYMENT_ERROR
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
        if(errors)
        {
            console.log(errors);
        }
    
        dispatch({
            type : TOUR_ERROR,
            payload : errors
        })

        setTimeout(() => {
                dispatch({type : TOUR_ERROR})
        },5000)
    }

}

export const bookingTour = (touriD) => async dispatch => {

    const stripe = await loadStripe("pk_test_51Hd1jPAKHYcNRi3ri1OpwDYvsfCDDsdUe2wgTqWEDI3WszS5Cjm5jWow9rwnNrxpng0Lg49jLr4EDtfVaOqQGdSo001WwgdkXM");

    try {
        dispatch({type : PAYMENT_PROCESSING});
        const session = await axios.get(`/api/v1/booking/checkout-session/${touriD}`);
      
        const waiting = await stripe.redirectToCheckout({
            sessionId : session.data.session.id
        })

        console.log(waiting);
        dispatch({type : PAYMENT_PROCESSED});
        
    } catch (error) {
            dispatch({type : PAYMENT_ERROR})
    }

}

