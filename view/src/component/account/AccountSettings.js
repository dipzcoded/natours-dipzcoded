import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import userIcon from '../../img/user.png';
import AccountPassword from './AccountPassword';

const AccountSettings = ({auth : {user}}) => {

    const [formData,setFormData] = useState({
        name : "",
        email : ""
    });
    

    useEffect(() => {

        if(user)
        {
            const {name, email} = user;
            setFormData({
                name : name,
                email : email
            })
        }

    },[user])

    const onChange = (e) => {
        setFormData({...formData,[e.target.name] : e.target.value})
    }
    const {name, email} = formData

    return (
        <div className="user-view__content">
            <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your Account Settings</h2>
        <form className="form form-user-data">
            <div className="form__group">
            <label className="form__label" htmlFor="name">Name</label>
            <input className="form__input" name="name" value={name} required type="text" onChange={onChange} />
            </div>

            <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="email">Name</label>
            <input className="form__input" name="email" value={email} required type="email" onChange={onChange} />
            </div>

            <div className="form__group form__photo-upload">
            {user && user.photo ? (<img className="form__user-photo" src={`/img/users/${user.photo}`} alt={`${user.name} photos`} />) : (<img className="form__user-photo" src={userIcon} alt="default user icon"/>)}
            <a className="btn-text" href="!#">Choose new photo</a>
            </div>

            <div className="form__group right">
                <button className="btn btn--small btn--green">Save settings</button>
            </div>

        </form>
            </div>
            <div className="line">&nbsp;</div>
            <AccountPassword />     
        </div>
    )
}

const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps,null)(AccountSettings);
