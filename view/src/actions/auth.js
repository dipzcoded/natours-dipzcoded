import axios from 'axios';
import Cookies from 'js-cookie';
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from '../types';
import {setAlert} from './alert';


// Load Login User



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

