import React, { useEffect, useState, useCallback } from "react";
import "./autosender.css";
import { useToasts } from "react-toast-notifications";
import * as ReactBootStrap from "react-bootstrap";
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
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CssBaseline from "@mui/material/CssBaseline";
import ReactQuillEditorClass from "../../components/ReactQuillEditor/ReactQuillEditorClass";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import DropdownUsers from "../../components/DropdownUsers/DropdownUsers";
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
function AutoSender(
  setOpenModal,
  setTokenValid,
  setEmailQueue,
  setSentEmailValue,
  spinnerDisplay,
  setSmsQueue
) {
  //console.log("This is todays date " + today);
  const isBlank = (str) => {
    return !str || /^\s*$/.test(str);
  };

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


  const [messageType, setMessageType] = useState("SMS");
  const [scheduleMessage, setScheduleMessage] = useState({
    recieverAddress: "",
    messageBody: "",
    messageSubject: "",
    schedule_date: "",
    scheduleType: "Daily",
  });

  const [scheduleMessageSms, setScheduleMessageSms] = useState({
    // receiver: [],
    numbers: [],
    message: "",
    schedule_date: "",
    scheduleType: "Daily",
  });

  const userdetails = {
    email: "sfalugba@gmail.com",
    phone: "2348107530562",
    firstname: "Segun",
    lastname: "David",
    birthday: "15,May",
    anniversary: "19, May",
  };
  const [userInfo, setUserInfo] = useState(userdetails);

  const [birthdayUser, setBirthdayUser] = useState({
    message: "Hello welcome to asteric CRM, just doing a test",
    receivers: [],
    schedule: "Birthday",
  });

  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;
  const { addToast } = useToasts();
  const [sendingMessage, setSendingMessage] = useState(false);
  const [open, setOpen] = React.useState(false);

  //   const [invalidToken, setInvalidToken] = useState(false);
  const [loading, setLoading] = useState(false);

  //   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [html, setHtml] = useState("");

  const fetchBusiness = async () => {
    spinnerDisplay(true);
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
        spinnerDisplay(false);
        if (data.message === "Invalid Token") {
          setTokenValid(true);
          setLoading(false);
        } else {
          setEmailQueue(data.filter((item) => item.status === "scheduled"));
          setSentEmailValue(data.filter((item) => item.status === "sent"));
          setLoading(false);
          setLoading(false);
          setSmsQueue(contactlist);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        spinnerDisplay(false);
      });
  };

  const handleScheduleMessage = async () => {
    setSendingMessage(true);

    if (messageType === "Email") {
      try {
        if (isBlank(html)) {
          alert("Please type the message you would like to schedule");
          setSendingMessage(false);

          setOpenModal(false);

          return;
        }
        console.log(scheduleMessage);

        // if(schedule_date )
        let result = await fetch(
          "https://asteric.herokuapp.com/mails/schedule",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              recieverAddress: scheduleMessage.recieverAddress,
              messageBody: html,
              messageSubject: scheduleMessage.messageSubject,
            }),
          }
        );

        result = await result.json();
        if (result.status === 200) {
          console.log(result.message);
          setSendingMessage(false);
          addToast("Saved Successfully", { appearance: "success" });
          setOpenModal(false);
          fetchBusiness();
        } else {
          console.log(result.message);
          setSendingMessage(false);
          addToast(result.message, { appearance: "success" });
          setOpenModal(false);
          fetchBusiness();
        }
      } catch (err) {
        setSendingMessage(false);
        console.log("Something terrible happened " + err.message);
      }
    } else {
      try {
        console.log(scheduleMessageSms.messageBody);

        let result = await fetch(
          "https://asteric.herokuapp.com/bbnSms/schedule",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(scheduleMessageSms),
          }
        );

        result = await result.json();
        if (result.responsecode === "200") {
          console.log("finaly in 200" + result.message);
          setSendingMessage(false);
          addToast(result.message, { appearance: "success" });
          setOpenModal(false);
          fetchBusiness();
        } else {
          console.log(result.message);
          console.log("finaly not in 200" + result.message);
          setSendingMessage(false);
          setOpenModal(false);
          addToast(result.message, { appearance: "success" });
          fetchBusiness();
        }
      } catch (err) {
        setSendingMessage(false);
        console.log("Something terrible happened " + err.message);
      }
    }
  };

 
  //   const phoneNumberHandler = () => {
  //     let promises = selectedFlatRows.map((row) => row.original.phone);
  //     Promise.all(promises).then(function (results) {
  //       setScheduleMessageSms({ ...scheduleMessageSms, numbers: results });
  //       // setScheduleMessageSms({ ...scheduleMessageSms, receiver: results });
  //     });
  //     handleClose();
  //     return null;
  //   };

  const userSelected = (option) => {
  
        setUserInfo({
        email: option.email,
        phone: option.phone,
        firstname: option.firstname,
        lastname: option.lastname,
        birthday: option.birthday,
        anniversary: option.anniversary,
      });

          setBirthdayUser({
        ...birthdayUser,
        receivers: [userInfo],
      });

      

     
    // Promise.all(option).then(function (option) {
    //   setUserInfo({
    //     email: option.email,
    //     phone: option.phone,
    //     firstname: option.firstname,
    //     lastname: option.lastname,
    //     birthday: option.birthday,
    //     anniversary: option.anniversary,
    //   });
  
    //   setBirthdayUser({
    //     ...birthdayUser,
    //     receivers: [userInfo],
    //   });
    // })

   

    handleClose();
    return null;
  };

  const [selected, setSelected] = useState("Choose User");
  const [isActive, setIsActive] = useState(false);

  const fetchCustomer = useCallback(async () => {
    console.log("This should reload");
    fetch("https://asteric.herokuapp.com/customer", {
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
          setAllCustomers(data);
        }
      })
      .catch((err) => {
        console.log("This is the error that was caught" + err);
      });
  }, [token]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer,birthdayUser]);

  return (
    <div className="ns-Container">
      <CssBaseline />

      <Container component="main" maxWidth="xl">
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem",
            mt: 3,
          }}
        >
          <div
            style={{
              height: `100%`,
              alignItems: `center`,
              display: `flex`,
              justifyContent: `center`,
              flexDirection: `column`,
            }}
          >
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
                        // receiver: [],
                        numbers: [],
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
              <div></div>
            </div>

            <form className="ns-Scheduler-input">
              <div className="ns-Scheduler-house">
                <div>
               



<div className="dropdownx">
      <div className="dropdownx-btn" onClick={() => setIsActive(!isActive)}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdownx-content">
          {allCustomers.map((customer, index) => (
            <div
              key={index}
              className="dropdownx-item"
              onClick={() => {
                setSelected(`${customer.firstname} ${customer.lastname}`);
                setIsActive(false);
                userSelected(customer);
              }}
            >
              {`${customer.firstname} ${customer.lastname}`}
            </div>
          ))}
        </div>
      )}
    </div>





















                </div>
                {messageType === "Email" ? (
                  <input
                    type="text"
                    name="title"
                    style={{
                      width: "866px",
                    }}
                    placeholder={"Title of the message"}
                    onChange={(event) =>
                      setScheduleMessage({
                        ...scheduleMessage,
                        messageSubject: event.target.value,
                      })
                    }
                    value={scheduleMessage.messageSubject}
                  />
                ) : null}
              </div>

              {messageType === "Email" ? (
                <ReactQuillEditorClass
                  //sendData = {}
                  setHtml={setHtml}

                  // emailContent = {emailContent}
                  // setEmailContent = {setEmailContent}
                />
              ) : (
                <textArea
                  type="messages"
                  name="name"
                  style={{
                    width: "936px",
                  }}
                  onChange={(event) =>
                    setBirthdayUser({
                      ...birthdayUser,
                      message: event.target.value,
                    })
                  }
                  value={birthdayUser.message}
                />
              )}

              <div style={{ width: "100%", marginBottom: "10px" }}>
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
            </form>

            {messageType === "SMS" ? (
              //   <Modal
              //     aria-labelledby="transition-modal-title"
              //     aria-describedby="transition-modal-description"
              //     open={open}
              //     onClose={handleClose}
              //     closeAfterTransition
              //     BackdropComponent={Backdrop}
              //     BackdropProps={{
              //       timeout: 500,
              //     }}
              //   >
              //     <Fade in={open}>
              //       <Box sx={style}>
              //         <Typography
              //           id="transition-modal-title"
              //           variant="h6"
              //           component="h2"
              //         >
              //           Contact List
              //         </Typography>
              //         {loading ? (
              //           <>
              //             <Skeleton
              //               variant="rectangular"
              //               width={`100%`}
              //               height={50}
              //             />
              //             <Skeleton variant="text" height={50} />
              //             <Skeleton variant="text" height={50} />
              //             <Skeleton variant="text" height={50} />
              //             <Skeleton variant="text" height={50} />
              //             <Skeleton variant="text" height={50} />
              //           </>
              //         ) : (
              //           <>
              //             <div>
              //               <table {...getTableProps()}>
              //                 <thead>
              //                   {headerGroups.map((headerGroup) => (
              //                     <tr {...headerGroup.getHeaderGroupProps()}>
              //                       {headerGroup.headers.map((column) => (
              //                         <th {...column.getHeaderProps()}>
              //                           {column.render("Header")}
              //                         </th>
              //                       ))}
              //                     </tr>
              //                   ))}
              //                 </thead>
              //                 {/* Apply the table body props */}
              //                 <tbody {...getTableBodyProps()}>
              //                   {page.map((row) => {
              //                     prepareRow(row);
              //                     return (
              //                       <tr {...row.getRowProps()}>
              //                         {row.cells.map((cell) => {
              //                           return (
              //                             <td {...cell.getCellProps()}>
              //                               {cell.render("Cell")}
              //                             </td>
              //                           );
              //                         })}
              //                       </tr>
              //                     );
              //                   })}
              //                 </tbody>
              //               </table>

              //               <div
              //                 style={{
              //                   marginTop: "10px",
              //                   width: "100%",
              //                   display: "flex",
              //                   alignItems: "center",
              //                   justifyContent: "space-between",
              //                 }}
              //               >
              //                 <Button
              //                   disabled={!canNextPage}
              //                   onClick={() => previousPage()}
              //                   variant="contained"
              //                 >
              //                   Previous page
              //                 </Button>

              //                 <span>
              //                   Page{" "}
              //                   <strong>
              //                     {pageIndex + 1} of {pageOptions.length}
              //                   </strong>
              //                 </span>
              //                 <Button
              //                   disabled={!canPreviousPage}
              //                   onClick={() => nextPage()}
              //                   variant="contained"
              //                 >
              //                   Next Page
              //                 </Button>
              //               </div>

              //               <div
              //                 style={{
              //                   width: "100%",
              //                   display: "flex",
              //                   marginTop: "10px",
              //                   alignItems: "center",
              //                   justifyContent: "center",
              //                 }}
              //               >
              //                 <Button
              //                   variant="contained"
              //                   //   onClick={phoneNumberHandler}
              //                   onClick={userSelected}
              //                 >
              //                   CONFIRM SELECTION
              //                 </Button>
              //               </div>
              //             </div>
              //           </>
              //         )}
              //       </Box>
              //     </Fade>
              //   </Modal>
              
              <div>
                {console.log(birthdayUser)}
                SMS</div>
            ) : (
              <>
                {/* <ShowUpEmail
                  allCustomers={allCustomers}
                  handleClose={handleClose}
                  loading={loading}
                  open={open}
                  scheduleMessage={scheduleMessage}
                  setScheduleMessage={setScheduleMessage}
                  invalidToken={invalidToken}
                /> */}
                <div>Email</div>
              </>
            )}
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default AutoSender;
