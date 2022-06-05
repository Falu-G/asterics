import React, { useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const theme = createTheme();

function LaSignUp() {
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [phone, setValue] = useState();
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [registering, setRegistering] = useState(false);
  const [uploadFeedback, setUploadFeedback] = React.useState({
    message: "",
    type: "",
  });
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    username: "",
    state: "",
    country: "",
  });

  const handleChange = (prop) => (event) => {
    setNewUser({ ...newUser, [prop]: event.target.value });
  };

  const clearFeedback = () => {
    setTimeout(function () {
      setShowFeedback(false);
    }, 3000); //wait 2 seconds
  };

  const moveToVerification = () => {
    setTimeout(function () {
      window.location.href = "/login";
    }, 3500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    newUser.phone = phone;
    console.log(newUser);
    setRegistering(true);

    try {
      let result = await fetch("https://asteric.herokuapp.com/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newUser),
      });

      result = await result.json();
      if (result.responsecode === "200") {
        setRegistering(false);
        setUploadFeedback({
          ...uploadFeedback,
          message: result.message,
          type: "success",
        });
        setShowFeedback(true);
        clearFeedback();
        moveToVerification();
      } else {
        setRegistering(false);
        setUploadFeedback({
          ...uploadFeedback,
          message: result.message,
          type: "error",
        });
        setShowFeedback(true);
        clearFeedback();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={
          matches
            ? { height: "100vh", overflow: "hidden" }
            : { height: "100vh" }
        }
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          position="relative"
          sx={{
            backgroundColor: "#18a0fb",
            width: "100vw",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            position="absolute"
            sx={{
              color: "white",
              top: 10,
              left: 20,
            }}
          >
            AsteriX
          </Typography>

        

          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              component="div"
              sx={
                !matches
                  ? {
                      color: "white",
                      mt: 6,
                      fontWeight: 500,
                    }
                  : {
                      color: "white",
                      fontWeight: 700,
                    }
              }
            >
              Sign Up
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{
                color: "white",
                lineHeight: "1.5",
                letterSpacing: "0.5px",
              }}
            >
              Create your new Account
            </Typography>

            <Typography
              variant="body1"
              gutterBottom
              component="div"
              sx={{
                color: "white",
                lineHeight: "1.5",
              }}
            >
              and manage your account with a single sign on
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {showFeedback ? (
              <Grid
                item
                xs={12}
                mt={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Alert
                  severity={
                    uploadFeedback.type === "success" ? "success" : "error"
                  }
                >
                  <AlertTitle>{uploadFeedback.message}</AlertTitle>
                </Alert>
              </Grid>
            ) : null}
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: "#18a0fb",
              }}
            >
              Create an Account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="standard-first-name"
                    label="Enter your first name"
                    onChange={handleChange("firstname")}
                    value={newUser.firstname}
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="standard-last-name"
                    label="Enter your last name"
                    value={newUser.lastname}
                    onChange={handleChange("lastname")}
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="standard-address"
                    label="Address"
                    onChange={handleChange("address")}
                    value={newUser.address}
                    type="address"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-city"
                    label="City"
                    type="text"
                    value={newUser.city}
                    onChange={handleChange("city")}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-state"
                    label="State"
                    type="text"
                    value={newUser.state}
                    onChange={handleChange("state")}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-country"
                    label="Country"
                    value={newUser.country}
                    type="text"
                    onChange={handleChange("country")}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-email"
                    label="Enter your email address"
                    type="email"
                    value={newUser.email}
                    onChange={handleChange("email")}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} mt={2}>
                  <PhoneInput
                    placeholder="Enter phone number"
                    onChange={setValue}
                    maxLength={11}
                    value={phone}
                    className="layerMargin"
                    defaultCountry="NG"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-username"
                    label="Username"
                    type="text"
                    value={newUser.username}
                    onChange={handleChange("username")}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-password"
                    label="Enter your password"
                    type="password"
                    value={newUser.password}
                    onChange={handleChange("password")}
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="standard-confirm-password"
                    label="Confirm your password"
                    type="password"
                    value={newUser.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Button variant="contained" onClick={handleSubmit}>
                    Sign Up
                  </Button>
                  {registering ? <CircularProgress sx={{ ml: 4 }} /> : null}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LaSignUp;
