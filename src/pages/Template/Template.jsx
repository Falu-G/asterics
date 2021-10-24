import React, { useState, useContext, useEffect, useCallback } from "react";
import "./template.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import { MenuContext } from "../../components/MenuContext";
import { useToasts } from "react-toast-notifications";
import { useTable, usePagination, useRowSelect } from "react-table";
import { Delete } from "@material-ui/icons";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Menus from "../../components/menu/Menu";
import NavigationComponent from "../../components/navigationComponent/NavigationComponent";
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
import { Checkbox } from "../../components/Checkbox";
import ShowUpEmailPro from "../ShowUpEmail/ShowUpEmailPro";
import TextEditor from "../../components/TextEditor/TextEditor";
import ReactQuill, {Quill} from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
//import htmlToDraft from "html-to-draftjs";
import ReactHtmlParser from "react-html-parser";
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

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function Templates() {
  let templateObj = new TemplateObject("", "", "");
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [smsTemplates, setSmsTemplates] = useState([]);
  const [templateObjstate, settemplateObjstate] = useState(templateObj);
  const [addEmail, setAddEmail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalTemplate, setModalTemplate] = useState(false);
  const { sidebar, setSideBar } = useContext(MenuContext);
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
  const [sendingMessage, setSendingMessage] = useState(false);

  const [sendSms, setSendSms] = useState({
    sender: "Asterics",
    receiver: "",
    message: "",
  });

  const [sendEmail, setSendEmail] = useState({
    recieverAddress: "",
    messageBody: "",
    messageSubject: "",
  });

  const [chipDataEmail, setChipDataEmail] = useState([]);

  const [chipData, setChipData] = React.useState([]);

  const [allCustomers, setAllCustomers] = useState([]);
  const [invalidToken, setInvalidToken] = useState(false);

  const [newMessage, setMessageState] = useState(sendEmail.messageBody);

  const handleQuilChange = (value) => {
    setMessageState(value);
    setSendEmail({
      ...sendEmail,
      messageBody: value,
    });
  };
  const handleOpenEmailToSend = (message) => {
    setEmailToSend(true);
    setSendEmail({ ...sendEmail, messageBody: message });
    console.log("This message shows " + message);
  };
  const handleCloseEmailTosSend = () => setEmailToSend(false);

  const [openEmailNested, setOpenEmailNested] = useState(false);

  const handleOpenEmailNested = () => {
    setOpenEmailNested(true);
  };
  const handleCloseEmailNested = () => {
    setOpenEmailNested(false);
  };

  const handleOpenSMSToSend = (def) => {
    setSmsToSend(true);
    setSendSms({ ...sendSms, message: def });
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
  //const letterReducer = (letter) => letter.substring(0, 50);
  //const letterReducerToSixty = (letter) => letter.substring(0, 60);
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

  const handleSendEmail = async () => {
    console.log(sendEmail);
    setSendingMessage(true);
    setSendEmail({
      ...sendEmail,
      message: newMessage,
    });

    console.log(sendEmail);
    try {
      let result = await fetch("https://asteric.herokuapp.com/mails/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(sendEmail),
      });

      result = await result.json();
      if (result.status === 200) {
        console.log(result.message);
        setSendingMessage(false);
        handleCloseEmailTosSend();
        addToast(result.message, { appearance: "success" });
      } else {
        console.log(result.message);
        setSendingMessage(false);
        handleCloseEmailTosSend();
        addToast(result.message, { appearance: "success" });
      }
    } catch (err) {
      console.log("Something terrible happened " + err.message);
    }
  };

  const handleSendMessage = async () => {
    setSendingMessage(true);
    console.log("SMS is meant to be sent");
    console.log(sendSms);
    try {
      let result = await fetch("https://asteric.herokuapp.com/vonageSms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(sendSms),
      });

      result = await result.json();
      if (result.message === "Invalid Token") {
        setLoading(false);
        handleCloseSmsTosSend();
        setInvalidToken(true);
        console.log(result.message);
      } else if (result.status === 200) {
        setSendingMessage(false);
        handleCloseSmsTosSend();
        addToast(result.message, { appearance: "success" });
      } else {
        handleCloseSmsTosSend();
        setSendingMessage(false);
        addToast(result.message, { appearance: "error" });
      }
    } catch (err) {
      console.log("Something terrible happened " + err.message);
    }
  };

  const handleSetTemplate = async () => {
    console.log(`Message ` + templateObjstate.message);
    settemplateObjstate({
      ...templateObjstate,
      message: draftToHtml(convertToRaw(editorStateEmpty.getCurrentContent())),
    });
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

  const columns = React.useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "firstname",
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns, data: allCustomers },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "name",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),

            Cell: ({ row }) => {
              return <Checkbox {...row.getToggleRowSelectedProps()} />;
            },
          },
          ...columns,
        ];
      });
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    pageOptions,
    selectedFlatRows,
  } = tableInstance;

  const page = rows.slice(0, 10);
  const { pageIndex } = state;

  const phoneNumberHandler = async () => {
    let promises = await selectedFlatRows.map((row) => row.original);
    Promise.all(promises).then(function (results) {
      setChipData(results);
      SMSProcessor(results);
    });
    handleCloseSmsNested();
    return null;
  };

  const handleDelete = async (chipToDelete) => {
    let newData = await chipData.filter(
      (chip) => chip.phone !== chipToDelete.phone
    );
    Promise.all(newData).then(function (results) {
      setChipData(results);
      SMSProcessor(results);
    });
  };

  const emailProcessor = async (param) => {
    let emails = await param.map((chip) => chip.email);
    Promise.all(emails).then((results) => {
      let mails = results.join(",");
      setSendEmail({ ...sendEmail, recieverAddress: mails });
      console.log(sendEmail);
    });
  };

  const SMSProcessor = async (param) => {
    let numbers = await param.map((chiparam) => chiparam.phone);
    Promise.all(numbers).then((results) => {
      let numbsToString = results.join(",");
      setSendSms({ ...sendSms, receiver: numbsToString });
      console.log(sendSms);
    });
  };

  const handleDeleteEmail = async (chipToDelete) => {
    let newDataEmail = await chipDataEmail.filter(
      (chip) => chip.email !== chipToDelete.email
    );
    Promise.all(newDataEmail).then((results) => {
      setChipDataEmail(results);
      emailProcessor(results);
    });
  };

  const [editorStateEmpty, setEditorStateEmpty] = useState(
    EditorState.createEmpty()
  );

  const onEditorStateChangeEmpty = (editorState) => {
    setEditorStateEmpty(editorState);
    settemplateObjstate({
      ...templateObjstate,
      message: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  };


  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false]}],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image','video','color','background'],
      ['clean']
    ]
   
  }


  /*
 * Custom toolbar component including the custom heart button and dropdowns
 */
// const CustomToolbar = () => (
//   <div id="toolbar">
//     <select className="ql-font">
//       <option value="arial" selected>
//         Arial
//       </option>
//       <option value="comic-sans">Comic Sans</option>
//       <option value="courier-new">Courier New</option>
//       <option value="georgia">Georgia</option>
//       <option value="helvetica">Helvetica</option>
//       <option value="lucida">Lucida</option>
//     </select>
//     <select className="ql-size">
//       <option value="extra-small">Size 1</option>
//       <option value="small">Size 2</option>
//       <option value="medium" selected>
//         Size 3
//       </option>
//       <option value="large">Size 4</option>
//     </select>
//     <select className="ql-align" />
//     <select className="ql-color" />
//     <select className="ql-background" />
//     <button className="ql-clean" />
//     <button className="ql-insertHeart">
     
//     </button>
//   </div>
// );

  // Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
];
Quill.register(Font, true);

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
                              <p
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleOpenEmailToSend(emailTemplate.message);
                                }}
                              >
                                {ReactHtmlParser(emailTemplate.message)}
                              </p>
                            

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
                              <p
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleOpenSMSToSend(smsTemplate.message)
                                }
                              >
                                {smsTemplate.message}
                              </p>
                             

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
                  <Box sx={style}>
                    <Box sx={{ ...style, width: 700 }}>
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Send this email
                      </Typography>

                      <Paper
                        sx={{
                          position: `relative`,
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          minHeight: 50,
                          listStyle: "none",
                          width: `100%`,
                          p: 0.5,
                          backgroundColor: `#f5f5f5`,
                          m: 0,
                        }}
                        component="ul"
                      >
                        {chipDataEmail.length > 0 ? (
                          chipDataEmail.map((data) => {
                            let icon;
                            return (
                              <ListItem key={data.id}>
                                <Chip
                                  icon={icon}
                                  label={data.email}
                                  onDelete={() => handleDeleteEmail(data)}
                                />
                              </ListItem>
                            );
                          })
                        ) : (
                          <p
                            style={{
                              textAlign: `center`,
                              width: `100%`,
                              marginTop: `5px`,
                            }}
                          >
                            Please Click the Icon to select users
                          </p>
                        )}

                        <img
                          style={{
                            cursor: `pointer`,
                            position: `absolute`,
                            top: 10,
                            right: 10,
                          }}
                          src="/images/contact.png"
                          alt="contact"
                          onClick={() => {
                            handleOpenEmailNested();
                            handleSelectCustomers();
                          }}
                        />
                      </Paper>

                      <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": { mt: 2, width: "50ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div>
                          <TextField
                            style={{
                              width: "100%",
                            }}
                            id="standard-error-helper-text"
                            label="Title"
                            onChange={(e) =>
                              setSendEmail({
                                ...sendEmail,
                                messageSubject: e.target.value,
                              })
                            }
                            defaultValue={sendEmail.messageSubject}
                            helperText="Please supply title"
                            variant="outlined"
                          />
 
                          <ReactQuill 
                            defaultValue={sendEmail.messageBody}
                            onChange={handleQuilChange}
                            modules={modules}
                            formats={formats}
                            
                          />
                        </div>
                      </Box>
                      <ReactBootStrap.Button
                        className="sendbtn"
                        variant="primary"
                        onClick={() => handleSendEmail()}
                        disabled={sendingMessage}
                      >
                        <ReactBootStrap.Spinner
                          as="span"
                          className={
                            sendingMessage ? "visible" : "visually-hidden"
                          }
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="visually">
                          {sendingMessage ? "Loading..." : "Send Email"}
                        </span>
                      </ReactBootStrap.Button>
                    </Box>

                    <Modal
                      hideBackdrop
                      open={openEmailNested}
                      onClose={handleCloseEmailNested}
                      aria-labelledby="child-modal-title"
                      aria-describedby="child-modal-description"
                    >
                      <Box>
                        <ShowUpEmailPro
                          allCustomers={allCustomers}
                          handleClose={handleCloseEmailNested}
                          loading={loading}
                          open={handleOpenEmailNested}
                          scheduleMessage={sendEmail}
                          setScheduleMessage={setSendEmail}
                          setChipDataEmail={setChipDataEmail}
                          setChipData={setChipData}
                          invalidToken={invalidToken}
                        />
                      </Box>
                    </Modal>
                  </Box>
                </Modal>

                <Modal
                  open={smsToSend}
                  onClose={handleCloseSmsTosSend}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box sx={{ ...style, width: 700 }}>
                    <h2 id="parent-modal-title">Send sms</h2>
                    <Paper
                      sx={{
                        position: `relative`,
                        display: `flex`,
                        paddingRight: 5,
                        flexWrap: "wrap",
                        listStyle: "none",
                        minHeight: 50,
                        backgroundColor: `#f5f5f5`,
                        width: `100%`,
                        p: 0.5,
                        m: 0,
                      }}
                      component="ul"
                    >
                      {chipData.length > 0 ? (
                        chipData.map((data) => {
                          let icon;

                          return (
                            <ListItem key={data.id}>
                              <Chip
                                icon={icon}
                                label={data.phone}
                                onDelete={() => handleDelete(data)}
                              />
                            </ListItem>
                          );
                        })
                      ) : (
                        <p
                          style={{
                            textAlign: `center`,
                            width: `100%`,
                            marginTop: `5px`,
                          }}
                        >
                          Please Click the Icon to select users
                        </p>
                      )}

                      <img
                        style={{
                          cursor: `pointer`,
                          position: `absolute`,
                          top: 10,
                          right: 10,
                        }}
                        src="/images/contact.png"
                        alt="contact"
                        onClick={() => {
                          handleOpenSmsNested();
                          handleSelectCustomers();
                        }}
                      />
                    </Paper>

                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { mt: 2, width: "50ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          style={{
                            width: "100%",
                          }}
                          id="outlined-multiline-static"
                          multiline
                          rows={4}
                          onChange={(e) =>
                            setSendSms({
                              ...sendSms,
                              message: e.target.value,
                            })
                          }
                          defaultValue={sendSms.message}
                        />
                      </div>
                    </Box>

                    <ReactBootStrap.Button
                      className="sendbtn"
                      variant="primary"
                      onClick={() => handleSendMessage()}
                      disabled={sendingMessage}
                    >
                      <ReactBootStrap.Spinner
                        as="span"
                        className={
                          sendingMessage ? "visible" : "visually-hidden"
                        }
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="visually">
                        {sendingMessage ? "Loading..." : "Send Message"}
                      </span>
                    </ReactBootStrap.Button>

                    <Modal
                      hideBackdrop
                      open={openSmsNested}
                      onClose={() => handleCloseSmsNested()}
                      aria-labelledby="child-modal-title"
                      aria-describedby="child-modal-description"
                    >
                      <Box sx={{ ...style, width: 700 }}>
                        <h3>Contact List</h3>
                        <div>
                          <table {...getTableProps()}>
                            <thead>
                              {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                  {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                      {column.render("Header")}
                                    </th>
                                  ))}
                                </tr>
                              ))}
                            </thead>
                            {/* Apply the table body props */}
                            <tbody {...getTableBodyProps()}>
                              {page.map((row) => {
                                prepareRow(row);
                                return (
                                  <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                      return (
                                        <td {...cell.getCellProps()}>
                                          {cell.render("Cell")}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>

                          <div
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              disabled={!canNextPage}
                              onClick={() => previousPage()}
                              variant="contained"
                            >
                              Previous page
                            </Button>

                            <span>
                              Page{" "}
                              <strong>
                                {pageIndex + 1} of {pageOptions.length}
                              </strong>
                            </span>
                            <Button
                              disabled={!canPreviousPage}
                              onClick={() => nextPage()}
                              variant="contained"
                            >
                              Next Page
                            </Button>
                          </div>

                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              marginTop: "10px",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              variant="contained"
                              onClick={() => phoneNumberHandler()}
                            >
                              CONFIRM SELECTION
                            </Button>
                          </div>
                        </div>
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
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "832px",
                          }}
                        >
                          <TextEditor
                            editorState={editorStateEmpty}
                            onEditorStateChange={onEditorStateChangeEmpty}
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
                            style={{ width: 330 }}
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
