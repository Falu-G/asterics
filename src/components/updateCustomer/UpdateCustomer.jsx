import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

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

function UpdateCustomer({ open, handleClose }) {
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
           

            <div id="transition-modal-description" sx={{ mt: 2 }}>


            </div>
            <div
              component="form"
              style = {
                  {
                   
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "20px"
                    
                  }
              }
              sx={{
                width: "25ch",
              }}
              spacing={2}
              noValidate
              autoComplete="off"
            >
             
              <TextField
                hiddenLabel
                style={{ width:300}}
                id="filled-hidden-label-normal"
                defaultValue="Bamidele"
                variant="filled"
              />
               <TextField
                hiddenLabel
                style={{ width:300}}
                id="filled-hidden-label-normal"
                defaultValue="Omonayin"
               
                variant="filled"
              />
            </div>

            <div
              component="form"
              style = {
                  {
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    
                  }
              }
              sx={{
                width: "25ch",
              }}
              spacing={2}
              noValidate
              autoComplete="off"
            >
             
              <TextField
              style={{ width:300}}
                hiddenLabel
                id="filled-hidden-label-normal"
                defaultValue="Phone Number"
                maxLength="11"
                variant="filled"
              />
               <TextField
               style={{ width:300}}
                hiddenLabel
                id="filled-hidden-label-normal"
                defaultValue="Normal"
                variant="filled"
              />
            </div>
            <TextField
               style={{ 
                   width:'100%',
                   marginTop: "20px"
                }}
                hiddenLabel
                disabled
                id="filled-hidden-label-normal"
                defaultValue="bamideleomonayin@gmail.com"
                variant="filled"
              />
            
            <Button style = {{
                marginTop: "20px",
                float:'right'
            }}variant="contained">UPDATE</Button>
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default UpdateCustomer;
