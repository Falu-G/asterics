import React, { useState } from 'react'
import './sendsms.css'
import Modal from "react-modal"
import NavigationComponent from "../../components/navigationComponent/NavigationComponent"
import FormRadio from '../../components/formRadio/FormRadio';
import Dashnav from '../../components/dashnav/Dashnav'

function Sendsms() {
    let subtitle;
    const [value, setValue] = React.useState('Yes');

    const [openModal, setOpenModal] = useState(false);

    const customStyles = {
        content: {
            width: '80%',
            height: '60%',
            top: '50%',
            left: '50%',
            padding: '0',
            transform: 'translate(-50%, -50%)',
        },
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

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
                            <img
                                onClick={() => setOpenModal(() => openModal ? false : true)}
                                src="/images/contact.png" alt="contact" />
                        </div>

                        <textArea type="text" name="message" placeholder="Messages..." />
                    </form>

                    <button className="sendbtn">Send</button>
                </div>


                <div>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                    <Modal isOpen={openModal}
                        style={customStyles}
                        onAfterOpen={afterOpenModal}
                        contentLabel="Example Modal">

                        <div className="modalContainer">
                            <Dashnav title="SMS Template" />

                            <form className="modalInput">
                                <div className="modalFirstInput">
                                
                                <div className="mf_input">
                                    <input type="text" name="username" placeholder="Title" />
                                    </div>
                                    <div className="ms_input">
                                    
                                     <FormRadio value={value} handleChange={handleChange} />
                                    </div>
                                
                                </div>
                                <p>Second</p>
                                <p>Modal</p>
                                <button
                                    onClick={() => setOpenModal(() => openModal ? false : true)}>Close</button>
                            </form>
                        </div>

                    </Modal>

                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                </div>




            </div>


        </div>



    )
}

export default Sendsms
