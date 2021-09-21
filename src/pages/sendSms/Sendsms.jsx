import React, { useState, useContext } from "react";
import { MenuContext } from "../../components/MenuContext";
import { useToasts } from "react-toast-notifications";
import "./sendsms.css";
import SessionExpired from '../SessionExpired/SessionExpired'
import Modal from "react-modal";
//import FormRadio from "../../components/formRadio/FormRadio";
import Menus from "../../components/menu/Menu";
import White from "../../components/whitenav/White";
import * as ReactBootStrap from "react-bootstrap";
import { DataGrid } from "@material-ui/data-grid";

function Sendsms() {
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

      renderCell: ({row})=> <>
      <div>{`+${row.phone}`}</div>
      </>

      
    },
  ];
  const customersList = [];
  const [allCustomers, setAllCustomers] = useState(customersList);
  const { addToast } = useToasts();
  const { sidebar, setSideBar } = useContext(MenuContext);
  const [invalidToken, setInvalidToken] = useState(false)
  console.log("This is siderbar " + sidebar);
  const showSideBar = () => {
    setSideBar(!sidebar);
  };

  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  // const [messageReport, setMessageReport] = useState("");
  

  const [openModal, setOpenModal] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      padding: "0",
      transform: "translate(-50%, -50%)",
    },
  };

  const [sendMessage, setSendMessage] = useState({
    numbers: "",
    message: "",
  });

  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;



  const handleSelectCustomers = async () => {
    setOpenModal(() => (openModal ? false : true));
    setLoading(true);
    try {
      let result = await fetch(
        "https://asteric.herokuapp.com/customer",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      result = await result.json();
      console.log("You clicked contact");
      console.log("This os kiknjm " + result);
      if (result.message === "Invalid Token") {
        setLoading(false);
        setInvalidToken(true);
        console.log(result.message);
      } else {
        setAllCustomers(result);
        setLoading(false);
        console.log(
          "Numbers of customers " + allCustomers.length
        );
      }
    } catch (e) {
      setLoading(false);
      console.log("Error In catch " + e.message);
    }
  }

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
      }else if (result.status === 200) {
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
    {invalidToken ? <>
    
    <SessionExpired />
    </> : <>
    
    
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
            {console.log("The number of numbers clicked "+select.length)}
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
                    setSendMessage({ ...sendMessage, message: e.target.value })
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
                isOpen={openModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div className="modalContainer">
                  {loading ? (
                    <>
                      <span>This is loading</span>

                      <ReactBootStrap.Spinner
                        as="span"
                        className="spinning"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
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
                            console.log(newSelection.rows)
                            setSelection(newSelection.rows);
                          
                            console.log("Changing things")
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
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>}
    
    </>
  );
}

export default Sendsms;
