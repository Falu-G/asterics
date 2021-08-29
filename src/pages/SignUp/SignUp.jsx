import React, { useState } from "react";
//import { useHistory } from 'react-router-dom'
import TextField from "@material-ui/core/TextField";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { BeatLoader } from "react-spinners";
import { states } from "../../StatesandLgas";
import User from "../../classes/User"
//import { css } from "@emotion/react";

import "./signUp.css";
import { Link } from "react-router-dom";
function SignUp() {
  const [email, setEmail] = useState("");
  const [phone, setValue] = useState();
  const [lastname, setLastName] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [firstname, setFirstName] = useState("");
  const [city, setCity] = useState("")
  const [showSucces, setShowSucces] = useState(false);
  const [showReport, setShowReport] = useState("");
  const [address, setAddress] = useState("");
  const [state, setStateName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //let history = useHistory();
  const signUp = async (e) => {
    e.preventDefault();
    let user = new User(firstname,username,lastname,address,email,password,confirmPassword,phone,city,state,country);

    setShowIcon(true);

    try {
      let result = await fetch("https://asteric.herokuapp.com/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user)
      });

      console.log(result);

      if (result.status === 200) {
        result = await result.json();
        console.warn(result.status);
        setShowIcon(false);
        localStorage.setItem("user-info", JSON.stringify(result));

        setShowSucces(result.status);
        setShowReport(result.message);
        //history.push("/maindashboard")
      } else {
        result = console.warn(result.statusText);
        setShowIcon(false);
        setShowSucces(true);
        setShowReport(result.statusText);
      }
    } catch (err) {}
  };

  return (
    <div
      className="formContainer"
      style={{
        backgroundImage: `url(/images/signupbg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center left",
      }}
    >
      {console.log(state)}
      <Link to="/">
      <span className = "formContainer-title">Asteric</span>
      </Link>
      
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

          <hr size={3} />

          <div className="firstfield layerMargin">
            <TextField
              id="firstname"
              label="First Name"
              variant="outlined"
              className="firstfieldin"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstname}
            />

            <TextField
              style={{ marginLeft: "10px" }}
              label="Last Name"
              variant="outlined"
              className="firstfieldin"
              onChange={(e) => setLastName(e.target.value)}
              value={lastname}
            />
          </div>

          <div className="firstfield layerMargin">
            <TextField
              label="Address"
              variant="outlined"
              className="firstfieldin"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />

            <TextField
              style={{ marginLeft: "10px" }}
              label="City"
              variant="outlined"
              className="firstfieldin"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </div>

          <div className="firstfield layerMargin">
            <select
              name="states"
              style={{
                
                fontSize: "16px",
                outline: "none",
                marginRight: "5px",
                padding: "5px",
              }}
              className="firstfieldin"
              onChange={(e) => setStateName(e.target.value)}
              value={state}
            >
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <TextField
              style={{ marginLeft: "5px" }}
              id="lastname"
              label="Country"
              variant="outlined"
              className="firstfieldin"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </div>

          <div className = "layerMargin" >
          <TextField
           style={{ 
             width: "100%",
           }}
            label="Enter email address"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          </div>
          
          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            className="layerMargin"
            defaultCountry="NG"
            onChange={setValue}
          />


          <TextField
          style={{ 
            marginTop: "10px",
          }}
            label="Username"
            variant="outlined"
            className="layerMargin"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <div className="secondfield layerMargin">
            <TextField
              label="Enter password"
              type="password"
              variant="outlined"
              style={{ marginRight: "5px" }}
              className="secondfieldin"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <TextField
              style={{ marginLeft: "5px" }}
              id="Confirm password"
              type="password"
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
              alignItems: `center`,
            }}
          >
            <button className="Regbtn" onClick={signUp}>
              Register
            </button>
            <BeatLoader loading={showIcon} />
          </div>
          {showSucces ? <h3>{showReport}</h3> : null}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
