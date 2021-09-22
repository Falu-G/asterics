import React, { useState} from "react";
import Dashnav from "../dashnav/Dashnav";
//import Dropdown from '../Dropdown/Dropdown'
//import FormRadio from "../formRadio/FormRadio";
import "./newSchedule.css";
import CloseIcon from "@material-ui/icons/Close";
import { useToasts } from "react-toast-notifications";
import ScheduleEmail from "../../classes/ScheduleEmail";
import * as ReactBootStrap from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";

function NewSchedule({ setOpenModal, hideOption }) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;

  let schedule = new ScheduleEmail();

  const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft:1,
      marginRight: 1,
      width: 200,
    },
  }));

  const [scheduleMessage, setScheduleMessage] = useState(schedule);
  const [messageType, setMessageType] = useState("SMS");

  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;
  const { addToast } = useToasts();
  const [sendingMessage, setSendingMessage] = useState(false);
  //const options = ["SMS", "Email"];

  const handleSend = async () => {
    try {
      let result = await fetch("https://asteric.herokuapp.com/mails/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(new ScheduleEmail()),
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

  const classes = useStyles();
  return (
    <div className="ns-Container">
      <CloseIcon
        style={{
          position: "absolute",
          top: 5,
          cursor: "pointer",
          color: "white",
          right: 10,
        }}
        onClick={setOpenModal}
      />
      <Dashnav title="New Schedule" />

      {console.log(schedule.schedule_date)}
      <div className="ns-Scheduler">
        <div className="ns-Scheduler-container">
          <span>Select Message Type</span>
          <div className="ns-messagetab">
            <button
              className={messageType === "SMS" ? "ns-active" : null}
              onClick={() => setMessageType("SMS")}
            >
              SMS
            </button>
            <button
            style={{marginLeft: "10px"}}
              className={messageType === "Email" ? "ns-active" : null}
              onClick={() => setMessageType("Email")}
            >
              Email
            </button>
          </div>
        </div>
        <div>
          <TextField
            id="datetime-local"
            label="Schedule Time"
            type="datetime-local"
            onChange={(event) =>
              setScheduleMessage({
                ...scheduleMessage,
                schedule_date: event.target.value,
              })
            }
            defaultValue={`${today}T00:00`}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>

      <form className="ns-Scheduler-input">
        <div className="ns-Scheduler-house">
          <input
            type={messageType === "SMS" ? "text" : "email"}
            name={messageType === "SMS" ? "sms" : "email"}
            placeholder={messageType === "SMS" ? "PhoneNumber" : "Enter Email"}
          />

          <input
            type="text"
            name="title"
            placeholder={"Title of the message"}
          />
          <textArea
            type="messages"
            name="name"
            onChange={(event) =>
              setScheduleMessage({
                ...scheduleMessage,
                messageBody: event.target.value,
              })
            }
          />

          <div style={{ width: "100%" }}>
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
                {messageType === "SMS" ? "Schedule SMS" : "Schedule Email"}
              </span>
            </ReactBootStrap.Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewSchedule;
