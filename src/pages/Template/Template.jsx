import React, { useState } from 'react'
import './template.css'
import AttachmentIcon from '@material-ui/icons/Attachment';
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import Modal from "react-modal"
import FormRadio from '../../components/formRadio/FormRadio';
import Dashnav from '../../components/dashnav/Dashnav'
import Menus from "../../components/menu/Menu"
import NavigationComponent from '../../components/navigationComponent/NavigationComponent'
function Templates() {

    const [sidebar, setSideBar] = useState(false);
    const showSideBar = () => setSideBar(!sidebar);
    const [openModalEmail, setOpenModalEmail] = useState(false);

    const [openModalSMS, setOpenModalSMS] = useState(false);
    const [value, setValue] = React.useState('Yes');
    const customStyles = {
        content: {
            width: '80%',
            height: '70%',
            top: '50%',
            left: '50%',
            padding: '0',
            transform: 'translate(-50%, -50%)',
        },
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="templatesContainer">
            <div className={sidebar ? "maindashboardContainerMenu" : "maindashboardContainerMenuClosed"}>
                <Menus sidebar={sidebar} controlSideBar={showSideBar} />
            </div>
            <div className={sidebar ? "maindashboardContainerDashboard" : "maindashboardContainerDashboardClosed"}>

                <div style={{
                    backgroundImage: `url(/images/smsbg.png)`
                    , backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
                    backgroundPosition: 'center right'
                }} className="dashboardContainer">
                    <NavigationComponent title="Template" />
                    <div className="scheduleDashboard">

                        <Modal isOpen={openModalEmail}
                            style={customStyles}

                            contentLabel="Example Modal">

                            <div className="modalContainer">
                                <Dashnav title="Email Template" />

                                <form className="modalInput">
                                    <div className="modalFirstInput">

                                        <div className="mf_input">
                                            <input type="text" name="username" placeholder="Title" />
                                        </div>
                                        <div className="ms_input">

                                            <FormRadio value={value} handleChange={handleChange} />
                                        </div>

                                    </div>
                                    <input type="text" name="username" placeholder="Email address" className="tm-input" />
                                    <div className="tm-icons">
                                        <AttachmentIcon />
                                        <ImageIcon />
                                        <GifIcon />
                                        <FormatBoldIcon />
                                        <FormatItalicIcon />
                                    </div>

                                    <div className="tm-txtAndbt"> <textArea type="text" name="message" placeholder="Messages..." />
                                        <div><button
                                            style={{
                                                float: 'right', width: '89px', height: '34px',
                                                marginTop: '10px', backgroundColor: '#18A0FB',
                                                borderRadius: '5px', color: '#fff',
                                                padding: '5px', border: 'none', cursor: 'pointer'
                                            }}
                                            onClick={() => setOpenModalEmail(() => openModalEmail ? false : true)}>Close</button>
                                        </div>
                                    </div>


                                </form>
                            </div>

                        </Modal>



                        <Modal isOpen={openModalSMS}
                            style={customStyles}

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
                                    <input type="text" name="username" placeholder="Phone number" className="tm-input" />
                                    <div className="tm-icons">
                                        <AttachmentIcon />
                                        <ImageIcon />
                                        <GifIcon />
                                        <FormatBoldIcon />
                                        <FormatItalicIcon />
                                    </div>

                                    <div className="tm-txtAndbt"> <textArea type="text" name="message" placeholder="Messages..." />
                                        <div><button
                                            style={{
                                                float: 'right', width: '89px', height: '34px',
                                                marginTop: '10px', backgroundColor: '#18A0FB',
                                                borderRadius: '5px', color: '#fff',
                                                padding: '5px', border: 'none', cursor: 'pointer'
                                            }}
                                            onClick={() => setOpenModalSMS(() => openModalSMS ? false : true)}>Close</button>
                                        </div>
                                    </div>


                                </form>
                            </div>

                        </Modal>


                        <div className="EmailTemplate">
                            <h3>Email Template</h3>
                            <div className="em_templatebox">
                                <div className="em_gen">First EmailT</div>
                                <div className="em_gen">First EmailT</div>
                                <div className="em_gen">First EmailT</div>
                                <div className="em_gen em_add">
                                    <img src="images/add.png" alt="" onClick={() => setOpenModalEmail(() => openModalEmail ? false : true)} />
                                </div>
                            </div>

                        </div>

                        <div className="SMSTemplate">
                            <h3>SMS Template</h3>
                            <div className="em_templatebox">
                                <div className="em_gen">First EmailT</div>
                                <div className="em_gen">First EmailT</div>
                                <div className="em_gen">First EmailT</div>
                                <div className="em_gen">First EmailT</div>
                                <div className="em_gen">First EmailT</div>
                                <div className="em_gen">First EmailT</div>
                                <div className="em_gen">First EmailT</div>
                                <div className="em_gen em_add">

                                    <img src="images/add.png" alt=""
                                        onClick={() => setOpenModalSMS(() => openModalSMS ? false : true)} />
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Templates
