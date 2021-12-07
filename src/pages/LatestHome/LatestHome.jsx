import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import  '../LatestHome/latestHome.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000//">
        Asterix
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}







const theme = createTheme();




function LatestHome() {
  const tim = useTheme();
  const matches = useMediaQuery(tim.breakpoints.up('md'));
 
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
  

const styling = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor:"red"
}

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
          justifyContent: "center",
        
        }}>
          <Typography
            variant="h6"
            color="#00B9FF"
            noWrap
            sx={{
              fontWeight: "bold",
              fontSize: 26,
              flexWrap: 'wrap',
              flexGrow: 1
            }}

           
          >
            AsteriX CRM
          </Typography>



         <ul className = 'menLate'>
         <li> <Link href="#" underline="none">FAQ</Link></li>
           <li><Link href="#" underline="none">Contact Us</Link></li>
           <li> <Link href="#" underline="none">Team</Link></li>
           <li><Link href="http://localhost:3000/login" underline="none">Login</Link></li>
         </ul>
        </Toolbar>
      </AppBar>

      <main>
        <Container sx={{ py: 2}} maxWidth="lg">
          {/* End hero unit */}
          <Grid
            container
           
          
          >
            <Grid
               lg = {6}
              sm={12}
            item
              sx={styling}
            >
              

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

              <Button variant="contained" color ='warning' sx = {{mt:2}} size = {'medium'}>Read More</Button>

              
            


            </Grid>




            <Grid  
           
              sm={12}
              lg = {6}
             
              sx={{ backgroundColor: "transparent", display:`flex`,alignItems: 'center',justifyContent: 'center'} }>
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
