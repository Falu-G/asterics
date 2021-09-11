import React, { useState } from "react";
import Dashnav from "../dashnav/Dashnav";
//import Dropdown from '../Dropdown/Dropdown'
//import FormRadio from "../formRadio/FormRadio";
import "./newSchedule.css";
import CloseIcon from "@material-ui/icons/Close";
import { useToasts } from "react-toast-notifications";
import ScheduleEmail from "../../classes/ScheduleEmail";
import * as ReactBootStrap from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";


function NewSchedule({ setOpenModal, hideOption }) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));


  const [isActive, setIsActive] = useState(false);

  const [messageType, setMessageType] = useState("Select Message Type");
  const [scheduledTimeToSend, setscheduledTimeToSend] = useState("");

  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;
  const { addToast } = useToasts();
  // const handleSchedule = function () {
  //   console.log("handleSchedule");
  // }

  // const handleSchedule = (event) => {
  //   setscheduledTimeToSend(event.target.value);
  // };

  // const [scheduleMessage, setscheduleMesssage] = useState(
  //   new ScheduleEmail([], "", "", "")
  // );
  const [sendingMessage, setSendingMessage] = useState(false);
  const options = ["SMS", "Email"];

  const handleSend = async (e) => {
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
          top: 0,
          right: 10,
        }}
        onClick={setOpenModal}
      />
      <Dashnav title="New Schedule" />


{console.log(scheduledTimeToSend)}
      <div className="ns-Scheduler">
        <div class="dropdown">
          <button class="dropbtn">{messageType}</button>
          <div class="dropdown-content">
            {options.map((option, index) => (
              <>
                <h3
                  onClick={() => {
                    setMessageType(option);
                    setIsActive(!isActive);
                  }}
                >
                  {option}
                </h3>
              </>
            ))}
          </div>
        </div>

        {/*<Dropdown setIsActiv = {()=> setIsActive(!isActive)}/>*/}
        <div>
          <TextField
            id="datetime-local"
            label="Schedule Time"
            type="datetime-local"
            onChange={(event) => setscheduledTimeToSend(event.target.value)}
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
            type="phone"
            name="phone"
            placeholder={
              messageType === "SMS" || messageType === "Email"
                ? "PhoneNumber"
                : "Phone Number or Email"
            }
          />
          <textArea type="messages" name="name" />

          <div style={{ width: "100%" }}>
            {/* <button
              type="submit"
              name="Schedule"
              className={
                messageType === "SMS" || messageType === "Email"
                  ? "ns-scheduler-submit ns-Enabled"
                  : "ns-scheduler-submit"
              }
            >
              Schedule
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
                {messageType ? "Schedule" : "Send"}
              </span>
            </ReactBootStrap.Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewSchedule;
