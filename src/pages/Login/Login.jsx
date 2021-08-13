import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'
function Login() {
    return (
        <div className="LoginContainer">
            <div className="LoginContainerfirstbox">
                <Link to='/'>
                    <span>Asteric</span>
                </Link>

                <div className="LoginImg">
                    <img src="images/loginimg.png" alt="Login" />
                    <span>Login to your account</span>
                    <p>Manage your business in one page</p>
                </div>
            </div>
            <div className="LoginContainersecondbox">
                <div className="LoginContainersecondboxform">
                    <h2>Login</h2>
                    <form className="formHouse">

                        <input className="forminput" type="text" name="username" placeholder="Username" />
                        <input className="forminput" type="text" name="password" placeholder="Password" />
                        <span>Forgot password</span>
                        <input className="submitbut" type="submit" name="submit" />

                    </form>

                </div>
            </div>
        </div>

    )
}

export default Login
