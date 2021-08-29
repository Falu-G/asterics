import React from "react";
import { Link } from "react-router-dom";
import Dashnav from "../dashnav/Dashnav";
import NavigationComponent from "../navigationComponent/NavigationComponent";
import "./dashboard.css";
function Dashboard() {
  let today = new Date();
  let month = today.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let days = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

  today = today.getFullYear() + "-" + month + "-" + days;
  return (
    <div
      style={{
        backgroundImage: `url(/images/smsbg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center right",
      }}
      className="dashboardContainer"
    >
      <NavigationComponent title="Main Dashboard" />
      <div className="dashboardContainerWrapper">
        <div className="dateAndTime">
          <h4>
            Date:<span>{today}</span>
          </h4>
          <p>
            Time:<span>9:00AM</span>
          </p>
        </div>

        <div className="dashboardViewReport">
          <div className="box box1 card">
            <div className="outboundemails">
              <h4>Total outboundemails</h4>

              <h1>2</h1>
            </div>

            <div className="outboundsms">
              <h4>Total outboundsms</h4>

              <h1>5</h1>
            </div>

            <div className="schedulemessages">
              <h4>ScheduledMesages</h4>

              <h1>2</h1>
            </div>
          </div>
          <div className="box box2 card">
            <h4>Pending Messages</h4>
            <h1>350</h1>
          </div>
          <div className="box box3 card">
            <h4>Succesful Messages</h4>
            <h1>500</h1>
          </div>
          <div className="box box4 card">
            <Link
              to="/addcustomer"
              style={{
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <span>Create Customer</span>
            </Link>
          </div>
          <div className="box box5 ">
            <div className="boardScheduler card">
              <Dashnav title="SMS Scheduler" />
              <div className="centralImg">
                <img src="/images/seccalendar.png" alt="sms scheduler" />
              </div>
            </div>
            <div className="boardSmsTemplates card">
              <Dashnav title="SMS Template" />
              <Link to="/smstemplates"></Link>
            </div>
          </div>
          <div className="box box6 ">
            <div className="boxsone card">
              <Dashnav title="Send Email" />
              <Link to="/sendemail">
                <div className="centralImg">
                  {" "}
                  <img src="/images/emai.png" alt="email" />
                </div>
              </Link>
            </div>

            <div className="boxtwo card">
              <Dashnav title="Send SMS" />
              <Link to="/sendsms">
                <div className="centralImg">
                  {" "}
                  <img src="/images/emalen.png" alt="email env" />
                </div>
              </Link>
            </div>
          </div>

          <div className="box box7 card">
            <Dashnav title="Check balance" />
            <Link>
              <div className="centralImg">
                <img src="/images/calc.png" alt="calculator" />{" "}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
