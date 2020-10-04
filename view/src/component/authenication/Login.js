import React, {useState} from 'react'

const Login = () => {


    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })

    const {email, password} = formData;
    const onChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData)
    }


    return (
        <main className="main">
            <div className="login-form">
                <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
                <form className="form" onSubmit={onSubmit}>
                <div className="form__group">
                <label className="form__label" htmlFor="email">Email Address</label>
                <input id="email" className="form__input" name="email" type="email" placeholder="you@example.com" value={email} required onChange={onChange} />
                </div>

                <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="password">Password</label>
                <input id="password" name="password" className="form__input" type="password" placeholder="..........." value={password} minLength="8" required onChange={onChange} />
                </div>

                <div className="form__group">
                <button className="btn btn--green">Login</button>
                </div>

                </form>
            </div>
        </main>
    )
}

export default Login