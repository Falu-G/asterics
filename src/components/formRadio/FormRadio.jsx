import React from 'react'
import "./formRadio.css"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

function FormRadio({value, handleChange}) {
    return (
        <div className="schedule-image">
        <img src="images/calendar.png" alt="calendar schedule" />
        <span>Schedule Time</span>

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
