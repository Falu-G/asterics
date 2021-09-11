import React, { useState, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import "./sendemail.css";
//import Modal from "react-modal";
import { MenuContext } from "../../components/MenuContext";
//import FormRadio from "../../components/formRadio/FormRadio";
//import Dashnav from "../../components/dashnav/Dashnav";
import Menus from "../../components/menu/Menu";
import White from "../../components/whitenav/White";
import EmailObject from "../../classes/EmailObject";
import * as ReactBootStrap from "react-bootstrap";



function SendEmail() {

  const { sidebar, setSideBar } = useContext(MenuContext);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [emailContent, setEmailContent] = useState(new EmailObject("", "", ""));
  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;
  const showSideBar = () => setSideBar(!sidebar);
  const { addToast } = useToasts();


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
          <White title="Send Email" />

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
                  <img src="/images/contact.png" alt="contact" />
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
          </div>
        </div>
      </div>
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
