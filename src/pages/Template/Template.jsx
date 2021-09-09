import React, { useState, useContext } from "react";
import "./template.css";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { MenuContext } from "../../components/MenuContext";
import ImageIcon from "@material-ui/icons/Image";
import GifIcon from "@material-ui/icons/Gif";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import { Delete } from "@material-ui/icons";
import Modal from "react-modal";
import FormRadio from "../../components/formRadio/FormRadio";
import Dashnav from "../../components/dashnav/Dashnav";
import Menus from "../../components/menu/Menu";
import NavigationComponent from "../../components/navigationComponent/NavigationComponent";
import Message from "../../classes/Messages";
import Close from "@material-ui/icons/Close";
//import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },

//     button: {

//         backgroundColor: "#18a0fb",
//         float: "right",

//     }
//   },
// }));

function Templates() {
  let message = new Message("Promo", "Come and buy what we are selling");

  let emailList = [message];
  let smsList = [message];
  //   const classes = useStyles();
  const [emailTemplates, setEmailTemplates] = useState(emailList);
  const [smsTemplates, setSmsTemplates] = useState(smsList);

  const [title, setTitle] = useState("");

  const [modalTemplate, setModalTemplate] = useState(false);

  const {sidebar,setSideBar} = useContext(MenuContext);
  const showSideBar = () => setSideBar(!sidebar);

  const [openModalEmail, setOpenModalEmail] = useState(false);

  const [mesag, setMesag] = useState("");

  const [openModalSMS, setOpenModalSMS] = useState(false);
  const [value, setValue] = React.useState("Yes");
  const customStyles = {
    content: {
      width: "80%",
      height: "70%",
      top: "50%",
      left: "50%",
      padding: "0",
      transform: "translate(-50%, -50%)",
    },
  };
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const deleteFromArray = (title) => {
    setOpenModalEmail(false);
    setEmailTemplates(
      emailTemplates.filter(function (element) {
        return element.title !== title;
      })
    );
  };

  console.log(() => {
    setSmsTemplates([]);
  });

  return (
    <div className="templatesContainer">
      <div
        className={
          sidebar
            ? "maindashboardContainerMenu"
            : "maindashboardContainerMenuClosed"
        }
      >
        <Menus sidebar={sidebar} controlSideBar={showSideBar} />
      </div>
      <div
        className={
          sidebar
            ? "maindashboardContainerDashboard"
            : "maindashboardContainerDashboardClosed"
        }
      >
        <div
          style={{
            backgroundImage: `url(/images/smsbg.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center right",
          }}
          className="dashboardContainer"
        >
          <NavigationComponent title="Template" />
          <div className="scheduleDashboard">
            <Modal
              isOpen={openModalEmail}
              style={customStyles}
              contentLabel="Example Modal"
            >
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
                  <input
                    type="text"
                    name="username"
                    placeholder="Email address"
                    className="tm-input"
                  />
                  <div className="tm-icons">
                    <AttachmentIcon />
                    <ImageIcon />
                    <GifIcon />
                    <FormatBoldIcon />
                    <FormatItalicIcon />
                  </div>

                  <div className="tm-txtAndbt">
                    {" "}
                    <textArea
                      type="text"
                      name="message"
                      placeholder="Messages..."
                    />
                    <div>
                      <button
                        style={{
                          float: "right",
                          width: "89px",
                          height: "34px",
                          marginTop: "10px",
                          backgroundColor: "#18A0FB",
                          borderRadius: "5px",
                          color: "#fff",
                          padding: "5px",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setOpenModalEmail(() =>
                            openModalEmail ? false : true
                          )
                        }
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Modal>

            <Modal
              isOpen={openModalSMS}
              style={customStyles}
              contentLabel="Example Modal"
            >
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
                  <input
                    type="text"
                    name="username"
                    placeholder="Phone number"
                    className="tm-input"
                  />
                  <div className="tm-icons">
                    <AttachmentIcon />
                    <ImageIcon />
                    <GifIcon />
                    <FormatBoldIcon />
                    <FormatItalicIcon />
                  </div>

                  <div className="tm-txtAndbt">
                    {" "}
                    <textArea
                      type="text"
                      name="message"
                      placeholder="Messages..."
                    />
                    <div>
                      <button
                        style={{
                          float: "right",
                          width: "89px",
                          height: "34px",
                          marginTop: "10px",
                          backgroundColor: "#18A0FB",
                          borderRadius: "5px",
                          color: "#fff",
                          padding: "5px",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setOpenModalSMS(() => (openModalSMS ? false : true))
                        }
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Modal>

            <Modal isOpen={modalTemplate} style={customStyles}>
              <Dashnav title="Add to templates" />
              <Close
                style={{
                  position: "absolute",
                  top: 0,
                  right: 10,
                }}
                onClick={() => setModalTemplate(!modalTemplate)}
              />

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "90%",
                  }}
                >
                  <div
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <input
                      id="titleSchedule"
                      type="text"
                      name="title"
                      style={{
                        width: "90%",
                        borderRadius: "5px",
                        outline: "none",
                        height: "40px",
                        border: "1px solid #DCDCDC",
                        paddingLeft: "10px",
                      }}
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                  </div>

                  <div>
                    <h3>Add templates to SMS or Email templates</h3>
                  </div>

                  <textArea
                    type="text"
                    id="contentSchedule"
                    name="message"
                    placeholder="Messages..."
                    onChange={(e) => setMesag(e.target.value)}
                    value={mesag}
                  />
                  <div>
                    <Button
                      variant="contained"
                      style={{
                        float: "right",
                        color: "#fff",
                        backgroundColor: "#18A0FB",
                      }}
                      onClick={() => {
                        let messs = new Message(title, mesag);
                        setEmailTemplates([...emailTemplates, messs]);
                      }}
                    >
                      ADD
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>

            <div className="EmailTemplate">
              <h3>Email Template</h3>
              <div className="em_templatebox">
                {emailTemplates.map((emailTemplate, index) => (
                  <>
                    <div className="em_gen" key={index}>
                      <h3 onClick={() => setOpenModalEmail(!openModalEmail)}>
                        {emailTemplate.title}
                      </h3>
                      <p>{emailTemplate.content}</p>

                      {console.log(index)}

                      <Delete
                        className="delete"
                        onClick={() => deleteFromArray(emailTemplate.title)}
                      />
                    </div>
                  </>
                ))}

                <div className="em_gen em_add">
                  <img
                    src="images/add.png"
                    alt=""
                    onClick={() => setModalTemplate(!modalTemplate)}
                  />
                </div>
              </div>
            </div>

            <div className="SMSTemplate">
              <h3>SMS Template</h3>
              <div className="em_templatebox">
                {smsTemplates.map((smsTemplate, index) => (
                  <>
                    <div
                      className="em_gen"
                      key={index}
                      onClick={() =>
                        setOpenModalSMS(() => (openModalSMS ? false : true))
                      }
                    >
                      <h3>{smsTemplate.title}</h3>
                      <p>{smsTemplate.content}</p>
                    </div>
                  </>
                ))}

                <div className="em_gen em_add">
                  <img
                    src="images/add.png"
                    alt=""
                    onClick={() =>
                      setOpenModalSMS(() => (openModalSMS ? false : true))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templates;
