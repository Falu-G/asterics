import React, { useState } from 'react'
//import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { BeatLoader } from 'react-spinners';
//import { css } from "@emotion/react";

import "./signUp.css"
function SignUp() {


    const [email, setEmail] = useState("");
    const [phone, setValue] = useState()
    const [lastname, setLastName] = useState("");
    const [showIcon, setShowIcon] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [showSucces, setShowSucces] = useState(false);
    const [showReport, setShowReport] = useState("");
    const [companyname, setCompanyName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    //let history = useHistory();
    const signUp = async (e) => {
        e.preventDefault();
        let item = {
            companyname,
            firstname,
            username,
            lastname,
            email,
            password,
            confirmPassword,
            phone
        }


        setShowIcon(true)
        let result = await fetch("https://asteric.herokuapp.com/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        })

        console.log(result)
       


        if (result.status === 200) {
            result = result.json();
            console.warn(result.status);
            setShowIcon(false)
            localStorage.setItem("user-info", JSON.stringify(result))

            setShowSucces(result.status)
            setShowReport(result.message)
            //history.push("/maindashboard")
        } else {
            console.warn(result.statusText);
            setShowIcon(false)
            setShowSucces(true)
            setShowReport(result.statusText)
        }

    }



    return (
        <div className="formContainer" style={{
            backgroundImage: `url(/images/signupbg.png)`
            , backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
            backgroundPosition: 'center left'
        }}>
            <div className="firstSignUpContainer">
                <div className="firstSignUp">
                    <span>SignUp</span>
                    <h4>Create your new account</h4>
                    <p>and manage your business with a single Single sign</p>
                </div>


            </div>
            <div className="secondSignUp">
                <form Validate className="signUpForm">

                    <h3>Create an account</h3>
                    <TextField
                        id="companyName"
                        label="Company name"
                        variant="outlined"
                        onChange={(e) => setCompanyName(e.target.value)}
                        value={companyname}

                    />


                    <hr size={3} />


                    <div className="firstfield">
                        <TextField
                            id="firstname"
                            label="First Name"
                            variant="outlined"
                            className="firstfieldin"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstname}
                        />

                        <TextField
                            style={{ marginLeft: '10px' }}
                            id="lastname"
                            label="Last Name"
                            variant="outlined"
                            className="firstfieldin"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastname}
                        />

                    </div>

                    <TextField

                        label="Enter email address"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <PhoneInput
                        placeholder="Enter phone number"
                        value={phone}
                        defaultCountry="NG"
                        onChange={setValue} />

                    <TextField
                        id="standard-error-helper-text"
                        label="Username"
                        variant="outlined"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />


                    <div className="secondfield">
                        <TextField
                            id="standard-error-helper-text"
                            label="Enter password"
                            variant="outlined"
                            className="secondfieldin"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />

                        <TextField
                            style={{ marginLeft: '10px' }}
                            id="standard-error-helper-text"
                            label="Confirm password"
                            variant="outlined"
                            className="secondfieldin"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />

                    </div>
                    <div
                        style={{
                            display: `flex`,
                            justifyContent: `center`,
                            marginTop: 20,
                            alignItems: `center`
                        }}> <button className="Regbtn" onClick={signUp}>Register</button>

                        <BeatLoader loading={showIcon} />

                    </div>
                    {showSucces ?  <h3>{showReport}</h3>
                        : null}
                    

                </form>

            </div>


        </div>
    )
}

export default SignUp
