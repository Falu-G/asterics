import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useToasts } from "react-toast-notifications";
import CustomerInfo from "../../classes/CustomerInfo";

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
  setTokenValid,
  setAllCustomers,
  setSessionExpired,
}) {



  
  const fetchUser = (id) => {
    fetch(`https://asteric.herokuapp.com/customer${id}`, {
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

  let customer = new CustomerInfo(user.firstname,user.lastname,+user.email)
  const [customerInfo, setCustomerInfo] = useState(customer);
  const [birthdayDate, setBirthdayDate] = useState(null);
  const [anniversaryDate, setAnniversaryDate] = useState(null);
  const [addingUser, setAddingUser] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { addToast } = useToasts();
  const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  const token = userObj.message[0].token;

  const updateCustomer = async (id) => {
    setAddingUser(true);
    if ( birthdayDate != null) {
      customerInfo.addDateOfBirth(
        birthdayDate.getDay() +
          "," +
          birthdayDate.toLocaleString("en-us", { month: "short" })
      );
    }

    if (anniversaryDate != null) {

      customerInfo.addAnniversary(
        anniversaryDate.getDay() +
          "," +
          anniversaryDate.toLocaleString("en-us", { month: "short" })
      );
    }

    if (phoneNumber !== "") {
      customerInfo.addPhoneNumber(phoneNumber);
    }

    // let result = await fetch(`https://asteric.herokuapp.com/customer/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: "Bearer " + token,
    //   },
    //   body: JSON.stringify(customer),
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


    console.log("Customer info "+customerInfo.firstname);
    console.log("Customer info "+customerInfo.email);
    console.log("Customer info "+customerInfo.lastname);
    console.log("Customer info "+customerInfo.birthday);
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
                  setCustomerInfo({ ...customerInfo, firstname: e.target.value });
                }}
                variant="filled"
              />
              <TextField
                hiddenLabel
                style={{ width: 300 }}
                id="filled-hidden-label-normal"
                defaultValue={user.lastname}
                onChange={(e) => {
                  setCustomerInfo({
                    ...customerInfo,
                    lastname: e.target.value,
                  });
                }}
                value={customerInfo.lastname}
                variant="filled"
              />
            </div>

            <div
              component="form"
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "row",
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
                style={{ width: 300 }}
                hiddenLabel
                id="filled-hidden-label-normal"
                defaultValue={user.phone}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                value = {phoneNumber}
                maxLength="11"
                variant="filled"
              />
              <TextField
                style={{ width: 300 }}
                hiddenLabel
                id="filled-hidden-label-normal"
                onChange={(e) => {
                  setBirthdayDate(e.target.value);
                }}
                value={birthdayDate}
                defaultValue={user.birthday}
                variant="filled"
              />
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

            <Button
              style={{
                marginTop: "20px",
                float: "right",
              }}
              onClick={() => updateCustomer()}
              variant="contained"
            >
              UPDATE
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default UpdateCustomer;
