import React, { useState, useContext } from "react";
import { MenuContext } from "../../components/MenuContext";
import { useToasts } from "react-toast-notifications";
import "./sendsms.css";
import SessionExpired from "../SessionExpired/SessionExpired";
import Menus from "../../components/menu/Menu";
import White from "../../components/whitenav/White";
import * as ReactBootStrap from "react-bootstrap";
import Skeleton from "@mui/material/Skeleton";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useTable, usePagination, useRowSelect } from "react-table";
import Button from "@mui/material/Button";
import { Checkbox } from "../../components/Checkbox";

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

function Sendsms() {
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

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "Name",
  //       accessor: "col1", // accessor is the "key" in the data
  //     },
  //     {
  //       Header: "Phone Number",
  //       accessor: "col2",
  //     },
  //   ],
  //   []
  // );
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

  const [allCustomers, setAllCustomers] = useState(data);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  const { addToast } = useToasts();
  const { sidebar, setSideBar } = useContext(MenuContext);
  const [invalidToken, setInvalidToken] = useState(false);
  console.log("This is siderbar " + sidebar);
  const showSideBar = () => {
    setSideBar(!sidebar);
  };

  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const { pageIndex } = state;
  // const [messageReport, setMessageReport] = useState("");

  const [sendMessage, setSendMessage] = useState({
    sender:"Asterics",
    receiver: "",
    message: "",
  });

  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;

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
        console.log("receiver of customers " + allCustomers.length);
      }
    } catch (e) {
      setLoading(false);
      console.log("Error In catch " + e.message);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setSendingMessage(true);
    console.log(sendMessage);
    console.log(token);

    try {
      let result = await fetch("https://asteric.herokuapp.com/vonageSms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(sendMessage),
      });

      result = await result.json();
      if (result.message === "Invalid Token") {
        setLoading(false);
        setInvalidToken(true);
        console.log(result.message);
      } else if (result.status === 200) {
        // setMessageReport(result.message);
        setSendingMessage(false);
        addToast("Saved Successfully", { appearance: "success", autoDismiss: true});
      } else {
        // setMessageReport(result.message);
        setSendingMessage(false);
        addToast(result.message, { appearance: "error", autoDismiss: true });
      }
    } catch (err) {
      console.log("Something terrible happened " + err.message);
    }
  };

  const phoneNumberHandler = () => selectedFlatRows.map(row => {
    
    let promises = selectedFlatRows.map((row) => row.original.phone);
    Promise.all(promises).then(function (results) {
      setSendMessage({...sendMessage,receiver:results})
      console.log(sendMessage.recieverAddress);
    });

    handleClose()
    return null
  })

  
  
  return (
    <>
      {invalidToken ? (
        <>
          <SessionExpired />
        </>
      ) : (
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
                  <form className="scheduleform">
                    <div className="inputIcon">
                      <input
                        className="phone"
                        type="phonenumber"
                        name="phone"
                        placeholder="Phone Number"
                        disabled
                        value={sendMessage.receiver}
                        onChange={(e) =>
                          setSendMessage({
                            ...sendMessage,
                            receiver: e.target.value,
                          })
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

                    <textArea
                      type="text"
                      name="message"
                      value={sendMessage.message}
                      placeholder="Messages..."
                      onChange={(e) =>
                        setSendMessage({
                          ...sendMessage,
                          message: e.target.value,
                        })
                      }
                    />
                  </form>

            

                  <ReactBootStrap.Button
                    className="sendbtn"
                    variant="primary"
                    onClick={handleSendMessage}
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
                      {sendingMessage ? "Loading..." : "Send"}
                    </span>
                  </ReactBootStrap.Button>
                </div>

                <div>
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
                            <Skeleton
                              variant="rectangular"
                              width={`100%`}
                              height={50}
                            />
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
                                  justifyContent: "center"
                                }}
                              >
                                <Button
                                  variant="contained"
                                  onClick = {phoneNumberHandler}
                                >
                                  CONFIRM SELECTION
                                </Button>
                              </div>

                            </div>
                          </>
                        )}
                      </Box>
                    </Fade>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Sendsms;
