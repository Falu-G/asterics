import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Link from "@mui/material/Link";
import "./login.css";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";

import Button from "@mui/material/Button";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";


const theme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        AsteriX
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Login() {
  let history = useHistory();
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [loginin, setLoginin] = useState(false);
  const [uploadFeedback, setUploadFeedback] = React.useState({
    message: "",
    type: "",
  });

  const clearFeedback = () => {
    setTimeout(function () {
      setShowFeedback(false);
    }, 3000); //wait 2 seconds
  };




  const login = async (event) => {
    event.preventDefault();
    //console.warn(email, password);

    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    setLoginin(true);
    let item = { email: data.get("email"), password: data.get("password") };

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

      console.log(result);
      if (result.status === "success") {
        console.log(result);
        setLoginin(false);
        localStorage.setItem("user-info", JSON.stringify(result));
        history.push("/maindashboard");
      } else {
        setLoginin(false);
        setShowFeedback(true);
        setUploadFeedback({...uploadFeedback, message: result.message, type: "error"});
        console.log(result.message);
        clearFeedback();
      }
    } catch (e) {
      setLoginin(false);
      setShowFeedback(true);
      setUploadFeedback(e.message)
      setUploadFeedback({...uploadFeedback, message: e.message, type: "error"});
      clearFeedback();
    }
  };


  useEffect(() => {}, []);

  return (


    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        container
        maxWidth="xl"
        disableGutters
        sx={{
          backgroundImage: `url(/images/graybg.png)`,
          height: "100vh",
          backgroundPosition: "center right",
          flexDirection: "column",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AppBar
          position="relative"
          elevation={0}
          sx={{ backgroundColor: "transparent" }}
        >
          <Toolbar>
            <Typography variant="h6" color="primary.main" noWrap>
              AsteriX
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 3,
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

            <Typography component="h1" variant="h5">
              Login in
            </Typography>
            <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                variant="standard"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                variant="standard"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              {loginin ? <div style={{display:"flex", justifyContent: "center"}}>

                <CircularProgress  />
              </div> : null}
              <Grid container>
                <Grid item xs>
                  <Link href="../resetPassword/ResetPassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="../LaSignUp/LaSignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
