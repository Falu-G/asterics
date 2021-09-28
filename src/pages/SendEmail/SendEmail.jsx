import React, { useState, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import "./sendemail.css";
import { MenuContext } from "../../components/MenuContext";
import Menus from "../../components/menu/Menu";
import White from "../../components/whitenav/White";
import EmailObject from "../../classes/EmailObject";
import * as ReactBootStrap from "react-bootstrap";
import SessionExpired from "../SessionExpired/SessionExpired";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
// import { DataGrid } from "@material-ui/data-grid";
import { DataGrid} from '@mui/x-data-grid';

const style = {
  position: "absolute",
  width: 700,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SendEmail() {
  const { sidebar, setSideBar } = useContext(MenuContext);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [emailContent, setEmailContent] = useState(new EmailObject("", "", ""));
  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;
  const showSideBar = () => setSideBar(!sidebar);
  const { addToast } = useToasts();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
  const [select, setSelection] = useState([]);
  //const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const handleSelectCustomers = async () => {
    handleOpen();
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
        console.log("Numbers of customers " + allCustomers.length);
      }
    } catch (e) {
      setLoading(false);
      console.log("Error In catch " + e.message);
    }
  };
  const handleSend = async (e) => {
    e.preventDefault();
    setSendingMessage(true);
    try {
      let result = await fetch("https://asteric.herokuapp.com/mails/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(emailContent),
      });

      result = await result.json();
      if (result.status === 200) {
        console.log(result.message);
        setSendingMessage(false);
        addToast("Saved Successfully", { appearance: "success" });
      } else {
        console.log(result.message);
        setSendingMessage(false);
        addToast(result.message, { appearance: "success" });
      }
    } catch (err) {
      console.log("Something terrible happened " + err.message);
    }
  };

  const dataVertical = [
    {
      field: "firstname",
      headerName: "Full Name",
      sortable: false,
      width: 260,
      renderCell: ({ row }) => {
        return (
          <div style = {{
           
            display: 'flex',
            alignItems: 'center',
         
            width: '100%',
          
          }}>
            {row.firstname + " " + row.lastname}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 300,

      renderCell: ({ row }) => (
        <>
          <div>{row.email}</div>
        </>
      ),
    },
  ];

  return (
    <>
      {invalidToken ? (
        <SessionExpired />
      ) : (
        <>
          <div className="maindashboardContainer">
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
              <White title="Send Email" />
              {console.log(select.length)}
              <div
                style={{
                  backgroundImage: `url(/images/smsbg.png)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center right",
                }}
                className="SendEmailWrapper"
              >
                <div>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <Typography
                          id="transition-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Contact List
                        </Typography>
                        {loading ? (
                          <>
                            <Skeleton
                              variant="rectangular"
                              width={`100%`}
                              height={50}
                            />
                            <Skeleton variant="text" height={50} />
                            <Skeleton variant="text" height={50} />
                            <Skeleton variant="text" height={50} />
                            <Skeleton variant="text" height={50} />
                            <Skeleton variant="text" height={50} />
                          </>
                        ) : (
                          <>
                            <div
                              style={{
                                height: 400,
                                width: "100%",
                              }}
                            >
                              <DataGrid
                                rows={allCustomers}
                                columns={dataVertical}
                                pageSize={5}
                                checkboxSelection
                                onSelectionChange={(newSelection) => {
                                  console.log(newSelection.rows);
                                  setSelection(newSelection.rows);

                                  console.log("Changing things");
                                }}
                              />
                            </div>
                          </>
                        )}
                      </Box>
                    </Fade>
                  </Modal>
                </div>

                <div>
                  {/* <FormRadio 
              value={value} 
              handleChange={handleChange}
              handleScheduleTime = {handleScheduleTime} /> */}

                  <form className="scheduleform">
                    <div className="inputIcon">
                      <input
                        className="phone"
                        type="email"
                        name="email"
                        value={emailContent.recieverAddress}
                        onChange={(e) =>
                          setEmailContent({
                            ...emailContent,
                            recieverAddress: e.target.value,
                          })
                        }
                        placeholder="Add Email"
                      />
                      <img
                      style = {{
                        cursor:`pointer`
                      }}
                        src="/images/contact.png"
                        alt="contact"
                        onClick={handleSelectCustomers}
                      />
                    </div>

                    <input
                      className="phone"
                      type="title"
                      name="title"
                      value={emailContent.messageSubject}
                      onChange={(e) =>
                        setEmailContent({
                          ...emailContent,
                          messageSubject: e.target.value,
                        })
                      }
                      placeholder="Message Title"
                    />
                    <textArea
                      type="text"
                      name="message"
                      value={emailContent.messageBody}
                      onChange={(e) =>
                        setEmailContent({
                          ...emailContent,
                          messageBody: e.target.value,
                        })
                      }
                      placeholder="Messages..."
                    />
                  </form>

                  {/* <button
                className="sendbtn"
                onClick={handleSend}
                disabled={sendingMessage}
              >
                Send
              </button> */}

                  <ReactBootStrap.Button
                    className="sendEmailbtn"
                    variant="primary"
                    onClick={handleSend}
                    disabled={sendingMessage}
                  >
                    <ReactBootStrap.Spinner
                      as="span"
                      className={sendingMessage ? "visible" : "visually-hidden"}
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually">
                      {sendingMessage ? "Loading..." : "Send"}
                    </span>
                  </ReactBootStrap.Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
    // <div className="sendEmailContainer">

    //     {/* <NavigationComponent title="Send Email" />

    //     <div style={{
    //         backgroundImage: `url(/images/smsbg.png)`
    //         , backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
    //         backgroundPosition: 'center right'
    //     }} className="SendEmailWrapper">

    //         <div>
    //             <FormRadio value={value} handleChange={handleChange} />

    //             <form className="scheduleform">
    //                 <div className="inputIcon">
    //                 <input className="phone" type="email" name="username" placeholder="Add Email" />
    //                 <img src = "/images/contact.png" alt="contact" />
    //                 </div>

    //                 <textArea type="text" name="message" placeholder="Messages..." />
    //             </form>

    //             <button className="sendbtn">Send</button>

    //         </div>

    //     </div> */}
    // </div>
  );
}

export default SendEmail;
