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
function NewSchedule({ setOpenModal, hideOption }) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;

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

  let schedule = new ScheduleEmail();
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
  const [scheduleMessage, setScheduleMessage] = useState(schedule);
  const [messageType, setMessageType] = useState("SMS");

  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;
  const { addToast } = useToasts();
  const [sendingMessage, setSendingMessage] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const [loading, setLoading] = useState(false);
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
      console.log("You clicked contact");

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
              style={{ marginLeft: "10px" }}
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
          <div>
            <input
              type={messageType === "SMS" ? "text" : "email"}
              name={messageType === "SMS" ? "sms" : "email"}
              placeholder={
                messageType === "SMS" ? "PhoneNumber" : "Enter Email"
              }
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

      {messageType === "SMS" ?
      



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
                      <Button variant="contained" onClick={""}>
                        CONFIRM SELECTION
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Box>
          </Fade>
        </Modal>
      
      
      
      :
      
     <>
     
     <ShowUpEmail handleSelectCustomers = {handleSelectCustomers} allCustomers = {allCustomers} handleClose = {handleClose} loading = {loading} open = {open} />
     
     {handleSelectCustomers,allCustomers, handleClose, loading}
     
     
     </>
      
      
      }
        



        
      
    </div>
  );
}

export default NewSchedule;
