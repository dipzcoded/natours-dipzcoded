import React, {useState} from 'react'
import {register} from '../../actions/auth';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import { Redirect } from 'react-router-dom';

const Register = ({register, setAlert, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        name : "",
        email: "",
        password : "",
        confirmPassword : ""
    })

    const {name, email, password, confirmPassword} = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword)
        {
                setAlert('password didnt match...try again','error');
        }
        else if(password.length < 8)
        {
            setAlert('password must be 8 characters long','error');
        }
        else
        {
            register(formData);
           
        }
      
    }

    if(isAuthenticated)
    {
        return <Redirect to="/" />
    }

    return (
        <main className="main">
            <div className="login-form">
                <h2 className="heading-secondary ma-bt-lg">Create your account!</h2>
                <form className="form form--signup" onSubmit={onSubmit}>

                <div className="form__group">
                    <label className="form__label" htmlFor="name">Your Name</label>
                 <input id="name" className="form__input" name="name" value={name} type="text" placeholder="please fill in your name"  required onChange={onChange}  />
                 </div>
   
                <div className="form__group">
                <label className="form__label" htmlFor="email">Email Address</label>
                <input id="email" className="form__input" name="email" value={email} type="email" placeholder="you@example.com" required onChange={onChange}  />
                </div>

                <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="password">Password</label>
                <input id="password" name="password" className="form__input" value={password} type="password" placeholder="..........."  minLength="8"  onChange={onChange}  />
                </div>

                <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" className="form__input" value={confirmPassword} type="password" placeholder="..........." minLength="8"   onChange={onChange}  />
                </div>

                <div className="form__group">
                <button className="btn btn--green">Sign Up</button>
                </div>
                </form>
                </div>  
        </main>
    )
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, {register, setAlert})(Register)
