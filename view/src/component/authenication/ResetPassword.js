import React, {useState} from 'react'
import {connect} from 'react-redux';
import {passwordReset} from '../../actions/auth';
import {setAlert} from '../../actions/alert';
const ResetPassword = ({match, passwordReset, history, isAuthenticated, setAlert}) => {

    const [formData,setFormData] = useState({
        password : "",
        confirmPassword : ""
    })


    const onChange = (e) => {
        setFormData({...formData,[e.target.name] : e.target.value})
    }

    const {password, confirmPassword} = formData;

    const onSubmit = e => {
        e.preventDefault();
        if(password !== confirmPassword)
        {
            setAlert("password must match...please try again","error")
        }
        passwordReset(match.params.token,formData);
    }

    if(isAuthenticated)
    {
        history.push('/')
    }

    return (
        <main className="main">
        <div className="login-form">
            <h2 className="heading-secondary ma-bt-lg">Reset your password</h2>
            <form className="form" onSubmit={onSubmit}>

            <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">Password</label>
            <input id="password" name="password" className="form__input" type="password" placeholder="..........." value={password} minLength="8" required onChange={onChange} />
            </div>           

            <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">Confirm Password</label>
            <input id="password" name="confirmPassword" className="form__input" type="password" placeholder="..........." value={confirmPassword} minLength="8" required onChange={onChange} />
            </div>

            <div className="form__group">
            <button className="btn btn--green">send</button>
            </div>

            </form>
        </div>
    </main>
    )
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{passwordReset, setAlert})(ResetPassword)
