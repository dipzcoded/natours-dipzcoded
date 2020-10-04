import axios from 'axios';
import Cookies from 'js-cookie';
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR
} from '../types';
import {setAlert} from './alert';
import sethAuthToken from '../utlis/setAuthToken';


// Load Login User
export const loadUser = () => async dispatch => {
    const token = Cookies.get("jwt");
    if(token)
    {
        sethAuthToken(token);
    }

    try {
        const res = await axios.get("/api/v1/auth/user");
        dispatch({
            type : USER_LOADED, payload : res.data
        })
    } catch (error) {
            dispatch({
                type : AUTH_ERROR
            })
    }

}



// Register Action
export const register = (formData) => async dispatch => {
     const config = {
        headers : {
            'Content-type' : 'application/json'
        }
    }

    const body = JSON.stringify(formData);

    try {
        const res = await axios.post('/api/v1/auth/signup',body,config);
        dispatch({
            type :REGISTER_SUCCESS, payload : res.data
        })

        dispatch(setAlert('Registration Success','success'));
        
    } catch (err) {

        const errors = err.response.data.errors;
        if(errors)
        {
            errors.forEach(el => {
                dispatch(setAlert(el.msg, 'error'));
            });
        }

          dispatch({
            type : REGISTER_FAIL
        })
    }

}

// Login Action
export const login = (formData) => async dispatch => {

}

