import React, { useState } from "react";
import Dashnav from "../dashnav/Dashnav";
//import Dropdown from '../Dropdown/Dropdown'
import FormRadio from "../formRadio/FormRadio";
import "./newSchedule.css";
import CloseIcon from "@material-ui/icons/Close";

function NewSchedule({ setOpenModal }) {
  const [isActive, setIsActive] = useState(false);

  const [messageType, setMessageType] = useState("Select Message Type");


  // const handleSchedule = function () {
  //   console.log("handleSchedule");
  // }

  const options = ["SMS", "Email"];
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
        <FormRadio />
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
            <button
              type="submit"
              name="Schedule"
              className={
                messageType === "SMS" || messageType === "Email"
                  ? "ns-scheduler-submit ns-Enabled"
                  : "ns-scheduler-submit"
              }
            >Schedule</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewSchedule;
