import React, { useState, useContext, useCallback, useEffect } from "react";
import "./monthlyschedule.css";
import { MenuContext } from "../../components/MenuContext";
import Menus from "../../components/menu/Menu";
import NavigationComponent from "../../components/navigationComponent/NavigationComponent";
import Dashnav from "../../components/dashnav/Dashnav";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import Modal from "react-modal";
import NewSchedule from "../../components/newSchedule/NewSchedule";
import Dropdown from "../../components/Dropdown/Dropdown";
import { CalendarToday } from "@material-ui/icons";
import SessionExpired from "../SessionExpired/SessionExpired";
import * as ReactBootStrap from "react-bootstrap";
import { ToastProvider } from "react-toast-notifications";
import dateFormat from "dateformat";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

function Monthlyschedule() {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(0),
        backgroundColor: '#18A0FB'
      
      },
    },
  }));

  const classes = useStyles();
  let today = new Date();
  let month = today.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let days = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

  today = today.getFullYear() + "-" + month + "-" + days;

  console.log(today);

  const [emailQueue, setEmailQueue] = useState([]);
  // const [messageQueue, setMessageQueue] = useState([]);
  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;
  const [tokenValid, setTokenValid] = useState(false);

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const customStyles = {
    content: {
      width: "80%",
      height: "80%",
      top: "50%",
      left: "50%",
      padding: "0",
      overflow: "hidden",
      transform: "translate(-50%, -50%)",
    },
  };

  const fetchBusiness = useCallback(async () => {
    fetch("https://asteric.herokuapp.com/mails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Invalid Token") {
          setTokenValid(true);
        } else {
          setEmailQueue(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("This is the error that was caught" + err);
        setLoading(false);
      });
  }, [token]);

  const dataHorizontal = [
    {
      id: 1,
      dateSchedule: "12-Aug-2021",
      MessageContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
      status: "Pending",
    },
    {
      id: 2,
      dateSchedule: "12-Aug-2021",
      MessageContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
      status: "Pending",
    },
    {
      id: 3,
      dateSchedule: "12-Aug-2021",
      MessageContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
      status: "Pending",
    },
    {
      id: 4,
      dateSchedule: "12-Aug-2021",
      MessageContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
      status: "Pending",
    },
    {
      id: 5,
      dateSchedule: "12-Aug-2021",
      MessageContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
      status: "Pending",
    },
  ];
  const { sidebar, setSideBar } = useContext(MenuContext);
  console.log("I am on monthly " + sidebar);
  const [dataRow, setDataRow] = useState(dataHorizontal);

  const handledelete = (id) =>
    setDataRow(() => dataRow.filter((item) => item.id !== id));
  const showSideBar = () => setSideBar(!sidebar);

  const listOfTasks = ["Monthly Schedule", "Weekly Schedule", "Daily Schedule"];

  const dataVertical = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "messageDate",
      headerName: "Date Schedule",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: ({ row }) => {
        let date = dateFormat(row.messageDate, "mmmm dS, yyyy");
        console.log(row.messageDate);
        return <div>{date}</div>;
      },
    },
    {
      field: "messageBody",
      headerName: "Message Content",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 500,
      renderCell: () => {},
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: ({ row }) => {
        <div className="CentralizeCell">{row.status}</div>;
      },
    },

    {
      field: "",
      headerName: "",
      width: 160,
      renderCell: ({ row }) => (
        <>
          <div className="userdelete">
            <DeleteOutline
              style={{
                marginLeft: 20,
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => handledelete(row.id)}
            />
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchBusiness();
  }, [fetchBusiness]);

  return (
    <div className="monthlyscheduleConatiner">
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
        <div
          style={{
            backgroundImage: `url(/images/smsbg.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center right",
          }}
          className="dashboardContainer"
        >
          <NavigationComponent title="Dashboard" />

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
                  <div className="scheduleDashboard">
                    <Modal isOpen={openModal} style={customStyles}>
                      <ToastProvider>
                        <NewSchedule
                          setOpenModal={() =>
                            setOpenModal(() => (openModal ? false : true))
                          }
                        />
                      </ToastProvider>
                    </Modal>

                    <div className="reportTask">
                      <div className="ScheduleReports">
                        <div className="generalbox">
                          <div className="headerboxBlue">
                            <div className="headerboxBlueInner">
                              <CalendarToday />
                              <span>Monthly Schedule</span>
                            </div>

                            <span className="headerboxBluedate">{today}</span>
                          </div>
                          <div className="headerboxContainer">
                            <div className="headerboxone">
                              <span>Scheduled Messages</span>
                              <h3>400</h3>
                            </div>
                            <div className="headerboxtwo">
                              <span>Pending Messages</span>
                              <h3>350</h3>
                            </div>
                            <div className="headerboxthree">
                              <span>Successful Messages</span>
                              <h3>50</h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="TaskSchedule">
                        <Dropdown tasks={listOfTasks} />

                        {/* <h6
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            setOpenModal(() => (openModal ? false : true))
                          }
                        >
                          New Schedule
                        </h6> */}

                        <Button
                        
                        className = {classes.root}
                       
                        
                          variant="contained"
                          onClick={() =>
                            setOpenModal(() => (openModal ? false : true))
                          }
                        >New Schedule
                        </Button>
                      </div>
                    </div>
                    <div style={{ marginTop: 25 }}>
                      <h3>MessagesQueue</h3>
                      <div className="messagesQueueTable card">
                        <Dashnav />
                      </div>
                    </div>

                    <div className="Emailqueue">
                      <h3>Email queue</h3>
                      <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                          rows={emailQueue}
                          columns={dataVertical}
                          pageSize={5}
                          checkboxSelection
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Monthlyschedule;
