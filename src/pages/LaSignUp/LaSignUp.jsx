import React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';


const theme = createTheme();
function LaSignUp() {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={matches? { height: "100vh", overflow: "hidden" }:{ height: "100vh"}}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: "#18a0fb",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{
              color: "white",
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
              sx={{
                color: "white",
                fontWeight: 700,
              }}
            >
              Sign Up
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{
                color: "white",
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
            <Typography component="h1" variant="h5">
              Create an Account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-search"
                    label="Company name"
                    type="search"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-search"
                    label="Enter your first name"
                    type="search"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-search"
                    label="Enter your last name"
                    type="search"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-search"
                    label="Enter your email address"
                    type="search"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-search"
                    label="Enter your phone number"
                    type="search"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-search"
                    label="Username"
                    type="search"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-search"
                    label="Enter your password"
                    type="search"
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="standard-search"
                    label="Confirm your password"
                    type="search"
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12}
                sx={{ flexGrow: 1, alignItems: 'center',justifyContent: 'center' ,display: 'flex'}}>
              

                <Button variant="contained">Sign Up</Button>
               
               
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
