import React from "react";
import "./passwordSent.css";
import {Link, useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },


      button:{
          background: "#18A0FB"
      }
}));
function Passwordsent() {
const history = useHistory();
const classes = useStyles();
  return (
    <div className="passwordsentContainer">
        <Link to = "/">
        <span className="passwordsentContainerTitle">Asteric</span>
        </Link>
       
      <div className="passwordContainerWrapper">
        <img src="images/psssent.png" alt="" />
        <span className="passwordContainerWrapper-title"> Your new password has been sent to your email.</span>
        <Button 
        className = {classes.button}
        variant="contained" 
        color="primary"
        onClick = {()=> {
            history.push("/login")
        }}>
          Go to login page

        </Button>
   
      </div>
    </div>
  );
}

export default Passwordsent;
