import React from 'react'
import "./formRadio.css"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function FormRadio({value, handleChange}) {

    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
      }));

      const classes = useStyles();
    return (
        <div className="schedule-image">
          <TextField
    id="datetime-local"
    label="Schedule Time"
    type="datetime-local"
    defaultValue={`${new Date().toLocaleDateString()}`}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />

        <FormControl component="fieldset" className="formControl">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} row>
                <FormControlLabel value="female" control={<Radio />} label="Yes" />
                <FormControlLabel value="male" control={<Radio />} label="No" />
            </RadioGroup>
        </FormControl>



    </div>
    )
}

export default FormRadio
