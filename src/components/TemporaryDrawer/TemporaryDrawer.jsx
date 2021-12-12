import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import QuizIcon from "@mui/icons-material/Quiz";
import GroupsIcon from "@mui/icons-material/Groups";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LoginIcon from '@mui/icons-material/Login';
import { useHistory } from 'react-router-dom';
import Link from '@mui/material/Link';

//const preventDefault = (event) => event.preventDefault();

function Links({nameoflink, logMeIn}) {
  return (
    <Box
      sx={{
        typography: 'body1',
        '& > :not(style) + :not(style)': {
          ml: 2,
        },
      }}
     
    >
   
      <Link href={logMeIn} variant="body2">
        {nameoflink}
      </Link>
    </Box>
  );
}


export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const history = useHistory();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const DisplayIcon = ({ icon }) => {
    switch (icon) {
      case "FAQ":
        return <QuizIcon />;
      case "Contact Us":
        return <ContactMailIcon />;
      case "Team":
        return <GroupsIcon />;
        case "Login":
            return <LoginIcon />;
      default:
        return null;
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["FAQ", "Contact Us", "Team", "Login"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <DisplayIcon icon={text} onClick = {()=> {
history.push("/login")
console.log("I am here")
              } }/>

              
            </ListItemIcon>

            <Links nameoflink = {text} logMeIn = "../Login/Login"/>
           
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)} />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
