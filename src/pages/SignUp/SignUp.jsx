import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import "./signUp.css"
function SignUp() {


    const [companyname, setCompanyName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [value, setValue] = useState()
    let history = useHistory();


    const signUp = async (e) => {
        e.preventDefault();
        let item = {
            companyname: companyname,
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        console.log(companyname, firstName, lastName, email);
        console.warn((item));

        let result = await fetch("https://asteric.herokuapp.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        })

        result = result.json();
        localStorage.setItem("user-info", JSON.stringify(result))
        history.push("/maindashboard")
    }



    const checkNumberLength = (number) => {

        if (number.toString().length > 10) {

            console.log("You have supplied more")
        } else {
            setValue()
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
                            onChange={(e) => setFirstName()}
                            value={firstName}
                        />

                        <TextField
                            style={{ marginLeft: '10px' }}
                            id="lastname"
                            label="Last Name"
                            variant="outlined"
                            className="firstfieldin"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />

                    </div>

                    <TextField
                        id="standard-error-helper-text"
                        label="Enter email address"
                        variant="outlined"
                    />
                    <PhoneInput
                        placeholder="Enter phone number"
                        value={value}
                       
                        defaultCountry="NG"
                        onChange={()=> checkNumberLength(setValue)} />

                    <TextField
                        id="standard-error-helper-text"
                        label="Username"

                        variant="outlined"
                    />


                    <div className="secondfield">
                        <TextField
                            id="standard-error-helper-text"
                            label="Enter password"
                            variant="outlined"
                            className="secondfieldin"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <TextField
                            style={{ marginLeft: '10px' }}
                            id="standard-error-helper-text"
                            label="Confirm password"
                            variant="outlined"
                            className="secondfieldin"
                        />

                    </div>


                    {console.log(value)}


                    <div> <button className="Regbtn" onClick={signUp}>Register</button></div>



                </form>

            </div>


        </div>
    )
}

export default SignUp
