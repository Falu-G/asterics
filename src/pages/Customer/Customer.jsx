import React, { useState } from "react";
import Menus from "../../components/menu/Menu";
import "./customer.css";
import NavigationComponent from "../../components/navigationComponent/NavigationComponent";
import AddCustomer from "../AddCustomer/AddCustomer";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#18a0fb"
  },
}));

function Customer() {
  const classes = useStyles();
  const [sidebar, setSideBar] = useState(false);
  const showSideBar = () => setSideBar(!sidebar);
  const [openModalEmail, setOpenModalEmail] = useState(false);

  const dataVertical = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "dateSchedule",
      headerName: "Date Schedule",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (prenentr) => {
        console.log(prenentr);
        <div>hdh</div>;
      },
    },
    {
      field: "MessageContent",
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
      field: "Address",
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

  const dataHorizontal = [
    {
      id: 1,
      dateSchedule: "12-Aug-2021",
      MessageContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
      status: "Pending",
      Address: "plt 4 , Ikeja Street",
    },
    {
      id: 2,
      dateSchedule: "12-Aug-2021",
      MessageContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
      status: "Pending",
      Address: "plt 4 , Ikeja Street",
    },
    {
      id: 3,
      dateSchedule: "12-Aug-2021",
      MessageContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
      status: "Pending",
      Address: "plt 4 , Ikeja Street",
    },
    {
      id: 4,
      dateSchedule: "12-Aug-2021",
      MessageContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
      status: "Pending",
      Address: "plt 4 , Ikeja Street",
    },
    {
      id: 5,
      dateSchedule: "12-Aug-2021",
      MessageContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
      status: "Pending",
      Address: "plt 4 , Ikeja Street",
    },
  ];
  const [dataRow, setDataRow] = useState(dataHorizontal);
  const handledelete = (id) =>
    setDataRow(() => dataRow.filter((item) => item.id !== id));

  const customStyles = {
    content: {
      width: "80%",
      height: "70%",
      top: "50%",
      left: "50%",
      padding: "0",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
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
                  setOpenModalEmail(() => (openModalEmail ? false : true))
                }
              >
                AddCustomer
              </button>
            </div>

            <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
              <DataGrid
                rows={dataHorizontal}
                columns={dataVertical}
                pageSize={5}
                checkboxSelection
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
