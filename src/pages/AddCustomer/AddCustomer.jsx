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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },

//   button: {
//     border: "none",
//     padding: `20px`,
//     color: "white",
//     height: "50px",
//     background: "#18A0FB",
//     boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
//     borderRadius: `4px`,
//     zIndex: 4,
//   },
// }));

function AddCustomer({ openModal, setOpenModal }) {
  //const [openModal, setOpenModal] = useState(false);
  //var fileName = "myDocument.pdf";
  //var fileExtension = fileName.split('.').pop();

  const [sessionExpired, setSessionExpired] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    lastName: "",
    email: "",
  });
  const [selectedBirthdayDate, setSelectedBirthdayDate] = useState(null);
  const [selectedAnniversaryDate, setselectedAnniversaryDate] = useState(null);
 


  const [phoneNumber, setPhoneNumber] = useState("");

  const register = async (e) => {
    e.preventDefault();
    let customer = new CustomerInfo(
      customerInfo.name,
      customerInfo.lastName,
      customerInfo.email
    );

    if (selectedBirthdayDate != null) {
      customer.addDateOfBirth(
        selectedBirthdayDate.getDay() +
          "," +
          selectedBirthdayDate.toLocaleString("en-us", { month: "short" })
      );
    }

    if (selectedAnniversaryDate != null) {
      customer.addAnniversary(
        selectedAnniversaryDate.getDay() + "," + selectedAnniversaryDate.toLocaleString("en-us", { month: "short" })
      );
    }

    if (phoneNumber !== "") {
      customer.addPhoneNumber(phoneNumber);
    }
    const loggedInUser = localStorage.getItem("user-info");
    const userObj = JSON.parse(loggedInUser);
    const token = userObj.message[0].token;
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
      return;
    }

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
            }}
            onClick={setOpenModal}
          />
          <Dashnav title="Add Customer" />
          <div className="addCustomerWrapper">
            <div className="addCustomerWrapperCont">
              <input
                label="Upload CSV"
                type="file"
                name="upload"
                accept=".csv"
              />

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
      )}
    </>
  );
}

export default AddCustomer;
