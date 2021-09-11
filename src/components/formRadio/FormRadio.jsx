import React from "react";
import "./formRadio.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";

function FormRadio({ value, handleChange, handleScheduleTime}) {
  

  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = `${yyyy}-${mm}-${dd}`;
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const [scheduledTime, setScheduledTime] = useState("No");

  const changeTime = (event) => {
    setScheduledTime(event.target.value);
  };

  const classes = useStyles();
  return (
    <div className="schedule-image">

      {console.log(today)}
     
      {scheduledTime === "Yes" ? (
        <TextField
          id="datetime-local"
          label="Schedule Time"
          type="datetime-local"
          onChange={handleScheduleTime}
          defaultValue={`${today}T00:00`}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      ) : null}

      <FormControl
        component="fieldset"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Schedule Message</span>
        <RadioGroup
          aria-label="Schedule_Message"
          name="Schedule"
          value={scheduledTime}
          onChange={changeTime}
          row
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default FormRadio;
