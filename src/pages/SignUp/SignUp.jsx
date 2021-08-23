import React, { useState } from 'react'

import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import "./signUp.css"
function SignUp() {


    const [companyname, setCompanyName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
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

        let result = await fetch("", {
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

    return (
        <div className="formContainer">
            <form Validate className="signUpForm">

                <h3>SignUp</h3>
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



                <div className="secondfield">
                    <TextField
                        id="standard-error-helper-text"
                        label="Email"
                        variant="outlined"
                        className="secondfieldin"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <TextField
                        style={{ marginLeft: '10px' }}
                        id="standard-error-helper-text"
                        label="Username"
                        variant="outlined"
                        className="secondfieldin"
                    />

                </div>
                <TextField
                    id="standard-error-helper-text"
                    label="Username"
                    variant="outlined"
                />


                <TextField
                    id="standard-error-helper-text"
                    label="Username"
                    variant="outlined"
                    className="formfield"
                />

                <div> <button className="Regbtn" onClick={signUp}>Register</button></div>



            </form>

        </div>
    )
}

export default SignUp
