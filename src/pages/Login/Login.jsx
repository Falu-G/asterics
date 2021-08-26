import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './login.css'
import { BeatLoader } from 'react-spinners';
import { css } from "@emotion/react";
function Login() {
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [showIcon, setShowIcon] = useState(false)

    const [errorMessage, setErrorMessage] = useState("")

    const [loginError, setLoginError] = useState(false)


    const override = css`
  display: block;
  margin: 0 auto;
`;
    const login = async (e) => {

        setShowIcon(true)
        e.preventDefault();
        console.warn(email, password)
        let item = { email: email, password: password }
        let result = await fetch("https://asteric.herokuapp.com/users/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        })

        result = await result.json();


        if (result.status === "success") {
            console.log(result)
            setShowIcon(false)
            localStorage.setItem("user-info", result)
            history.push("/maindashboard")
        } else {
            setErrorMessage(result.message)
            setLoginError(true)
            setShowIcon(false)
        }




    }
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
            <div style={{ backgroundImage: `url(/images/graybg.png)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} className="LoginContainersecondbox">
                <div className="LoginContainersecondboxform">
                    <h2>Login</h2>

                    <form className="formHouse">

                        <input className="forminput"
                            onChange={(e) => setEmail(e.target.value)}
                            type="text" name="username" placeholder="Username" />
                        <input className="forminput" type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            name="password" placeholder="Password" />
                        <span>Forgot password</span>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,

                        }}>
                            <button className="submitbut" onClick={login}>Login</button>
                            <BeatLoader loading={showIcon}
                                color={"#18A0FB"}
                                css={override} />
                        </div>


                    </form>


                    {loginError ? <>

                        <div className="errorLogin"><h3>{errorMessage} </h3> </div>

                    </> : null}


                </div>
            </div>
        </div>

    )
}

export default Login
