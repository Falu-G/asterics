import React, { useState, useContext } from "react";
import { MenuContext } from "../../components/MenuContext";
import { useToasts } from 'react-toast-notifications';
import "./sendsms.css";
import Modal from "react-modal";
//import FormRadio from "../../components/formRadio/FormRadio";
import Menus from "../../components/menu/Menu";
import White from "../../components/whitenav/White";
import * as ReactBootStrap from "react-bootstrap";

function Sendsms() {
  const { addToast } = useToasts();
  const {sidebar,setSideBar} = useContext(MenuContext);
  console.log("This is siderbar "+sidebar);
  const showSideBar = () => {
    setSideBar(!sidebar);
    
  };
  //const [value, setValue] = React.useState("Yes");

  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageReport, setMessageReport] = useState("")

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
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  

  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setSendingMessage(true);
    console.log(sendMessage);
    console.log(token)

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
      if (result.status === 200) {
        setMessageReport(result.message)
        setSendingMessage(false);
        addToast('Saved Successfully', { appearance: 'success' });
       

      } else {
       setMessageReport(result.message)
       setSendingMessage(false);
       addToast(result.message, { appearance: 'error' });
      }
    } catch (err) {
      console.log("Something terrible happened " + err.message);
    }
  };

  return (
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

            <p>{messageReport}</p>
            <div>


              {/* <FormRadio value={value} handleChange={handleChange} /> */}

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
                    onClick={() =>
                      setOpenModal(() => (openModal ? false : true))
                    }
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
              disabled = {sendingMessage}>
                <ReactBootStrap.Spinner
                  as="span"
                  className={sendingMessage ? "visible" : "visually-hidden"}
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually">{sendingMessage ? "Loading..." : "Send"}</span>
              </ReactBootStrap.Button>


            </div>

            <div>
              <Modal
                isOpen={openModal}
                style={customStyles}
               
                contentLabel="Example Modal"
              >
                <div className="modalContainer">
                 
                    <p>Receiver</p>
                  
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
     
    </>
  );
}

export default Sendsms;
