import React, { useState } from "react";
import "./addCustomer.css";
import CloseIcon from "@material-ui/icons/Close";
import "react-calendar/dist/Calendar.css";
import CustomerInfo from "../../classes/CustomerInfo";
import SessionExpired from "../SessionExpired/SessionExpired";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as ReactBootStrap from "react-bootstrap";
import { useToasts } from "react-toast-notifications";

function AddCustomer({ setOpenModal, setTokenValid, setAllCustomers }) {
  const [sessionExpired, setSessionExpired] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    lastName: "",
    email: "",
  });
  const [selectedBirthdayDate, setSelectedBirthdayDate] = useState(null);
  const [selectedAnniversaryDate, setselectedAnniversaryDate] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [addingUser, setAddingUser] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [upperEmpty, setUpperEmpty] = useState(false);
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

  const checkEmptiness = ()=>{
    if( (customerInfo.name.isEmpty()) || (customerInfo.lastName.isEmpty()) || (customerInfo.email.isEmpty()))
      return false;
      else {
        return true
      } 
  
  }
  

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const FileUpload = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
        
          <p style={{ marginRight: 20 }}>Upload a CSV file</p>
        </div>
      );
    }
  };


  const register = async (e) => {
    e.preventDefault();
    setAddingUser(true);

    if (selectedFile !== null) {
      // "https://asteric.herokuapp.com/customer/bulkCustomerCSVUpload",

      let result = await fetch(
        "https://asteric.herokuapp.com/customer/bulkCustomerCSVUpload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(selectedFile),
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
    } else {
      let customer = new CustomerInfo(
        customerInfo.name,
        customerInfo.lastName,
        customerInfo.email
      );

      if (selectedBirthdayDate != null) {
        //let date = dateFormat(selectedBirthdayDate, "dd/mm/yyyy");
        const day = selectedBirthdayDate.getDate();
        const month = selectedBirthdayDate.toLocaleString("default", {
          month: "short",
        });
        customer.addDateOfBirth(day + "," + month);
        //customer.addDateOfBirth(date);
      }

      if (selectedAnniversaryDate != null) {
        // let datee = dateFormat(selectedAnniversaryDate, "dd/mm/yyyy");
        const day = selectedAnniversaryDate.getDate();
        const month = selectedAnniversaryDate.toLocaleString("default", {
          month: "short",
        });
        customer.addAnniversary(day + "," + month);
        console.log(day + "," + month);
        //console.log(datee);
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
    }
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
          {/* <Dashnav title="Add Customer" /> */}
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

                {}
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
                  {/* <h5 style={{ marginRight: 20 }}>Upload a CSV file</h5> */}

                  <FileUpload/>
                  <input
                    label="Upload CSV"
                    type="file"
                    name="upload"
                    accept=".csv"
                    disabled = {checkEmptiness}
                    onChange={onFileChange}
                  />
                </div>
                {}
              </div>

              <ReactBootStrap.Button
                style={{
                  marginTop: 20,
                  float: "right",
                  width: `100%`,
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
          </div>

          {/* <AddClients/> */}
        </div>
      )}
    </>
  );
}

export default AddCustomer;


  // const regFromCSV = async () => {
  //   let result = await fetch(
  //     "https://asteric.herokuapp.com/customer/register",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //       body: JSON.stringify(),
  //     }
  //   );

  //   result = await result.json();

  //   if (result.status === 401) {
  //     setSessionExpired(true);
  //     setAddingUser(false);
  //     return;
  //   }

  //   fetchUser();
  //   setAddingUser(false);
  //   setOpenModal(false);
  //   addToast("User added Successfully", { appearance: "success" });
  //   console.log(`This is the ${JSON.stringify(result)}`);
  //   console.log();
  // };

  /* <ReactBootStrap.Button
                  style={{
                    marginTop: 20,
                    float: "right",
                  }}
                  variant="primary"
                  onClick={"regFromCSV"}
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
                </ReactBootStrap.Button> */


                /* <div className="submitcont">
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
                </div> */