import React, { useState } from "react";
import "./addCustomer.css";
import CloseIcon from "@material-ui/icons/Close";
import Dashnav from "../../components/dashnav/Dashnav";
import "react-calendar/dist/Calendar.css";
//import { makeStyles } from "@material-ui/core/styles";
import CustomerInfo from "../../classes/CustomerInfo";
import SessionExpired from "../SessionExpired/SessionExpired";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as ReactBootStrap from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import dateFormat from "dateformat";
function AddCustomer({ setOpenModal, setTokenValid, setAllCustomers }) {
  const [sessionExpired, setSessionExpired] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    lastName: "",
    email: "",
  });
  const [selectedBirthdayDate, setSelectedBirthdayDate] = useState(null);
  const [selectedAnniversaryDate, setselectedAnniversaryDate] = useState(null);
  const [addingUser, setAddingUser] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { addToast } = useToasts();
  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;

  const fetchUser = () => {
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
  };

  const regFromCSV = async () => {
    let result = await fetch(
      "https://asteric.herokuapp.com/customer/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(),
      }
    );

    result = await result.json();

    if (result.status === 401) {
      setSessionExpired(true);
      setAddingUser(false);
      return;
    }

    fetchUser();
    setAddingUser(false);
    setOpenModal(false);
    addToast("User added Successfully", { appearance: "success" });
    console.log(`This is the ${JSON.stringify(result)}`);
    console.log();
  };
  const register = async (e) => {
    e.preventDefault();
    setAddingUser(true);
    let customer = new CustomerInfo(
      customerInfo.name,
      customerInfo.lastName,
      customerInfo.email
    );

    if (selectedBirthdayDate != null) {
      let date = dateFormat(selectedBirthdayDate, "dd/mm/yyyy");
      customer.addDateOfBirth(date);
    }

    if (selectedAnniversaryDate != null) {
      let datee = dateFormat(selectedAnniversaryDate, "dd/mm/yyyy");
      customer.addAnniversary(datee);
      console.log(datee);
    }

    if (phoneNumber !== "") {
      customer.addPhoneNumber(phoneNumber);
    }

    let result = await fetch(
      "https://asteric.herokuapp.com/customer/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(customer),
      }
    );

    result = await result.json();

    if (result.status === 401) {
      setSessionExpired(true);
      setAddingUser(false);
      return;
    }

    fetchUser();
    setAddingUser(false);
    setOpenModal(false);
    addToast("User added Successfully", { appearance: "success" });
    console.log(`This is the ${JSON.stringify(result)}`);
    console.log(customer);
  };

  return (
    <>
      {sessionExpired ? (
        <div>
          <SessionExpired />
        </div>
      ) : (
        <div className="customersContainer">
          <CloseIcon
            style={{
              position: "absolute",
              top: "5",
              right: 10,
              color: "white",
            }}
            onClick={setOpenModal}
          />
          <Dashnav title="Add Customer" />
          <div className="addCustomerWrapper">
            <div className="addCustomerWrapperCont">
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
                    setCustomerInfo({
                      ...customerInfo,
                      lastName: e.target.value,
                    })
                  }
                  value={customerInfo.lastName}
                  placeholder="Lastname"
                />

                <div className="addCustomerInsideInput">
                  <input
                    className="addforminputin"
                    type="text"
                    name="phone"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    placeholder="Phone Number"
                  />
                  <div className="addforminputinImg spaceleft">
                    <Datepicker
                      selected={selectedBirthdayDate}
                      onChange={(date) => setSelectedBirthdayDate(date)}
                      className="Datepicker pa2 addformLast"
                      placeholderText="Select a date"
                      calendarClassName="rasta-stripes"
                      maxDate={new Date()}
                      isClearable
                      showYearDropdown
                      popperModifiers={{
                        offset: {
                          enabled: true,
                          offset: "0px, 0px",
                        },
                        preventOverflow: {
                          enabled: true,
                          escapeWithReference: false,
                          boundariesElement: "scrollParent",
                        },
                      }}
                    />
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
                  <Datepicker
                    selected={selectedAnniversaryDate}
                    onChange={(date) => setselectedAnniversaryDate(date)}
                    className="Datepicker pa2 addformLast"
                    placeholderText="Select anniversary date"
                    calendarClassName="rasta-stripes"
                    maxDate={new Date()}
                    isClearable
                    showYearDropdown
                    popperModifiers={{
                      offset: {
                        enabled: true,
                        offset: "0px, 0px",
                      },
                      preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                        boundariesElement: "scrollParent",
                      },
                    }}
                  />
                </div>

                <div className="submitcont">
                  <ReactBootStrap.Button
                    style={{
                      float: "right",
                    }}
                    variant="primary"
                    onClick={register}
                    disabled={addingUser}
                  >
                    <ReactBootStrap.Spinner
                      as="span"
                      className={addingUser ? "visible" : "visually-hidden"}
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually">
                      {addingUser ? "Loading..." : "Register"}
                    </span>
                  </ReactBootStrap.Button>
                </div>
              </form>

              <div className="horline"></div>

              <div className="uploadcent">
                <h3 style={{ fontStyle: `italic` }}>OR</h3>

                <div
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                    textAlign: `center`,
                    justifyContent: `space-between`,
                  }}
                >
                  <h5 style={{ marginRight: 20 }}>Upload a CSV file</h5>
                  <input
                    label="Upload CSV"
                    type="file"
                    name="upload"
                    accept=".csv"
                  />
                </div>
                <ReactBootStrap.Button
                  style={{
                    marginTop: 20,
                  }}
                  variant="primary"
                  onClick={regFromCSV}
                  disabled={addingUser}
                >
                  <ReactBootStrap.Spinner
                    as="span"
                    className={addingUser ? "visible" : "visually-hidden"}
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually">
                    {addingUser ? "Loading..." : "Register"}
                  </span>
                </ReactBootStrap.Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddCustomer;
