import {
    GET_TOURS,
    GET_TOUR,
    CLEAR_TOUR,
    TOUR_ERROR,
    PAYMENT_PROCESSING,
    PAYMENT_PROCESSED,
    PAYMENT_ERROR
} from '../types'



// initial state
const initialState = {
    tours : [],
    tour : null,
    error : null,
    isLoading : true, 
    isProcessing : false
}


// reducers
export default function(state= initialState, action)
{
    const {type, payload} = action;
    switch(type)
    {
        case GET_TOURS : 
        return {
            ...state,
            tours : payload.data.doc,
            isLoading : false
        }

        case GET_TOUR : 
        return {
            ...state,
            tour: payload.data.doc,
            isLoading : false
        }

        case CLEAR_TOUR : 
        return {
            ...state,
            tour : null,
            isLoading : false
        }

        case TOUR_ERROR : 
        return {
            ...state,
            tours : [],
            tour : null,
            isLoading : false,
            error : payload
        }
        
        case PAYMENT_PROCESSING:
            return {
                ...state,
                isProcessing : true
            }

            case PAYMENT_PROCESSED : 
            case PAYMENT_ERROR :
            return {
                ...state,
                isProcessing : false,
                
            }

        default : 
        return state;
    }

}