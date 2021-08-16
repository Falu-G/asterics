import React from 'react'
import './sendemail.css'
import NavigationComponent from "../../components/navigationComponent/NavigationComponent"
import FormRadio from '../../components/formRadio/FormRadio';
function SendEmail() {


    const [value, setValue] = React.useState('Yes');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="sendEmailContainer">
            <NavigationComponent title="Send Email" />

            <div style={{
                backgroundImage: `url(/images/smsbg.png)`
                , backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
                backgroundPosition: 'center right'
            }} className="SendEmailWrapper">


                <div>
                    <FormRadio value={value} handleChange={handleChange} />

                    <form className="scheduleform">
                        <div className="inputIcon">
                        <input className="phone" type="email" name="username" placeholder="Add Email" />
                        <img src = "/images/contact.png" alt="contact" />
                        </div>
                       
                        <textArea type="text" name="message" placeholder="Messages..." />
                    </form>

                    <button className="sendbtn">Send</button>
                    
                </div>

            </div>
        </div>
    )
}

export default SendEmail
