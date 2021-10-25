import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import Dashnav from "../dashnav/Dashnav";
import SessionExpired from "../../pages/SessionExpired/SessionExpired";
import NavigationComponent from "../navigationComponent/NavigationComponent";
import * as ReactBootStrap from "react-bootstrap";
import "./dashboard.css";
import CountUp from "react-countup";

function Dashboard() {
  let today = new Date();
  let month = today.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let days = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  today = today.getFullYear() + "-" + month + "-" + days;
  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);

  const timeref = useRef(0)

  const [sentEmailValue, setSentEmailValue] = useState(0);
  const [emailQueue, setEmailQueue] = useState([]);
  const [totalSms, setTotalSms] = useState([]);
  const [tokenValid, setTokenValid] = useState(false);
  const token = userObj.message[0].token;
  const [loading, setLoading] = useState(true);


  const setTime = ()=> (setInterval(function() {
  let date = new Date();
  timeref.value = date.toLocaleTimeString(); //Method
}, 1000));
  
  const fetchBusiness = useCallback( () => {


    Promise.all([
      fetch("https://asteric.herokuapp.com/mails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }),
      fetch("https://asteric.herokuapp.com/vonageSms/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }),
    ])
      .then(([items, contactlist]) => {
        return Promise.all([items.json(), contactlist.json()]);
      })
      .then(([data, contactlist]) => {


        if (data.message === "Invalid Token") {
          setTokenValid(true);
        } else {
          // setEmailTemplates(data.filter((element) => element.messageCategory === "Email"));
          // setSmsTemplates(data.filter((element) => element.messageCategory === "SMS"));
          setEmailQueue(data.filter((item) => item.status === "scheduled"));
          setSentEmailValue(data.filter((item) => item.status === "sent"));
          setTotalSms(contactlist)
          setLoading(false);
        } // console.log("This is the data " + data.length);
        // setSmsQueue(contactlist);
        // console.log(contactlist);
      })
      .catch((err) => {
        console.log("This is the error that was caught" + err);
        setLoading(false);
      });

  }, [token]);

  useEffect(() => {
    fetchBusiness();
  }, [fetchBusiness]);

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
      {tokenValid ? (
        <>
          <SessionExpired />
        </>
      ) : (
        <>
          {loading ? (
            <>
              <ReactBootStrap.Spinner
                animation="border"
                role="status"
                style={{
                  position: "absolute",
                  color: `#18A0FB`,
                  top: "50%",
                  left: "50%",
                }}
              />
            </>
          ) : (
            <>
              <div className="dashboardContainerWrapper">
                {setTime}
                <div className="dateAndTime">
                  <h4>
                    Date:<span>{today}</span>
                  </h4>
                  <p>
                    Time:<span ref = {timeref}/>
                  </p>
                </div>

                <div className="dashboardViewReport">
                  <div className="box box1 card">
                    <div className="outboundemails">
                      <h4>Total Outbound emails</h4>
                      <CountUp start={0} end={`${emailQueue.length + sentEmailValue.length}`} delay={0} duration={2.75}>
                        {({ countUpRef }) => (
                          <div>
                            <span ref={countUpRef} />
                          </div>
                        )}
                      </CountUp>
                    </div>

                    <div className="outboundsms">
                      <h4>Total Outbound sms</h4>

                      <h1>{totalSms.length}</h1>
                    </div>

                    <div className="schedulemessages">
                      <h4>Scheduled Messages</h4>
                      <h1>{emailQueue.length}</h1>
                    </div>
                  </div>
                  <div className="box box2 card">
                    <h4>Scheduled Messages</h4>
                    <h1>{emailQueue.length}</h1>
                  </div>
                  <div className="box box3 card">
                    <h4>Succesful Messages</h4>
                    <h1>{sentEmailValue.length}</h1>
                  </div>
                  <div className="box box4 card">
                    <Link
                      to="/customer"
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
                      <Link to="/schedule" className="centralImg">
                        <img
                          src="/images/seccalendar.png"
                          alt="sms scheduler"
                        />
                      </Link>
                    </div>
                    <div className="boardSmsTemplates card">
                      <Dashnav title="SMS Template" />
                      <Link to="/templates" className="centralImg">
                        <img src="/images/emai.png" alt="email" />
                      </Link>
                    </div>
                  </div>
                  <div className="box box6 ">
                    <div className="boxsone card">
                      <Dashnav title="Send Email" />
                      <Link to="/sendemail" className="centralImg">
                        <img src="/images/emai.png" alt="email" />
                      </Link>
                    </div>

                    <div className="boxtwo card">
                      <Dashnav title="Send SMS" />
                      <Link to="/sendsms" className="centralImg">
                        <img src="/images/emalen.png" alt="email env" />
                      </Link>
                    </div>
                  </div>

                  <div className="box box7 card">
                    <Dashnav title="Check balance" />
                    <Link className="centralImg">
                      <img src="/images/calc.png" alt="calculator" />{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
