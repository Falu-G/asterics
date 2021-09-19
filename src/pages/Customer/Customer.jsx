import React, { useEffect, useContext, useState } from "react";
import { MenuContext } from "../../components/MenuContext";
import Menus from "../../components/menu/Menu";
import "./customer.css";
import NavigationComponent from "../../components/navigationComponent/NavigationComponent";
import AddCustomer from "../AddCustomer/AddCustomer";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import SessionExpired from "../SessionExpired/SessionExpired";
import { useToasts } from "react-toast-notifications";
import * as ReactBootStrap from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#18a0fb",
  },
}));

function Customer() {
  const classes = useStyles();
  const [allCustomers, setAllCustomers] = useState([]);
  const [tokenValid, setTokenValid] = useState(false);
  const { sidebar, setSideBar } = useContext(MenuContext);
  console.log("This is siderbar " + sidebar);
  const showSideBar = () => {
    setSideBar(!sidebar);
  };
  const [loading, setLoading] = useState(false);
  const [openModalEmail, setOpenModalEmail] = useState(false);
  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;
  const { addToast } = useToasts();
  useEffect(() => {
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

  const dataVertical = [
    {
      field: "firstname",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: () => {},
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 300,
      renderCell: () => {},
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 200,
      renderCell: ({ row }) => {
        <div className="CentralizeCell">{row.status}</div>;
      },
    },

    {
      field: "birthday",
      headerName: "Addreess",
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
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            UPDATE
          </Button>

          <div className="userdelete">
            <DeleteOutline
              style={{
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

  // const [dataRow, setDataRow] = useState(allCustomers);
  const handledelete = (id) => {
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
        } else if (data.responsecode === "200") {
          setAllCustomers(
            allCustomers.filter((element) => {
              return element.id !== id;
            })
          );
          setLoading(false);
          addToast("User deleted successfully", { appearance: "success" });
        } else {
          console.log("An error occured");
          setLoading(false);
          addToast("Error in saving templates", { appearance: "error" });
        }
      })
      .catch((err) => {
        console.log("This is the error that was caught" + err);
        setLoading(false);
      });
  };

  const customStyles = {
    content: {
      width: "80%",
      height: "70%",
      top: "50%",
      left: "50%",
      padding: "0",
      overflow: "visible",
      transform: "translate(-50%, -50%)",
    },
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
                  <Modal
                    isOpen={openModalEmail}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <AddCustomer
                      openModal={openModalEmail}
                      setOpenModal={() =>
                        setOpenModalEmail(() => (openModalEmail ? false : true))
                      }
                    />
                  </Modal>

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

                    <div className="customerWrapper">
                      <div>
                        <button
                          className="btnAddCustomer"
                          onClick={() =>
                            setOpenModalEmail(() =>
                              openModalEmail ? false : true
                            )
                          }
                        >
                          AddCustomer
                        </button>
                      </div>

                      <div
                        style={{
                          height: 400,
                          width: "100%",
                          marginTop: "20px",
                        }}
                      >
                        <DataGrid
                          rows={allCustomers}
                          columns={dataVertical}
                          pageSize={5}
                          checkboxSelection
                        />
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
