import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.css";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
//import TextField from "@material-ui/core/TextField";
import { useToasts } from "react-toast-notifications";
import TextField from "@mui/material/TextField";
import CssBaseline from '@mui/material/CssBaseline';
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    marginTop: 5,
  },
  textField: {
    width: "40ch",
  },
}));

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [showIcon, setShowIcon] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [loginError, setLoginError] = useState(false);
  const { addToast } = useToasts();
  const classes = useStyles();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const override = css`
    display: block;
    margin: 0 auto;
  `;
  const login = async (e) => {
    setShowIcon(true);
    e.preventDefault();
    //console.warn(email, password);

    let item = { email, password: values.password };

    console.log(item);
    try {
      let result = await fetch(
        "https://asteric.herokuapp.com/users/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      result = await result.json();

      console.log(`This is the ${JSON.stringify(result)}`);
      if (result.status === "success") {
        console.log(result);
        setShowIcon(false);
        localStorage.setItem("user-info", JSON.stringify(result));
        history.push("/maindashboard");
      } else {
        setErrorMessage(result.message);
        setLoginError(true);
        setShowIcon(false);
      }
    } catch (e) {
      setLoginError(true);
      setShowIcon(false);
      addToast(e.message, { appearance: "error" });
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {}, []);

  return (
    <div className="LoginContainer">
        <CssBaseline />
      <div className="LoginContainerfirstbox">
        <Link to="/">
          <span>Asteric</span>
        </Link>
        <div className="LoginImg">
          <img src="images/loginimg.png" alt="Login" />
          {/* <span>Login to your account</span> */}
          <p>Manage your customer's easily with Asteric</p>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(/images/graybg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="LoginContainersecondbox"
      >
        <div className="LoginContainersecondboxform">
          <h2>Login</h2>

          <form className="formHouse">
            <TextField
              label="Enter your email address"
              className={classes.margin}
              onChange={(e) => setEmail(e.target.value)}
              variant='standard'
              margin = "dense"
              
            />

            <FormControl className={classes.margin} variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                style={{
                  marginTop: 15,
                }}
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                style={{
                  marginTop: 15,
                }}
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
               
              
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                fullWidth={true}
                labelWidth={90}
              />
            </FormControl>

            {/* <input
              className="forminput"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="forminput"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Password"
            /> */}

            <div className="forminput-sipa">
              <Link
                style={{
                  textDecoration: `none`,
                }}
                to="/resetpassword"
              >
                <span>Forgot password</span>
              </Link>

              <Link
                style={{
                  textDecoration: `none`,
                }}
                to="/signup"
              >
                <span>Sign Up</span>
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <button className="submitbut" onClick={login}>
                Login
              </button>
              <BeatLoader loading={showIcon} color={"#18A0FB"} css={override} />
            </div>
          </form>

          {loginError ? (
            <>
              <div className="errorLogin">
                <h3>{errorMessage} </h3>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Login;
