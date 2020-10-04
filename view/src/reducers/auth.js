import {
        REGISTER_SUCCESS,
        REGISTER_FAIL,
        USER_LOADED,
        AUTH_ERROR
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

        case USER_LOADED : 
        return {
            ...state,
            isAuthenticated : true,
            isLoading : false,
            user : payload.user
        }

        case REGISTER_SUCCESS : 
        Cookies.set('jwt', payload.token,{expires : 90 })
        return{
            ...state,
            ...payload,
            isAuthenticated : true,
            isLoading : false
        }

        case REGISTER_FAIL : 
        case AUTH_ERROR :
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