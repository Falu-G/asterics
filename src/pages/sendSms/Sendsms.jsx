import React, { useState, useContext } from "react";
import { MenuContext } from "../../components/MenuContext";
import { useToasts } from "react-toast-notifications";
import "./sendsms.css";
import SessionExpired from "../SessionExpired/SessionExpired";
//import Modal from "react-modal";
//import FormRadio from "../../components/formRadio/FormRadio";
import Menus from "../../components/menu/Menu";
import White from "../../components/whitenav/White";
import * as ReactBootStrap from "react-bootstrap";
import { DataGrid } from "@material-ui/data-grid";
import Skeleton from "@mui/material/Skeleton";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

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

function Sendsms() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [select, setSelection] = useState([]);

  const dataVertical = [
    {
      field: "firstname",
      headerName: "Full Name",
      sortable: false,
      width: 260,
      renderCell: ({ row }) => {
        return (
          <div>
            <p>{row.firstname + " " + row.lastname}</p>
          </div>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone Number",
      sortable: false,
      width: 300,

      renderCell: ({ row }) => (
        <>
          <div>{`+${row.phone}`}</div>
        </>
      ),
    },
  ];
  const customersList = [];
  const [allCustomers, setAllCustomers] = useState(customersList);
  const { addToast } = useToasts();
  const { sidebar, setSideBar } = useContext(MenuContext);
  const [invalidToken, setInvalidToken] = useState(false);
  console.log("This is siderbar " + sidebar);
  const showSideBar = () => {
    setSideBar(!sidebar);
  };

  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  // const [messageReport, setMessageReport] = useState("");



  const [sendMessage, setSendMessage] = useState({
    numbers: "",
    message: "",
  });

  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;

  const handleSelectCustomers = async () => {
    handleOpen()
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setSendingMessage(true);
    console.log(sendMessage);
    console.log(token);

    try {
      let result = await fetch("https://asteric.herokuapp.com/bbnSms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(sendMessage),
      });

      result = await result.json();
      if (result.message === "Invalid Token") {
        setLoading(false);
        setInvalidToken(true);
        console.log(result.message);
      } else if (result.status === 200) {
        // setMessageReport(result.message);
        setSendingMessage(false);
        addToast("Saved Successfully", { appearance: "success" });
      } else {
        // setMessageReport(result.message);
        setSendingMessage(false);
        addToast(result.message, { appearance: "error" });
      }
    } catch (err) {
      console.log("Something terrible happened " + err.message);
    }
  };

  return (
    <>
      {invalidToken ? (
        <>
          <SessionExpired />
        </>
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
              <White title="Send Sms" />

              <div
                style={{
                  backgroundImage: `url(/images/smsbg.png)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center right",
                }}
                className="ScheduleWrapper"
              >
                {console.log("The number of numbers clicked " + select.length)}
                {/* <p>{messageReport}</p> */}
                <div>
                  <form className="scheduleform">
                    <div className="inputIcon">
                      <input
                        className="phone"
                        type="phonenumber"
                        name="username"
                        placeholder="Phone Number"
                        value={sendMessage.phoneNumber}
                        onChange={(e) =>
                          setSendMessage({
                            ...sendMessage,
                            numbers: e.target.value,
                          })
                        }
                      />
                      <img
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
                  </form>

                  {/* <button className="sendbtn" onClick={handleSendMessage}>
                Send
              </button> */}

                  <ReactBootStrap.Button
                    className="sendbtn"
                    variant="primary"
                    onClick={handleSendMessage}
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

                  {/* <Modal
                    isOpen={openModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <div className="modalContainer">
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

                      <button
                        onClick={() =>
                          setOpenModal(() => (openModal ? false : true))
                        }
                      >
                        Close
                      </button>
                    </div>
                  </Modal> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Sendsms;
