import {
    GET_TOURS,
    GET_TOUR,
    CLEAR_TOUR,
    TOUR_ERROR
} from '../types'



// initial state
const initialState = {
    tours : [],
    tour : null,
    isLoading : true,
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

        case TOUR_ERROR : 
        return {
            ...state,
            tours : [],
            tour : null,
            isLoading : false
        }

        default : 
        return state;
    }

}