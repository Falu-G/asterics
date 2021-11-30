import React from "react";
// import Navbar from "../../components/navbar/Navbar";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
// import CameraIcon from "@mui/icons-material/PhotoCamera";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import  '../LatestHome/latestHome.css'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Asterix
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function LatestHome() {



  const footers = [
    {
      title: 'Send SMS with a fast and Reliable means',
    
    },
    {
      title: 'Schedule Messages with templates',
    
    },
    {
      title: 'Unlimited Access to your Customer base',
     
    },
   
  ];
  



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
        <Toolbar sx = {{ 
         
          display: "flex",
          alignItems: "center",
        
        }}>
          <Typography
            variant="h6"
            color="#00B9FF"
            noWrap
            sx={{
              fontWeight: "bold",
              fontSize: 36,
              flexWrap: 'wrap',
              flexGrow: 1
            }}

           
          >
            AsteriX CRM
          </Typography>



         <ul className = 'menLate'>
         <li>FAQ</li>
           <li>Contact Us</li>
           <li>Team</li>
           <li>Login</li>
         </ul>
        </Toolbar>
      </AppBar>

      <main>
        <Container sx={{ py: 2 , height: "700px"}} maxWidth="lg">
          {/* End hero unit */}
          <Grid
          item
            container
          >
            <Grid
             
              md={6}
              sm={12}
             
     
              sx={{
                display: "flex",
                flexDirection: "column",
                //alignItems: "center",
                justifyContent: "center",
                height: `100%`,
                
              }}
            >
              <div style = {{width: 400}}>

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

              <Button variant="contained" color ='warning' sx = {{mt:2}}>Read More</Button>

              </div>
            


            </Grid>
            <Grid  xs={12}
              sm={12}
              md={6}
              sx={{ backgroundColor: "transparent", display:`flex`,alignItems: 'center',justifyContent: 'center'}}>
              <img src="images/chat.png" alt="" />
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Container
        maxWidth="lg"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} >
          {footers.map((footer) => (
            <Grid item xs={6} md = {4} sm={12} key={footer.title}>
              <Typography variant="h4"  gutterBottom sx = {{color:"#00B5FF"}}>
                {footer.title}
              </Typography>
             
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default LatestHome;
