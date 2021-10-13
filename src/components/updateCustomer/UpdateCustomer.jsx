import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useToasts } from "react-toast-notifications";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import dateFormat from "dateformat";
import "./UpdateCustomer.css";
import * as ReactBootStrap from "react-bootstrap";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "700px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UpdateCustomer({
  open,
  handleClose,
  user,
  setUser,
  fetchBusiness,
  setSessionExpired,
}) {


  const { addToast } = useToasts();
  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;

  // const convertStringToDate = (dateStr) => {
  //   var parts = dateStr.split("/");
  //   // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
  //   // January - 0, February - 1, etc.
  //   var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
  //   console.log(mydate.toDateString());
  //   return mydate;
  // };

  const [selectedBirthdayDate, setSelectedBirthdayDate] = useState(null);
  const [selectedAnniversaryDate, setselectedAnniversaryDate] = useState(null);
  const [Updatinguser, setUpdatingUser] = useState(false);






  // const fetchUser = () => {
  //   console.log()
  //   fetch(`https://asteric.herokuapp.com/customer`, {
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
  //         setAllCustomers(data);
  //         console.log("This is going on "+data)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("This is the error that was caught" + err);
  //     });
  //   // fetch(`https://asteric.herokuapp.com/customer${id}`, {
  //   //   method: "GET",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //     Accept: "application/json",
  //   //     Authorization: "Bearer " + token,
  //   //   },
  //   // })
  //   //   .then((response) => response.json())
  //   //   .then((data) => {
  //   //     if (data.message === "Invalid Token") {
  //   //       setTokenValid(true);
  //   //     } else {
  //   //       setAllCustomers(data);
  //   //     }
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log("This is the error that was caught" + err);
  //   //   });
  // };



  const updateCustomer = async (id) => {
    setUpdatingUser(true);
    console.log(`The value of the id is ${id}`);
    let result = await fetch(`https://asteric.herokuapp.com/customer/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(user),
    });

    result = await result.json();

    if (result.status === 401) {
      setUpdatingUser(false);
      setSessionExpired(true);
      handleClose();
    } else if (result.status === 200) {
      fetchBusiness()
      setUpdatingUser(false);
      handleClose();
      addToast("User updated Successfully", { appearance: "success" });
    } else {
      handleClose();
     
    
      setUpdatingUser(false);
      addToast(result.message, { appearance: "success" });
    }
  };

  return (
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Update Customers info
            </Typography>

            <div id="transition-modal-description" sx={{ mt: 2 }}></div>
            <div
              component="form"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
              sx={{
                width: "25ch",
              }}
              spacing={2}
              noValidate
              autoComplete="off"
            >
              <TextField
                hiddenLabel
                style={{ width: 300 }}
                id="filled-hidden-label-normal"
                defaultValue={user.firstname}
                onChange={(e) => {
                  setUser({
                    ...user,
                    firstname: e.target.value,
                  });
                }}
                variant="filled"
              />
              <TextField
                hiddenLabel
                style={{ width: 300 }}
                id="filled-hidden-label-normal"
                defaultValue={user.lastname}
                onChange={(e) => {
                  setUser({
                    ...user,
                    lastname: e.target.value,
                  });
                }}
                value={user.lastname}
                variant="filled"
              />
            </div>

            <div
              component="form"
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              sx={{
                width: "25ch",
              }}
              spacing={2}
              noValidate
              autoComplete="off"
            >
              <TextField
                style={{ width: `600px` }}
                hiddenLabel
                id="filled-hidden-label-normal"
                defaultValue={user.phone}
                onChange={(e) => {
                  setUser({
                    ...user,
                    phone: e.target.value,
                  });
                }}
                value={user.phoneNumber}
                maxLength="11"
                variant="filled"
              />

              <Datepicker
                label="Basic example"
                selected={selectedBirthdayDate}
                onSelect={setSelectedBirthdayDate} //when day is clicked
                onChange={(date) => setSelectedBirthdayDate(date)} //only when value has changed
                defaultValue={user.birthday}
                value={`Date of birth: ${user.birthday}`}
                className="updatebirthday"
                placeholderText="Select anniversary date"
                disabled
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
              {/* <TextField
                style={{ width: 300 }}
                hiddenLabel
                id="filled-hidden-label-normal"
                onChange={(e) => {
                  setUser({
                    ...user,
                    birthdayDate: e.target.value,
                  });
                }}
                value={user.birthday}
                defaultValue={user.birthday}
                variant="filled"
              /> */}
            </div>
            <TextField
              style={{
                width: "100%",
                marginTop: "20px",
              }}
              hiddenLabel
              disabled
              id="filled-hidden-label-normal"
              defaultValue={user.email}
              value={user.email}
              variant="filled"
            />

            <div
              style={{
                marginTop: "20px",
                display: `flex`,
                alignItems: "center",
                width: `100%`,
              }}
            >
              <Datepicker
                label="Basic example"
                defaultValue={user.anniversaryDate}
                selected={selectedAnniversaryDate}
                value={`Date of Anniversary: ${user.anniversary}`}
                onSelect={(date) => setselectedAnniversaryDate(date)}
                onChange={(date) => setselectedAnniversaryDate(date)}
                className="updateanniversary"
                placeholderText="Select anniversary date"
                disabled
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

              <ReactBootStrap.Button
                style={{ width: "200px" }}
                variant="primary"
                onClick={() => updateCustomer(user.id)}
                disabled={Updatinguser}
              >
                <ReactBootStrap.Spinner
                  as="span"
                  className={Updatinguser ? "visible" : "visually-hidden"}
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually">
                  {Updatinguser ? "UPDATING..." : "UPDATE"}
                </span>
              </ReactBootStrap.Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default UpdateCustomer;
