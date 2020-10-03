import {
        REGISTER_SUCCESS,
        REGISTER_FAIL
} from '../types'
import Cookies from 'js-cookie';

const initialState = {
    token : Cookies.get("jwt"),
    isAuthenticated : null,
    isLoading : true,
    user : null,

}

export default function(state = initialState, action)
{

    const {type, payload} = action

    switch(type)
    {

        case REGISTER_SUCCESS : 
        return{
            ...state,
            ...payload,
            isAuthenticated : true,
            isLoading : false
        }

        case REGISTER_FAIL : 
        Cookies.remove('jwt');
        return {
            ...state,
            token : null,
            isAuthenticated : false, 
            isLoading : false
        }

        default : return state

    }

}