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
} from "@material-ui/icons";

function Menus({ controlSideBar }) {
  const value = useContext(MenuContext);
  let history = useHistory();
  let menustate = value.sidebar;
  console.log("This is coming from menus " + value.sidebar);
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
        <div className="firstMenu">
          <Link
            className={menustate ? "menuItem" : "menuItem closed"}
            to="/maindashboard"
          >
            <Dashboard />
            <span>Dashboard</span>
          </Link>

          <Link
            className={menustate ? "menuItem" : "menuItem closed"}
            to="/customer"
          >
            <People />
            <span>Customer</span>
          </Link>

          <Link
            className={menustate ? "menuItem" : "menuItem closed"}
            to="/sendsms"
          >
            <MenuIcon />
            <span>Send SMS</span>
          </Link>

          <Link
            className={menustate ? "menuItem" : "menuItem closed"}
            to="/sendemail"
          >
            <MailOutline />
            <span>Send Email</span>
          </Link>

          <Link
            className={menustate ? "menuItem" : "menuItem closed"}
            to="/schedule"
          >
            <Schedule />
            <span>Schedules</span>
          </Link>

          <Link
            className={menustate ? "menuItem" : "menuItem closed"}
            to="/templates"
          >
            <Message />
            <span>Templates</span>
          </Link>

          <Link
            className={menustate ? "menuItem" : "menuItem closed"}
            to="/subscription"
          >
            <Subscriptions />
            <span>Subscription</span>
          </Link>

          <Link
            className={menustate ? "menuItem" : "menuItem closed"}
            to="/report"
          >
            <Assessment />
            <span>Reports</span>
          </Link>
        </div>

        <div className="secondMenu"></div>

        <div className="thirdMenu">
          <Link className={menustate ? "menuItem" : "menuItem closed"}>
            <Settings />
            <span>Settings</span>
          </Link>

          <Link
            className={menustate ? "menuItem" : "menuItem closed"}
            onClick={() => {
              localStorage.removeItem("user-info");
              history.push("/login");
            }}
          >
            <ExitToApp />
            <span>LogOut</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menus;
