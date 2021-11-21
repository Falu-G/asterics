import React, { useEffect, useContext, useState, useCallback } from "react";
import { MenuContext } from "../../components/MenuContext";
import Menus from "../../components/menu/Menu";
import "./customer.css";
import NavigationComponent from "../../components/navigationComponent/NavigationComponent";
import AddCustomer from "../AddCustomer/AddCustomer";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
// import Modal from "react-modal";
import Modal from '@mui/material/Modal';
import SessionExpired from "../SessionExpired/SessionExpired";
import { useToasts } from "react-toast-notifications";
import * as ReactBootStrap from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import UpdateCustomer from "../../components/updateCustomer/UpdateCustomer";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
  button: {
    margin: 1,
    backgroundColor: "#18a0fb",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "90%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Customer() {
  const classes = useStyles();
  const [allCustomers, setAllCustomers] = useState([]);
  const [tokenValid, setTokenValid] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const { sidebar, setSideBar } = useContext(MenuContext);
  console.log("This is siderbar " + sidebar);
  const showSideBar = () => {
    setSideBar(!sidebar);
  };
  const [loading, setLoading] = useState(false);
  const [showSkeleton, setSkeleton] = useState(true);
  const [user, setUser] = useState({});
  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;
  const { addToast } = useToasts();

  const fetchoo = () => {
    setSkeleton(true);
    console.log("fetchoo");
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
          setSkeleton(false);
        }
      })
      .catch((err) => {
        console.log("This is the error that was caught" + err);
      });
  };

  const fetchBusiness = useCallback(async () => {
    setSkeleton(true);
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
          setSkeleton(false);
        }
      })
      .catch((err) => {
        console.log("This is the error that was caught" + err);
      });
  }, [token]);

  useEffect(() => {
    fetchBusiness();
  }, [fetchBusiness]);

  const dataVertical = [
    {
      field: "lastname",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 260,
      renderCell: ({ row }) => {
        return <span>{row.firstname + " " + row.lastname}</span>;
      },
    },

    {
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 300,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 200,
      renderCell: ({ row }) => {},
    },

    {
      field: "birthday",
      headerName: "Birthday",
      width: 160,
      renderCell: ({ row }) => {},
    },

    {
      field: " ",
      headerName: "",
      width: 200,
      renderCell: ({ row }) => (
        <>
          <div
            style={{
              width: `100%`,
              display: "flex",
              alignItems: `center`,
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => handleOpenUpdate(row)}
            >
              UPDATE
            </Button>
          </div>
        </>
      ),
    },

    {
      field: "",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <>
          <div className="userdelete">
            <DeleteOutline
              style={{
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => handleClickOpen(row.id)}
            />
          </div>
        </>
      ),
    },
  ];

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenUpdate = (row) => {
    setOpenUpdate(true);
    setUser(row);
    // try{
    //   fetch(`https://asteric.herokuapp.com/customer/${userid}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       Authorization: "Bearer " + token,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (data.message === "Invalid Token") {
    //         setTokenValid(true);
    //       } else {
    //        setUser(data)
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("This is the error that was caught" + err);
    //     });
    // }catch(err){
    //   console.log(err)
    // }
  };

  const handleCloseUpdate = () => setOpenUpdate(false);

  const finaldelete = (id) => {
    setLoading(true);
    fetch(`https://asteric.herokuapp.com/customer/${id}`, {
      method: "DELETE",
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
          setCustomerId(null);
        } else if (data.responsecode === "200") {
          setAllCustomers(
            allCustomers.filter((element) => {
              return element.id !== id;
            })
          );

          setCustomerId(null);
          setLoading(false);
          setOpen(false);
          addToast("User deleted successfully", { appearance: "success" });
        } else {
          console.log("An error occured");
          setCustomerId(null);
          setLoading(false);
          setOpen(false);
          addToast("Error in deleting users", { appearance: "error" });
        }
      })
      .catch((err) => {
        console.log("This is the error that was caught" + err);
        setLoading(false);
        setCustomerId(null);
        setOpen(false);
      });
  };

  // const customStyles = {
  //   content: {
  //     width: "80%",
  //     height: "80%",
  //     top: "50%",
  //     backgroundColor: "#f5f5f5",
  //     left: "50%",
  //     padding: "0",
  //     overflow: "visible",
  //     transform: "translate(-50%, -50%)",
  //   },
  // };

  const [open, setOpen] = React.useState(false);

  const [openAddCustomer, setOpenAddCustomer] = React.useState(false);

  const handleClickOpenAddCustomer = () => {

    setOpenAddCustomer(true);
    console.log("You clicked openshit"+openAddCustomer)

  }
  const handleCloseAddCustomer = () => setOpenAddCustomer(false);

  const handleClickOpen = (id) => {
    setCustomerId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
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
              <div className="customerContainer">
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
                  <UpdateCustomer
                    open={openUpdate}
                    handleClose={handleCloseUpdate}
                    user={user}
                    fetchBusiness={fetchoo}
                    setUser={setUser}
                  />

                  <Modal
                    open={openAddCustomer}
                    onClose={handleCloseAddCustomer}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Add Customers 
                      </Typography>

                      <AddCustomer
                      tokenValid={tokenValid}
                      setAllCustomers={setAllCustomers}
                      setOpenModal={
                        handleClickOpenAddCustomer
                        // () =>
                        // setOpenModalEmail(() => (openModalEmail ? false : true))
                      }
                    />

                  
                    </Box>
                  </Modal>


                  {/* <Modal
                    isOpen={openModalEmail}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <AddCustomer
                      openModal={openModalEmail}
                      tokenValid={tokenValid}
                      setAllCustomers={setAllCustomers}
                      setOpenModal={() =>
                        setOpenModalEmail(() => (openModalEmail ? false : true))
                      }
                    />
                  </Modal> */}

                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"Delete Customer?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        This user would be deleted permanently. Do you want to
                        continue?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>CANCEL</Button>
                      <Button onClick={() => finaldelete(customerId)}>
                        DELETE
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <div
                    style={{
                      backgroundImage: `url(/images/smsbg.png)`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      backgroundPosition: "center right",
                    }}
                    className="dashboardContainer"
                  >
                    <NavigationComponent title="Customer" />

                    <div className="customerWrapper">
                      <div>
                        <button
                          className="btnAddCustomer"
                          onClick={
                            handleClickOpenAddCustomer
                            // () =>
                            // setOpenModalEmail(() =>
                            //   openModalEmail ? false : true
                            // )
                          }
                        >
                          AddCustomer
                        </button>
                      </div>

                      <div
                        style={{
                          height: 400,
                          width: "90%",
                          marginTop: "20px",
                        }}
                      >
                        {showSkeleton ? (
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
                          <DataGrid
                            rows={allCustomers}
                            columns={dataVertical}
                            pageSize={5}
                            disableSelectionOnClick={true}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Customer;
