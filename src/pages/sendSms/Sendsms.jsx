import React, { useState } from "react";
import "./sendsms.css";
import Modal from "react-modal";
import FormRadio from "../../components/formRadio/FormRadio";
import Dashnav from "../../components/dashnav/Dashnav";
import Menus from "../../components/menu/Menu";
import White from "../../components/whitenav/White";

function Sendsms() {
  const [sidebar, setSideBar] = useState(false);
  const showSideBar = () => setSideBar(!sidebar);
  let subtitle;
  const [value, setValue] = React.useState("Yes");

  const [openModal, setOpenModal] = useState(false);

  const customStyles = {
    content: {
      width: "80%",
      height: "60%",
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
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;

  const handleSendMessage = async (e) => {
    e.preventDefault();
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
        console.log(result.message);
      } else {
        console.log(result.message);
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
            <div>
              <FormRadio value={value} handleChange={handleChange} />

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

              <button className="sendbtn" onClick={handleSendMessage}>
                Send
              </button>
            </div>

            <div>
              <Modal
                isOpen={openModal}
                style={customStyles}
                onAfterOpen={afterOpenModal}
                contentLabel="Example Modal"
              >
                <div className="modalContainer">
                  <Dashnav title="SMS Template" />

                  <form className="modalInput">
                    <div className="modalFirstInput">
                      <div className="mf_input">
                        <input
                          type="text"
                          name="username"
                          placeholder="Title"
                        />
                      </div>
                      <div className="ms_input">
                        <FormRadio value={value} handleChange={handleChange} />
                      </div>
                    </div>
                    <p>Second</p>
                    <p>Modal</p>
                    <button
                      onClick={() =>
                        setOpenModal(() => (openModal ? false : true))
                      }
                    >
                      Close
                    </button>
                  </form>
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
