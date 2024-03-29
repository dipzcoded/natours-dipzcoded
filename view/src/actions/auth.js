import axios from 'axios';
import Cookies from 'js-cookie';
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_USER,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_FAILED,
    UPDATE_FAILED,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    SENT_TOKEN
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
        dispatch(loadUser());
        
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

    const config = {
        headers : {
            "Content-type" : "application/json"
        }
    };


    const body = JSON.stringify(formData);

    try {

        const res = await axios.post('/api/v1/auth/login', body,config);
        dispatch({type : LOGIN_SUCCESS, payload : res.data});
        dispatch(setAlert("Login Successful","success"))
        dispatch(loadUser());

    } catch (err) {

        const errors = err.response.data.errors;
        if(errors)
        {
            errors.forEach(el => {
                dispatch(setAlert(el.msg, 'error'));
            });
        }

          dispatch({
            type : LOGIN_FAIL
        })
        
    }

}

//logout 
 export const logOut = (history) => dispatch => {

    dispatch({type : LOGOUT})
    history.push('/login')

 }  

 export const updateUser = ({name, email, photo}) => async dispatch => {

    const config = {
        headers : {
            "Content-type" : "multipart/form-data"
        }
    }

  const form = new FormData();
  form.append('name', name);
  form.append('email', email);
  form.append("photo",photo);

    try {

        const res = await axios.patch("/api/v1/users/updateMe",form, config);
        dispatch({
            type : UPDATE_USER, payload : res.data
        })

        dispatch(setAlert("Data updated successfully!","success"))
  
    } catch (err) {

        const errors = err.response.data.errors;
        if(errors)
        {
            errors.forEach(er => dispatch(setAlert(er.msg,"error")))
        }

            dispatch({
                type : UPDATE_FAILED
            })
            dispatch(setAlert("Server Error....try again","error"))
    }

 }

 export const updatePassword = (formdata, history) => async dispatch => {

    const config = {
        headers : {
            "Content-type" : "application/json"
        }
    }

    const body = JSON.stringify(formdata);
    try {
        const res = await axios.patch('/api/v1/users/updateMyPassword', body,config);
        dispatch({
            type : UPDATE_PASSWORD, payload : res.data
        })
        dispatch(setAlert("password updated successfully","success"))
        dispatch(loadUser())
        history.push('/');
    } catch (err) {

        const errors = err.response.data.errors;
        if(errors)
        {
            errors.forEach((el) => dispatch(setAlert(el.msg,"error")))
        }

        dispatch({
            type : UPDATE_PASSWORD_FAILED
        })
        
    }

 }

 export const sentTokenReset = (data) => async dispatch => {


    const config = {
        headers : {
            "Content-type" : "application/json"
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await axios.post('/api/v1/users/forgotPassword',body,config);
        const {message} = res.data;
        dispatch({type : SENT_TOKEN})
        if(message)
        {
            dispatch(setAlert(message,"success"));
        }
        
    } catch (err) {

        const errors = err.response.data.errors;
        // console.log(errors)
        if(errors)
        {
            errors.forEach(el => dispatch(setAlert(el.msg,"error")))
        }
        
    }

 } 

 export const passwordReset = (token, formData) => async dispatch => {

    const config = {
        headers : {
            "Content-type" : "application/json"
        }
    }

    const body = JSON.stringify(formData);

    try {
        const res = await axios.patch(`/api/v1/users/resetPassword/${token}`,body,config);
        dispatch({type : RESET_PASSWORD_SUCCESS, payload : res.data})
        dispatch(setAlert("Login Successful","success"))
        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors)
        {
            errors.forEach(el => dispatch(setAlert(el.msg,"error")))
        }

        dispatch({type : RESET_PASSWORD_FAIL})
    }

 }

