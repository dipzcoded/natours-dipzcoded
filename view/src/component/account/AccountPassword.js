import React,{useState} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {updatePassword} from '../../actions/auth'
import {setAlert} from '../../actions/alert'

const AccountPassword = ({updatePassword, history, setAlert}) => {

    const [formData, setFormData] = useState({
        passwordCurrent : "",
        newPassword : "",
        confirmPassword : ""
    })

    const {passwordCurrent, newPassword, confirmPassword} = formData;

    const onChange = e =>
    {
        setFormData({...formData,[e.target.name] : e.target.value});
    } 

    const onSubmit = (e) => {
        e.preventDefault();
        if(newPassword !== confirmPassword)
        {
             setAlert("password must match!..please try again","error");
        }
        else
        {
            updatePassword(formData,history)
        setFormData({
            passwordCurrent : "",
            newPassword : "",
            confirmPassword : ""
        })
        }
        
    }

    return (
        <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <form className="form form__user-settings" onSubmit={onSubmit}>
        <div className="form__group">
        <label className="form__label" htmlFor="passwordCurrent">Current Password</label>
        <input className="form__input" name="passwordCurrent" placeholder="••••••••" type="password" value={passwordCurrent} onChange={onChange} required minLength="8" />
        </div>

        <div className="form__group">
        <label className="form__label" htmlFor="newPassword">New Password</label>
        <input className="form__input" name="newPassword" placeholder="••••••••" type="password" value={newPassword} onChange={onChange} required minLength="8" />
        </div>

        <div className="form__group ma-bt-lg">
        <label className="form__label" htmlFor="confirmPassword">Current Password</label>
        <input className="form__input" name="confirmPassword" placeholder="••••••••" type="password" value={confirmPassword} onChange={onChange} required minLength="8" />
        </div>

        <div className="form__group right">
        <button className="btn btn--small btn--green">Save password</button>
        </div>  

            </form>
        </div>
    )
}

export default connect(null, {updatePassword, setAlert})(withRouter(AccountPassword))
