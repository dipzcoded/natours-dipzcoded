import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import userIcon from '../../img/user.png';
import AccountPassword from './AccountPassword';
import {updateUser} from '../../actions/auth';
import {setAlert} from '../../actions/alert'


const AccountSettings = ({auth : {user}, updateUser, setAlert}) => {

    const [formDatas,setFormData] = useState({
        name : "",
        email : "",
    });

    const [photo,setPhoto] = useState("");
    

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

   

    const {name, email} = formDatas;
    const onChange = (e) => {
        setFormData({...formDatas,[e.target.name] : e.target.value})
    }

    const onPhotoChange = (e) => {
        setPhoto(e.target.files[0]);
        // console.log(e.target.files[0]);
    }

    const onSubmit = (e) => {
        e.preventDefault(); 
        if(!name && !email)
        {
                setAlert("name and email cant be empty","error");
        }
        else
        { 
        updateUser({name,email, photo});
        }
  
    }

   
   

    return (
        <div className="user-view__content">
            <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your Account Settings</h2>
        <form className="form form-user-data" onSubmit={onSubmit}>
            <div className="form__group">
            <label className="form__label" htmlFor="name">Name</label>
            <input className="form__input" name="name" value={name}  type="text" onChange={onChange} />
            </div>

            <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="email">Name</label>
            <input className="form__input" name="email" value={email}  type="email" onChange={onChange} />
            </div>

            <div className="form__group form__photo-upload">
            {user && (user.photo ? (<img className="form__user-photo" src={`/img/users/${user.photo}`} alt={`${user.name} photos`} />) : (<img className="form__user-photo invert" src={userIcon} alt="default user icon"/>))}
            <input type="file"   accept="image/*" name="photo"   onChange={onPhotoChange} />
            <label htmlFor="photo">Choose new photo</label>
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

export default connect(mapStateToProps,{updateUser, setAlert})(AccountSettings);
