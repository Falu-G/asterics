import React from "react";
import "./resetPassword.css";
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '75ch',
          backgroundColor: '#f5f5f5',
        },
      },

    text:{
        margin: "20px 0",
    },

    button: {
        background: "#18A0FB",
        color: "white",
        fontSize: "20px"
      },
  }));

function ResetPassword() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div
      className="resetPasswordContainer"
      style={{
        backgroundImage: `url(/images/bgpassword.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center right",
      }}
    >


        <Link  to ="/">
        <span className="resetPasswordContainer-title">Asteric MMS</span>
        </Link>
     
      <div className="resetPasswordWrapper">
        <div className="resetPasswordContainer-input">
          <span className="resetPasswordContainer-input-title">Forgot Password</span>

          <form noValidate className={classes.root} autoComplete="off">
            <TextField
              label="Enter your email address"
              className={classes.text}
              variant="outlined"
            />
          </form>

          <Button
              variant="contained"
              color="white"
              fontSize="10px"
              className={classes.button}

              onClick={()=> {

                history.push('/passwordsent')
              }}
            
            >
              Submit
            </Button>
          <div></div>
        </div>

        <div className="resetPasswordContainer-lock">
          <img src="images/lock.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
