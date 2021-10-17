import React, { useState } from "react";
import Dashnav from "../dashnav/Dashnav";
import "./newSchedule.css";
import CloseIcon from "@material-ui/icons/Close";
import { useToasts } from "react-toast-notifications";
import * as ReactBootStrap from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useTable, usePagination, useRowSelect } from "react-table";
import Button from "@mui/material/Button";
import { Checkbox } from "../../components/Checkbox";
import Skeleton from "@mui/material/Skeleton";
import ShowUpEmail from "../../pages/ShowUpEmail/ShowUpEmail";

const style = {
  position: "absolute",
  width: 700,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function NewSchedule({ setOpenModal, setTokenValid, setEmailQueue, setSentEmailValue}) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;
  console.log("This is todays date " + today);

  const data = React.useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
    ],
    []
  );

  //let schedule = new ScheduleEmail();
  const [allCustomers, setAllCustomers] = useState(data);
  const columns = React.useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "firstname",
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
    ],
    []
  );

  const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: 1,
      marginRight: 1,
      width: 200,
    },
  }));

  const tableInstance = useTable(
    { columns, data: allCustomers },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "name",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),

            Cell: ({ row }) => {
              return <Checkbox {...row.getToggleRowSelectedProps()} />;
            },
          },
          ...columns,
        ];
      });
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    pageOptions,
    selectedFlatRows,
  } = tableInstance;

  const page = rows.slice(0, 10);
  const { pageIndex } = state;
  const [messageType, setMessageType] = useState("SMS");
  const [scheduleMessage, setScheduleMessage] = useState({
    recieverAddress: "",
    messageBody: "",
    messageSubject: "",
    schedule_date: today,
    scheduleType: "Daily",
  });

  const [scheduleMessageSms, setScheduleMessageSms] = useState({
    receiver: "",
    messageBody: "",
    messageSubject: "",
    schedule_date: today,
    scheduleType: "Daily",
  });

  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;
  const { addToast } = useToasts();
  const [sendingMessage, setSendingMessage] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [invalidToken, setInvalidToken] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);





  const fetchBusiness = async () => {
    setLoading(true)
    console.log("Fetch Loading is called")
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
          setEmailQueue(data.filter((item) => item.status === "scheduled"));
          setSentEmailValue(data.filter((item) => item.status === "sent"));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("This is the error that was caught" + err);
        setLoading(false);
      });
  }




  

  const handleScheduleMessage = async () => {
    setSendingMessage(true);
    if(messageType === "Email"){
      try {
        console.log(scheduleMessage)
        let result = await fetch("https://asteric.herokuapp.com/mails/schedule", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(scheduleMessage),
        });
  
        result = await result.json();
        if (result.status === 200) {
          console.log(result.message);
          setSendingMessage(false);
          addToast("Saved Successfully", { appearance: "success" });
          setOpenModal(false);
          fetchBusiness()
        } else {
          console.log(result.message);
          setSendingMessage(false);
          addToast(result.message, { appearance: "success" });
          setOpenModal(false);
          fetchBusiness()
        }
      } catch (err) {
        setSendingMessage(false);
        console.log("Something terrible happened " + err.message);
      }
    }else{
      try {
        console.log(scheduleMessageSms.messageBody)
        let result = await fetch("https://asteric.herokuapp.com/vonageSms/schedule", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(scheduleMessageSms),
        });
  
        result = await result.json();
        if (result.status === 200) {
          console.log(result.message);
          setSendingMessage(false);
          addToast("Saved Successfully", { appearance: "success" });
          setOpenModal(false);
          fetchBusiness()
        } else {
          console.log(result.message);
          setSendingMessage(false);
          setOpenModal(false);
          addToast(result.message, { appearance: "success" });
          fetchBusiness()
        }
      } catch (err) {
        setSendingMessage(false);
        console.log("Something terrible happened " + err.message);
      }
    }
   
  };

  const classes = useStyles();

  const handleSelectCustomers = async () => {
    handleOpen();
    setLoading(true);
    try {
      let result = await fetch("https://asteric.herokuapp.com/customer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      result = await result.json();
      
      if (result.message === "Invalid Token") {
        setLoading(false);
        setInvalidToken(true);
        console.log(result.message);
      } else {
        setAllCustomers(result);
        setLoading(false);
        console.log("Numbers of customers " + allCustomers.length);
      }
    } catch (e) {
      setLoading(false);
      console.log("Error In catch " + e.message);
    }
  };

  const phoneNumberHandler = () => {
    let promises = selectedFlatRows.map((row) => row.original.phone);
    Promise.all(promises).then(function (results) {
      setScheduleMessageSms({ ...scheduleMessageSms, receiver: results });
    });
    handleClose();
    return null;
  };


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

      {console.log("Na date be dis " + scheduleMessage.schedule_date)}
      {console.log("This are the numbers you selected"+scheduleMessageSms.receiver)}
      {console.log("This are the emails you selected"+scheduleMessage.recieverAddress)}
      <div style = {{
        height:`100%`,
        alignItems:`center`,
        display:`flex`,
        justifyContent:`center`,
        flexDirection:`column`
      }}>


    
      <div className="ns-Scheduler">
        <div className="ns-Scheduler-container">
          <span>Select Message Type</span>
          <div className="ns-messagetab">
            <button
              className={messageType === "SMS" ? "ns-active" : null}
              onClick={() => {
                setMessageType("SMS");
                setScheduleMessageSms({
                  ...scheduleMessageSms,
                  receiver: "",
                });
              }}
            >
              SMS
            </button>
            <button
              style={{ marginLeft: "10px" }}
              className={messageType === "Email" ? "ns-active" : null}
              onClick={() => {
                setMessageType("Email");
                setScheduleMessage({
                  ...scheduleMessage,
                  recieverAddress: "",
                });
              }}
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
            onChange={async (event) => {

              messageType === "Email" ?  setScheduleMessage({
                ...scheduleMessage,
                schedule_date: event.target.value,
              }) : setScheduleMessageSms({
                ...scheduleMessageSms,
                schedule_date: event.target.value,
              })
             
              console.log(event.target.value);
              console.log("Schedule shit " + scheduleMessage.schedule_date);
            }}
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
          <div>
            <input
              type={messageType === "SMS" ? "text" : "email"}
              name={messageType === "SMS" ? "sms" : "email"}
              placeholder={
                messageType === "SMS" ? "PhoneNumber" : "Enter Email"
              }
              value={messageType === "Email" ? scheduleMessage.recieverAddress :scheduleMessageSms.receiver}
            />

            <img
              style={{
                cursor: `pointer`,
              }}
              onClick={handleSelectCustomers}
              src="/images/contact.png"
              alt="contact"
            />
          </div>

          <input
            type="text"
            name="title"
            placeholder={"Title of the message"}
            onChange={(event) =>{
              if(messageType === "Email") setScheduleMessage({...scheduleMessage, messageSubject: event.target.value,})
              else setScheduleMessageSms({...scheduleMessageSms, messageSubject: event.target.value})
            }
              
            }
            value={messageType === "Email" ? scheduleMessage.messageSubject : scheduleMessageSms.messageSubject}
          />
          <textArea
            type="messages"
            name="name"
            onChange={(event) =>
              messageType === "Email" ? setScheduleMessage({
                ...scheduleMessage,
                messageBody: event.target.value
              })
               : setScheduleMessageSms({
                ...scheduleMessageSms,
                messageBody: event.target.value
              })
            }
            value={messageType === "Email" ? scheduleMessage.messageBody : scheduleMessageSms.messageBody}
          />

          <div style={{ width: "100%" }}>
            <ReactBootStrap.Button
              className="sendEmailbtn"
              variant="primary"
              onClick={handleScheduleMessage}
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



      {messageType === "SMS" ? (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Contact List
              </Typography>
              {loading ? (
                <>
                  <Skeleton variant="rectangular" width={`100%`} height={50} />
                  <Skeleton variant="text" height={50} />
                  <Skeleton variant="text" height={50} />
                  <Skeleton variant="text" height={50} />
                  <Skeleton variant="text" height={50} />
                  <Skeleton variant="text" height={50} />
                </>
              ) : (
                <>
                  <div>
                    <table {...getTableProps()}>
                      <thead>
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      {/* Apply the table body props */}
                      <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map((cell) => {
                                return (
                                  <td {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    <div
                      style={{
                        marginTop: "10px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        disabled={!canNextPage}
                        onClick={() => previousPage()}
                        variant="contained"
                      >
                        Previous page
                      </Button>

                      <span>
                        Page{" "}
                        <strong>
                          {pageIndex + 1} of {pageOptions.length}
                        </strong>
                      </span>
                      <Button
                        disabled={!canPreviousPage}
                        onClick={() => nextPage()}
                        variant="contained"
                      >
                        Next Page
                      </Button>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        marginTop: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button variant="contained" onClick={phoneNumberHandler}>
                        CONFIRM SELECTION
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Box>
          </Fade>
        </Modal>
      ) : (
        <>
          <ShowUpEmail
            allCustomers={allCustomers}
            handleClose={handleClose}
            loading={loading}
            open={open}
            scheduleMessage={scheduleMessage}
            setScheduleMessage={setScheduleMessage}
            invalidToken={invalidToken}
          />
        </>
      )}

</div>
    </div>
  );
}

export default NewSchedule;
