import {
        REGISTER_SUCCESS,
        REGISTER_FAIL,
        USER_LOADED,
        AUTH_ERROR,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOGOUT
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
        case LOGIN_SUCCESS :
        Cookies.set('jwt', payload.token,{expires : 90 });
        if(process.env.NODE_ENV === "production")
        {
            Cookies.secure = true;
        }
        return{
            ...state,
            ...payload,
            isAuthenticated : true,
            isLoading : false
        }

        case REGISTER_FAIL : 
        case LOGIN_FAIL :
        case AUTH_ERROR :
         case LOGOUT :
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