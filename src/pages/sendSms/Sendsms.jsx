import React from 'react'
import './sendsms.css'
import NavigationComponent from "../../components/navigationComponent/NavigationComponent"
import FormRadio from '../../components/formRadio/FormRadio';


function Sendsms() {

    const [value, setValue] = React.useState('Yes');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="smsContainer">
            <NavigationComponent title="Send SMS" />

            <div style={{
                backgroundImage: `url(/images/smsbg.png)`
                , backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
                backgroundPosition: 'center right'
            }} className="ScheduleWrapper">


                <div>




                    <FormRadio value={value} handleChange={handleChange} />

                    <form className="scheduleform">
                        <div className="inputIcon">
                            <input className="phone" type="phonenumber" name="username" placeholder="Phone Number" />
                            <img src="/images/contact.png" alt="contact" />
                        </div>

                        <textArea type="text" name="message" placeholder="Messages..." />
                    </form>

                    <button className="sendbtn">Send</button>
                </div>


            </div>


        </div>



    )
}

export default Sendsms
