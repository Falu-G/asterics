//import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
//import { useToasts } from "react-toast-notifications";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./UpdateCustomer.css";
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
  setTokenValid,
  setAllCustomers,
  setSessionExpired,
}) {
  // const fetchUser = (id) => {
  //   fetch(`https://asteric.herokuapp.com/customer${id}`, {
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
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("This is the error that was caught" + err);
  //     });
  // };

  //const { addToast } = useToasts();
  //const [addUser, setAddUser] = useState(false);
  // const loggedInUser = localStorage.getItem("user-info");
  // const userObj = JSON.parse(loggedInUser);
  //const token = userObj.message[0].token;

  const convertStringToDate = (dateStr) => {
    var parts = dateStr.split("-");
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
    console.log(mydate.toDateString());
    return mydate;
  };
  const updateCustomer = async (id) => {
    //setAddUser(true);

    // let result = await fetch(`https://asteric.herokuapp.com/customer/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: "Bearer " + token,
    //   },
    //   body: JSON.stringify(user),
    // });

    // result = await result.json();

    // if (result.status === 401) {
    //   setSessionExpired(true);
    //   setAddingUser(false);
    // } else if (result.status === 200) {
    //   fetchUser();
    //   setAddingUser(false);
    //   addToast("User added Successfully", { appearance: "success" });
    // }
    console.log("Customer info " + user.firstname);
    console.log("Customer info " + user.email);
    console.log("Customer info " + user.lastname);
    console.log("Customer info " + user.birthday);
    console.log("Customer info " + user.anniversary);
    console.log("Customer info " + user.phone);
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
                defaultValue={user.anniversaryDate}
                className="updatebirthday"
                placeholderText="Select anniversary date"
                value={user.birthday}
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
                selected={convertStringToDate("2014-04-03")}
                //onSelect={handleDateSelect} //when day is clicked
                //onChange={handleDateChange}
                className="updateanniversary"
                placeholderText="Select anniversary date"
                value={user.anniversary}
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

              <Button onClick={() => updateCustomer()} variant="contained">
                UPDATE
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default UpdateCustomer;
