import React, { useState } from "react";
import "./addCustomer.css";
import CloseIcon from "@material-ui/icons/Close";
import Dashnav from "../../components/dashnav/Dashnav";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CustomerInfo from "../../classes/CustomerInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  button: {
    border: "none",
    padding: `20px`,
    color: "white",
    height: "50px",
    background: "#18A0FB",
    boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
    borderRadius: `4px`,
    zIndex: 4,
  },
}));

function AddCustomer({ openModal, setOpenModal }) {
  const classes = useStyles();

  //const [openModal, setOpenModal] = useState(false);
  //var fileName = "myDocument.pdf";
  //var fileExtension = fileName.split('.').pop();

  const [value, onChange] = useState(new Date());

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    lastName: "",
    email: "",
  });
  const [birthday, setbirthday] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);

  const register = (e) => {
    e.preventDefault();
    let customer = new CustomerInfo(
      customerInfo.name,
      customerInfo.lastName,
      customerInfo.email
    );
    console.log(customer);
  };

  return (
    <div className="customersContainer">
      <CloseIcon
        style={{
          position: "absolute",
          top: 0,
          right: 10,
        }}
        onClick={setOpenModal}
      />
      <Dashnav title="Add Customer" />

      <div
        style={{
          backgroundImage: `url(/images/addcustomerbg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center right",
        }}
        className="addCustomerWrapper"
      >
        <div className="addCustomerWrapperCont">
          <input label="Upload CSV" type="file" name="upload" accept=".csv" />

          <form className="formAddCustomer">
            <input
              className="addforminput"
              type="text"
              name="Firstname"
              placeholder="FirstName"
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, name: e.target.value })
              }
            />
            <input
              className="addforminput"
              type="text"
              name="LastName"
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, lastName: e.target.value })
              }
              placeholder="Lastname"
            />

            <div className="addCustomerInsideInput">
              <input
                className="addforminputin"
                type="text"
                name="phone"
                placeholder="Phone Numner"
              />
              <div className="addforminputinImg spaceleft">
                <input
                  className="addforminputi"
                  type="text"
                  name="username"
                  placeholder="Birthday"
                  value={birthday.toLocaleDateString("en-US")}
                />
                <div>
                  {showBirthday ? (
                    <div
                      style={{
                        float: "right",
                      }}
                    >
                      <Calendar onChange={setbirthday} value={birthday} />
                      <div className={classes.root}>
                        <Button
                          className={classes.button}
                          onClick={() => setShowBirthday(!showBirthday)}
                        >
                          SELECT
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src="/images/calendar.png"
                      alt=""
                      onClick={() => setShowBirthday(!showBirthday)}
                    />
                  )}
                </div>
              </div>
            </div>

            <input
              className="addforminput"
              type="email"
              name="email"
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, email: e.target.value })
              }
              placeholder="Email"
            />
            <div className="Anniversary">
              <input
                className="addformLast"
                type="text"
                name="Anniversary"
                placeholder="Anniversary"
                value={value.toLocaleDateString("en-US")}
              />
              <div>
                {showCalendar ? (
                  <div
                    style={{
                      float: "right",
                    }}
                  >
                    <Calendar onChange={onChange} value={value} />
                    <div className={classes.root}>
                      <Button
                        className={classes.button}
                        onClick={() => setShowCalendar(!showCalendar)}
                      >
                        SELECT
                      </Button>
                    </div>
                  </div>
                ) : (
                  <img
                    src="/images/calendar.png"
                    alt=""
                    onClick={() => setShowCalendar(!showCalendar)}
                  />
                )}
              </div>
            </div>

            <div className="submitcont">
              <input
                className="submiting"
                type="submit"
                name="submit"
                onClick={register}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;
