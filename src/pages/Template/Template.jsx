import React, { useState, useContext, useEffect, useCallback } from "react";
import "./template.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { MenuContext } from "../../components/MenuContext";
import { useToasts } from "react-toast-notifications";

import { Delete } from "@material-ui/icons";

import Menus from "../../components/menu/Menu";
import NavigationComponent from "../../components/navigationComponent/NavigationComponent";
//import Button from "@material-ui/core/Button";
//import { makeStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import SessionExpired from "../SessionExpired/SessionExpired";
import TemplateObject from "../../classes/TemplateObject";
import * as ReactBootStrap from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",

//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

function Templates() {
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  let templateObj = new TemplateObject("", "", "");
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [smsTemplates, setSmsTemplates] = useState([]);
  const [templateObjstate, settemplateObjstate] = useState(templateObj);
  const [addEmail, setAddEmail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalTemplate, setModalTemplate] = useState(false);
  const { sidebar, setSideBar } = useContext(MenuContext);
  //const [openModalEmail, setOpenModalEmail] = useState(false);
  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;
  const [tokenValid, setTokenValid] = useState(false);
  const { addToast } = useToasts();
  const [openModalSMS, setOpenModalSMS] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [templateId, setTemplateId] = useState(null);
  const [openAddEmail, setOpenAddEmail] = useState(false);
  const [openSMS, setOpenSMS] = useState(false);
  const [smsToSend, setSmsToSend] = useState(false);

  const [emailToSend, setEmailToSend] = useState(false);
  const [sendMessage, setSendMessage] = useState({
    sender: "Asterics",
    receiver: "",
    message: "",
  });

  //const [open, setOpen] = React.useState(false);

  const [allCustomers, setAllCustomers] = useState([]);
  const [invalidToken, setInvalidToken] = useState(false);

  const handleOpenEmailToSend = (id) => {
    setEmailToSend(true);
  };
  const handleCloseEmailTosSend = () => setEmailToSend(false);


  const [openEmailNested, setOpenEmailNested] = useState(false);

  const handleOpenEmailNested = () => {
    setOpenEmailNested(true);
  };
  const handleCloseEmailNested = () => {
    setOpenEmailNested(false);
  };


  const handleOpenSMSToSend = () => {
    setSmsToSend(true);
  };
  const handleCloseSmsTosSend = () => setSmsToSend(false);
  const [openSmsNested, setOpenSmsNested] = useState(false);

  const handleOpenSmsNested = () => {
    setOpenSmsNested(true);
  };
  const handleCloseSmsNested = () => {
    setOpenSmsNested(false);
  };

  const showSideBar = () => setSideBar(!sidebar);
  const deleteFromArray = (id) => {
    console.log("deleting from array " + id);
    setLoading(true);
    //setOpenModalEmail(false);
    fetch(`https://asteric.herokuapp.com/messageTemplate/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Invalid Token") {
          setLoading(false);
          setTokenValid(true);
        } else if (data.responsecode === "200") {
          setEmailTemplates(
            emailTemplates.filter((element) => element.id !== id)
          );

          setSmsTemplates(smsTemplates.filter((element) => element.id !== id));

          setLoading(false);
          setOpen(false);
          addToast("Templates deleted Successfully", { appearance: "success" });
        } else {
          console.log("An error occured");
          setLoading(false);
          setOpen(false);
          addToast("Error in saving templates", { appearance: "error" });
        }
      })
      .catch((err) => {
        console.log("This is the error that was caught" + err);
        setLoading(false);
        setLoading(false);
        setOpen(false);
      });
  };

  const fetchBusinesses = useCallback(() => {
    fetch("https://asteric.herokuapp.com/messageTemplate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Invalid Token") {
          setTokenValid(true);
        } else {
          setEmailTemplates(
            data.filter((element) => element.messageCategory === "Email")
          );
          setSmsTemplates(
            data.filter((element) => element.messageCategory === "SMS")
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("This is the error that was caught" + err);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  const isBlank = (str) => {
    return !str || /^\s*$/.test(str);
  };

  const handleSetTemplate = async () => {
    console.log(`Message ` + templateObjstate.message);
    if (isBlank(templateObjstate.message)) {
      alert("Message can not be empty");
    } else {
      setAddEmail(true);
      let result = await fetch(
        "https://asteric.herokuapp.com/messageTemplate/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(templateObjstate),
        }
      );

      console.log(
        `The message body is ${templateObjstate.message} and the type of message is ${templateObjstate.messageCategory}`
      );
      result = await result.json();

      if (result.message === "Invalid Token") {
        setTokenValid(true);
        setAddEmail(true);
        setLoading(false);
      } else {
        if (templateObjstate.messageCategory === "Email") {
          // setLoading(false);
          fetchBusinesses();
          //setEmailTemplates([...emailTemplates, templateObjstate]);
          setOpenAddEmail(false);
          console.log("This is numbers of email ");
          console.log("This is the numbers of email " + emailTemplates.length);
          setModalTemplate(!modalTemplate);
          setAddEmail(false);
          addToast("Templates added Succesfully", { appearance: "success" });
        } else {
          setOpenAddEmail(false);
          setOpenSMS(false);
          setLoading(false);
          setSmsTemplates([...smsTemplates, templateObjstate]);
          setOpenModalSMS(false);
          setAddEmail(false);
          addToast("SMS added Succesfully", { appearance: "success" });
        }
      }
    }
  };

  const handleSelectCustomers = async () => {
    handleOpenSMSToSend();
    setLoading(true);
    try {
      let result = await fetch("https://asteric.herokuapp.com/customer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      result = await result.json();
      console.log("You clicked contact");

      if (result.message === "Invalid Token") {
        setLoading(false);
        setInvalidToken(true);
        console.log(result.message);
      } else {
        setAllCustomers(result);
        setLoading(false);
        console.log("receiver of customers " + allCustomers.length);
      }
    } catch (e) {
      setLoading(false);
      console.log("Error In catch " + e.message);
    }
  };

  const handleClickOpen = (id) => {
    setTemplateId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEmail = () => {
    setOpenAddEmail(true);
  };

  const handleCloseEmail = () => {
    setOpenAddEmail(false);
  };

  const handleOpenSMS = () => setOpenSMS(true);

  const handleCloseSMS = () => setOpenSMS(false);

  return (
    <>
      {tokenValid ? (
        <SessionExpired />
      ) : (
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
                {loading ? (
                  <>
                    <ReactBootStrap.Spinner
                      animation="border"
                      role="status"
                      style={{
                        position: "absolute",
                        color: `#18A0FB`,
                        top: "50%",
                        left: "50%",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div className="EmailTemplate">
                      <h3>Email Template</h3>
                      <div className="em_templatebox">
                        {emailTemplates.map((emailTemplate, index) => (
                          <>
                            <div className="em_gen" key={emailTemplate.id}>
                              <h5
                                style={{
                                  marginTop: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleOpenEmailToSend();
                                  //setOpenModalEmail(!openModalEmail)
                                }}
                              >
                                {emailTemplate.message}
                              </h5>
                              <p>{emailTemplate.message}</p>

                              {console.log(index)}

                              <Delete
                                className="delete"
                                onClick={() =>
                                  handleClickOpen(emailTemplate.id)
                                }
                              />
                            </div>
                          </>
                        ))}

                        <div className="em_gen em_add">
                          <img
                            src="images/add.png"
                            alt=""
                            onClick={() => {
                              handleOpenEmail();
                              settemplateObjstate({
                                ...templateObjstate,
                                messageCategory: "Email",
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <Button onClick={handleOpenSMSToSend}>
                      Open Child Modal
                    </Button>
                    <div className="SMSTemplate">
                      <h3>SMS Template</h3>
                      <div className="em_templatebox">
                        {smsTemplates.map((smsTemplate, index) => (
                          <>
                            <div
                              className="em_gen"
                              key={index}
                              onClick={() =>
                                setOpenModalSMS(() =>
                                  openModalSMS ? false : true
                                )
                              }
                            >
                              <h5
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() => handleOpenSMSToSend()}
                              >
                                {smsTemplate.message}
                              </h5>
                              <p>{smsTemplate.message}</p>

                              <Delete
                                className="delete"
                                onClick={() => handleClickOpen(smsTemplate.id)}
                              />
                            </div>
                          </>
                        ))}

                        <div className="em_gen em_add">
                          <img
                            src="images/add.png"
                            alt=""
                            onClick={() => {
                              handleOpenSMS();
                              settemplateObjstate({
                                ...templateObjstate,
                                messageCategory: "SMS",
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"Delete Customer?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Do you really want to delete this template? Nelson wont
                      like it
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>CANCEL</Button>
                    <Button onClick={() => deleteFromArray(templateId)}>
                      DELETE
                    </Button>
                  </DialogActions>
                </Dialog>

                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={emailToSend}
                  onClose={handleCloseEmailTosSend}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={emailToSend}>
                    <Box sx={style}>
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Send this email
                      </Typography>
                      <Typography
                        id="transition-modal-description"
                        sx={{ mt: 2 }}
                      >
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                      </Typography>




                      <Button onClick={handleOpenSmsNested}>Open Child Modal</Button>
                    <Modal
                      hideBackdrop
                      open={openSmsNested}
                      onClose={handleCloseSmsNested}
                      aria-labelledby="child-modal-title"
                      aria-describedby="child-modal-description"
                    >
                      <Box sx={{ ...style, width: 200 }}>
                        <h2 id="child-modal-title">Text in a child modal</h2>
                        <p id="child-modal-description">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <Button onClick={handleCloseSmsNested}>
                          Close Child Modal
                        </Button>

                        </Box>

                        </Modal>


                      
                    </Box>
                  </Fade>
                </Modal>

                <Modal
                  open={smsToSend}
                  onClose={handleCloseSmsTosSend}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Text in a modal</h2>
                    <p id="parent-modal-description">
                      Duis mollis, est non commodo luctus, nisi erat porttitor
                      ligula.
                    </p>

                    <Button onClick={handleOpenSmsNested}>Open Child Modal</Button>
                    <Modal
                      hideBackdrop
                      open={openSmsNested}
                      onClose={handleCloseSmsNested}
                      aria-labelledby="child-modal-title"
                      aria-describedby="child-modal-description"
                    >
                      <Box sx={{ ...style, width: 200 }}>
                        <h2 id="child-modal-title">Text in a child modal</h2>
                        <p id="child-modal-description">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <Button onClick={handleCloseSmsNested}>
                          Close Child Modal
                        </Button>

                        {/* <form className="scheduleform">
                            <div className="inputIcon">
                              <input
                                className="phone"
                                type="phonenumber"
                                name="phone"
                                placeholder="Phone Number"
                                disabled
                                value={sendMessage.receiver}
                                onChange={(e) =>
                                  setSendMessage({
                                    ...sendMessage,
                                    receiver: e.target.value,
                                  })
                                }
                              />
                              <img
                                style={{
                                  cursor: `pointer`,
                                }}
                                onClick={handleSelectCustomers}
                                src="/images/contact.png"
                                alt="contact"
                              />
                            </div>

                            <textArea
                              type="text"
                              name="message"
                              value={sendMessage.message}
                              placeholder="Messages..."
                              onChange={(e) =>
                                setSendMessage({
                                  ...sendMessage,
                                  message: e.target.value,
                                })
                              }
                            />
                          </form> */}
                      </Box>
                    </Modal>
                  </Box>
                </Modal>

                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={openAddEmail}
                  onClose={handleCloseEmail}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openAddEmail}>
                    <Box sx={style}>
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Add Email templates
                      </Typography>

                      <div
                        style={{
                          width: `100%`,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            style={{ width: 340 }}
                            type="text"
                            id="contentSchedule"
                            name="message"
                            placeholder="Messages..."
                            onChange={(e) =>
                              settemplateObjstate({
                                ...templateObjstate,
                                message: e.target.value,
                              })
                            }
                            value={templateObjstate.message}
                          />
                          <div>
                            <ReactBootStrap.Button
                              style={{
                                float: "right",
                                padding: "10px 20px",
                                color: "#fff",
                                backgroundColor: "#18A0FB",
                              }}
                              variant="primary"
                              onClick={handleSetTemplate}
                              disabled={addEmail}
                            >
                              <ReactBootStrap.Spinner
                                as="span"
                                className={
                                  addEmail ? "visible" : "visually-hidden"
                                }
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              <span className="visually">
                                {addEmail ? "Loading..." : "Send"}
                              </span>
                            </ReactBootStrap.Button>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Fade>
                </Modal>

                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={openSMS}
                  onClose={handleCloseSMS}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openSMS}>
                    <Box sx={style}>
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Add SMS templates
                      </Typography>

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
                            width: "100%",
                          }}
                        >
                          <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            style={{ width: 400 }}
                            type="text"
                            id="contentSchedule"
                            name="message"
                            placeholder="Messages..."
                            onChange={(e) =>
                              settemplateObjstate({
                                ...templateObjstate,
                                message: e.target.value,
                              })
                            }
                            value={templateObjstate.message}
                          />
                          <div>
                            <ReactBootStrap.Button
                              style={{
                                float: "right",
                                padding: "10px 20px",
                                color: "#fff",
                                backgroundColor: "#18A0FB",
                              }}
                              variant="primary"
                              onClick={handleSetTemplate}
                              disabled={addEmail}
                            >
                              <ReactBootStrap.Spinner
                                as="span"
                                className={
                                  addEmail ? "visible" : "visually-hidden"
                                }
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              <span className="visually">
                                {addEmail ? "Loading..." : "Send"}
                              </span>
                            </ReactBootStrap.Button>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Fade>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Templates;
