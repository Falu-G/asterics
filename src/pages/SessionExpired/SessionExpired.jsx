import React from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  button: {
    background: "#18A0FB",
  },
}));

function SessionExpired() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div>
      <Link to="/">
        <span className="passwordsentContainerTitle">Asteric</span>
      </Link>

      <div className="passwordContainerWrapper">
        <img src="images/psssent.png" alt="" />
        <span className="passwordContainerWrapper-title">
          Your session expired, Kindly relogin to continue
        </span>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/login");
          }}
        >
          Go to login page
        </Button>
      </div>
    </div>
  );
}

export default SessionExpired;
