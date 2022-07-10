import React, { useContext } from "react";
import "./menu.css";
import MenuIcon from "@material-ui/icons/Menu";
import { MenuContext } from "../MenuContext";
import { Link, useHistory } from "react-router-dom";
import {
  Subscriptions,
  Assessment,
  Message,
  Schedule,
  People,
  Settings,
  ExitToApp,
  MailOutline,
  Dashboard,
  Send,
} from "@material-ui/icons";

//import SendIcon from '@mui/icons-material/Send';
const MenusList = [
  {
    to: "maindashboard",
    icon: "Dashboard",
    name: "Dashboard",
  },

  {
    to: "customer",
    icon: "People",
    name: "Customer",
  },

  {
    to: "sendsms",
    icon: "Send",
    name: "Send SMS",
  },

  {
    to: "sendemail",
    icon: "MailOutline",
    name: "Send Email",
  },

  {
    to: "schedule",
    icon: "Schedule",
    name: "Schedules",
  },

  {
    to: "templates",
    icon: "Message",
    name: "Templates",
  },

  // {
  //   to: "subscription",
  //   icon: "Subscriptions",
  //   name: "Subscription",
  // },

  // {
  //   to: "report",
  //   icon: "Assessment",
  //   name: "Reports",
  // },

  {
    to: "subscription",
    icon: "Settings",
    name: "Settings",
  },

  {
    to: "login",
    icon: "ExitToApp",
    name: "LogOut",
  },
];

function Menus({ controlSideBar }) {
  const value = useContext(MenuContext);
  let history = useHistory();
  //const [activeClicked, setActiveClicked ] =  useState(true)
  const DisplayIcon = (iconName) => {
    switch (iconName.IconName) {
      case "Dashboard":
        return <Dashboard />;
      case "Subscriptions":
        return <Subscriptions />;
      case "Assessment":
        return <Assessment />;
      case "Message":
        return <Message />;
      case "Schedule":
        return <Schedule />;
      case "People":
        return <People />;
      case "Settings":
        return <Settings />;
      case "ExitToApp":
        return <ExitToApp />;
      case "MailOutline":
        return <MailOutline />;
      case "Send":
        return <Send />;
      default:
        return null;
    }
  };

  const DisplayContent = ({ menuList }) => {
    return (
      <>
        <div className="firstMenu">
          {menuList.map((item) =>
            item.icon === "Dashboard" ||
            item.icon === "Subscriptions" ||
            item.icon === "Assessment" ||
            item.icon === "Message" ||
            item.icon === "Schedule" ||
            item.icon === "People" ||
            item.icon === "MailOutline" ||
            item.icon === "Send" ? (
              <Link
                className={
                  menustate ? "menuItem activeMenu" : "menuItem closed"
                }
                to={item.to}
              >
                <DisplayIcon IconName={item.icon} />
               
                <span>{item.name}</span>
              </Link>
            ) : null
          )}
        </div>

        <div className="secondMenu"></div>
        <div className="thirdMenu">
          {menuList.map((item) => {
            if (item.icon === "Settings") {
              return (
                <Link
                  className={menustate ? "menuItem" : "menuItem closed"}
                  to={item.to}
                >
                  <Settings />
                  
                  <span>{item.name}</span>
                </Link>
              );
            } else if (item.icon === "ExitToApp") {
              return (
                <Link
                  className={menustate ? "menuItem" : "menuItem closed"}
                  onClick={() => {
                    localStorage.removeItem("user-info");
                    history.push("/login");
                  }}
                >
                  <ExitToApp />
                  <span>{item.name}</span>
                </Link>
              );
            } else {
              return null;
            }
          })}

        </div>
      </>
    );
  };

  let menustate = value.sidebar;
 
  return (
    <div className="menuContainer">
      <div className="menuContainerDesc">
        {menustate ? (
          <>
            <div className="whitebg">
              <img src="images/ABlogo.png" alt="" />
            </div>

            <Link className="menuAsset">Asterix CRM</Link>
            <MenuIcon
              style={{
                color: `#fff`,
              }}
              onClick={controlSideBar}
            />
          </>
        ) : (
          <MenuIcon
            style={{
              color: `#fff`,
              marginLeft: "10px",
            }}
            onClick={controlSideBar}
          />
        )}
      </div>

      <div className="menuHouse">
        <DisplayContent menuList={MenusList} />
      </div>
    </div>
  );
}

export default Menus;
