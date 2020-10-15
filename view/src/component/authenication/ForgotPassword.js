import React, {useState} from 'react'
import {connect} from 'react-redux';
import {sentTokenReset} from '../../actions/auth'

const FogotPassword = ({sentTokenReset, isAuthenticated, history}) => {

    const [email, setEmail] = useState("");

    const onChange = (e) => {
        setEmail(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        sentTokenReset({email});
        setEmail("");
    }

    if(isAuthenticated)
    {
        history.push('/')
    }

    return (
        <main className="main">
            <div className="login-form">
                <h2 className="heading-secondary ma-bt-lg">Provide your email</h2>
                <form className="form" onSubmit={onSubmit}>
                <div className="form__group">
                <label className="form__label" htmlFor="email">Email Address</label>
                <input id="email" className="form__input" name="email" type="email" placeholder="you@example.com" value={email} required onChange={onChange} />
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

export default connect(mapStateToProps, {sentTokenReset})(FogotPassword)
