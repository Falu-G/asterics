import React from "react";
// import Navbar from "../../components/navbar/Navbar";
import AppBar from "@mui/material/AppBar";
// import Button from "@mui/material/Button";
// import CameraIcon from "@mui/icons-material/PhotoCamera";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme();

function LatestHome() {
  return (
    <ThemeProvider theme={theme}>
      {/* <Navbar /> */}

      <CssBaseline />
      <AppBar
        position="relative"
        elevation={0}
        color={"transparent"}
        maxWidth="lg"
      >
        <Toolbar>
          <Typography
            variant="h6"
            color="#00B9FF"
            noWrap
            sx={{
              fontWeight: "bold",
              fontSize: 36,
            }}
          >
            AsteriX CRM
          </Typography>
          <div></div>
        </Toolbar>
      </AppBar>

      <main>
        <Container sx={{ py: 2 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid
            container
            alignItems="flex-end"
            sx={{ height: "550px", overflow: "hidden" }}
          >
            <Grid
              xs={12}
              sm={6}
              xl={6}
     
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: `100%`,
                
              }}
            >
              <div>



              <Typography
                variant="h6"
                color="#00B9FF"
                noWrap
                sx={{
                  fontWeight: "bold",
                  fontSize: 36,
                }}
              >
                AsteriX CRM
              </Typography>

              <Typography
                variant="p"
                color="inherit"
              >
               Get instant access to exciting tools to support your business that
            will bring you close to customers for you.
              </Typography>

              </div>
            


            </Grid>
            <Grid xs={12} sm={6} xl={6} sx={{ backgroundColor: "transparent" }}>
              <img src="images/chat.png" alt="" />
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default LatestHome;
