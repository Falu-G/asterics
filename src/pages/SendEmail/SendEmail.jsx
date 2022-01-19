import React, { useState, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import "./sendemail.css";
import { MenuContext } from "../../components/MenuContext";
import Menus from "../../components/menu/Menu";
import White from "../../components/whitenav/White";
import * as ReactBootStrap from "react-bootstrap";
import SessionExpired from "../SessionExpired/SessionExpired";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useTable, usePagination, useRowSelect } from "react-table";
import Button from "@mui/material/Button";
import { Checkbox } from "../../components/Checkbox";
// import TextEditor from "../../components/TextEditor/TextEditor";
// import { EditorState,  convertToRaw } from "draft-js";
// import draftToHtml from 'draftjs-to-html';
//import ReactQuillEditor from "../../components/ReactQuillEditor/ReactQuillEditor";

import ReactQuillEditorClass from "../../components/ReactQuillEditor/ReactQuillEditorClass";
//import htmlToDraft from "html-to-draftjs";

//import TagFafcesIcon from '@mui/icons-material/TagFaces';

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

function SendEmail() {
  const { sidebar, setSideBar } = useContext(MenuContext);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [emailContent, setEmailContent] = useState({
    recieverAddress: "",
    messageBody: "",
    messageSubject: "",
  });
  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;
  const showSideBar = () => setSideBar(!sidebar);
  const { addToast } = useToasts();


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "firstname",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
    []
  );

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


//  const callbackFunction = (childData) => {
//     this.setState({message: childData})
// }

  const [html, setHtml] = useState("");
  const isBlank = (str) => {
    return !str || /^\s*$/.test(str);
  };
  const handleSend = async (e) => {
    e.preventDefault();
    setSendingMessage(true);
    setEmailContent({...emailContent, messageBody: html});

    if (isBlank(emailContent.messageBody)) {
      alert("Message can not be empty");
     
    }else{

      try {
        let result = await fetch("https://asteric.herokuapp.com/mails/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(emailContent),
        });
  
        result = await result.json();
        if (result.status === 200) {
          console.log(result.message);
          setSendingMessage(false);
          setEmailContent({
            recieverAddress: "",
          messageBody: "",
          messageSubject: "",
          })   
          setHtml("")
          addToast("Saved Successfully", { appearance: "success" });
        } else {
          console.log(result.message);
          setSendingMessage(false);

          setEmailContent({
          recieverAddress: "",
          messageBody: "",
          messageSubject: "",
          })   
          setHtml("")
          addToast(result.message, { appearance: "success" });
        }
      } catch (err) {
        console.log("Something terrible happened " + err.message);
        setSendingMessage(false);
        addToast(err.message, { appearance: "error" });
      }


    }


  };

  const confirmSelection = () => {
    let promises = selectedFlatRows.map((row) => row.original.email);
    //set the phone number collected here immediately the numbers are confirmed close the modal page and render the numbers on the input screen
    Promise.all(promises).then(function (results) {
      setEmailContent({ ...emailContent, recieverAddress: results });
      console.log(emailContent.recieverAddress);
    });

    handleClose();

    return null;
  };

  // const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // const onEditorStateChange = (editorState) => {
  //   setEditorState(editorState);
  //   setEmailContent({...emailContent, messageBody: draftToHtml(convertToRaw(editorState.getCurrentContent()))});
  // };


 


  return (
    <>
      {invalidToken ? (
        <SessionExpired />
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
              <White title="Send Email" />
              {/*console.log(select.length)*/}
              <div
                style={{
                  backgroundImage: `url(/images/smsbg.png)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center right",
                }}
                className="SendEmailWrapper"
              >
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
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  onClick={confirmSelection}
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

                <div>
                  <form className="scheduleform">
                    <div className="inputIcon">
                      <input
                        className="phone"
                        type="email"
                        name="email"
                        disabled
                        value={emailContent.recieverAddress}
                        placeholder="Add Email"
                      />
                      <img
                        style={{
                          cursor: `pointer`,
                        }}
                        src="/images/contact.png"
                        alt="contact"
                        onClick={handleSelectCustomers}
                      />
                    </div>

                    <input
                      className="phone"
                      type="title"
                      name="title"
                      value={emailContent.messageSubject}
                      onChange={(e) =>
                        setEmailContent({
                          ...emailContent,
                          messageSubject: e.target.value,
                        })
                      }
                      placeholder="Message Title"
                    />

                    {console.log(html)}

                  <ReactQuillEditorClass
                  //sendData = {}
                  setHtml = {setHtml}
                   
                  
                  emailContent = {emailContent}
                  setEmailContent = {setEmailContent}
                  />


                  {/* <ReactQuillEditor
                  setHtml = {setHtml}
                  html = {html}
                  
                  emailContent = {emailContent}
                  setEmailContent = {setEmailContent}/> */}
                      {/* <TextEditor sizeOfMessageBox = {937} editorState = {editorState} onEditorStateChange = {onEditorStateChange}/> */}
                      {/* <QuillEditorFunc
                            settemplateObjstate={settemplateObjstate}
                            templateObjstate={templateObjstate}
                            setHtml={setHtml}
                            html={html}
                          /> */}
                  </form>

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
                      {sendingMessage ? "Loading..." : "Send"}
                    </span>
                  </ReactBootStrap.Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SendEmail;
