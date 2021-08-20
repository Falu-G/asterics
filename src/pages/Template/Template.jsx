import React, { useState } from 'react'
import './template.css'
import AttachmentIcon from '@material-ui/icons/Attachment';
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import { Delete } from '@material-ui/icons';
import Modal from "react-modal"
import FormRadio from '../../components/formRadio/FormRadio';
import Dashnav from '../../components/dashnav/Dashnav'
import Menus from "../../components/menu/Menu"
import NavigationComponent from '../../components/navigationComponent/NavigationComponent'
import Message from '../../classes/Messages'
function Templates() {



    let message = new Message("Promo", "Come and buy what we are selling");


    let emailList = [message];
    let smsList = [message];

    const [emailTemplates, setEmailTemplates] = useState(emailList)
    const [smsTemplates, setSmsTemplates] = useState(smsList)


    const [modalTemplate, setModalTemplate] = useState(false);



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


    const valueGetter = (myInput)=>{
        // Selecting the input element and get its value 
        var inputVal = document.getElementById(myInput).value;
        
        // Displaying the value
        console.log(inputVal)
        return inputVal
    }

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
                                {console.log(message.title)}
                                {console.log(message.content)}
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



                        <Modal isOpen={modalTemplate}
                            style={customStyles}>
                            <Dashnav title="Add to templates" />

                            <div className="mf_input">
                                <input id = "titleSchedule" type="text" name="username" placeholder="Title" />
                            </div>

                            <div>
                                <h3>Add templates to SMS or Email templates</h3>
                            </div>

                            <textArea type="text" id = "contentSchedule" name="message" placeholder="Messages..." />
                            <div><button
                            onClick={()=>{
                                //let mess = new Message("","")
                                let val  = valueGetter("titleSchedule");
                                let content = valueGetter("contentSchedule");
                                let messs = new Message(val,content)
                                
                                emailList.push(messs);
                                setEmailTemplates(emailList);

                                console.log(emailList.length);
                                
                            }}>ADD</button></div>


                        </Modal>


                        <div className="EmailTemplate">
                            <h3>Email Template</h3>
                            <div className="em_templatebox">


                                {emailTemplates.map((emailTemplate, index) => <>
                                    <div className="em_gen"
                                        key={index}
                                        onClick={() => setOpenModalSMS(() => openModalSMS ? false : true)}>
                                        <h3>{emailTemplate.title}</h3>
                                        <p>{emailTemplate.content}</p>
                                        <Delete className="delete" />

                                    </div>
                                </>)}







                                <div className="em_gen em_add">
                                    <img src="images/add.png" alt="" onClick={() => setModalTemplate(!modalTemplate)} />
                                </div>
                            </div>

                        </div>

                        <div className="SMSTemplate">
                            <h3>SMS Template</h3>
                            <div className="em_templatebox">

                                {smsTemplates.map((smsTemplate, index) => <>
                                    <div className="em_gen" key={index}
                                        onClick={() => setOpenModalSMS(() => openModalSMS ? false : true)} >
                                        <h3>{smsTemplate.title}</h3>
                                        <p>{smsTemplate.content}</p>
                                    </div>
                                </>)}

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
