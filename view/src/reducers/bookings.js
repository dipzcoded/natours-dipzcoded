import {
    GET_BOOKINGS,
    BOOKING_ERROR
} from '../types'



// initial state
const initialState = {
    bookings : [],
    isLoading : true, 
}


// reducers
export default function(state= initialState, action)
{
    const {type, payload} = action;
    switch(type)
    {

        case GET_BOOKINGS :
            return {
                ...state,
                bookings : payload.doc,
                isLoading : false
            }

        case BOOKING_ERROR: 
        return {
            ...state,
            bookings : [],
            isLoading : false
        }


        default : 
        return state;
    }

}