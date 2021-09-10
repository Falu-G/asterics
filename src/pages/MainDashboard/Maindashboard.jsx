import React, { useEffect, useContext } from "react";
import { MenuContext } from "../../components/MenuContext";
import "./Maindashboard.css";
import Menus from "../../components/menu/Menu";
import Dashboard from "../../components/DashboardMain/Dashboard";
import { useHistory } from "react-router-dom";
function Maindashboard() {
 
  const {sidebar,setSideBar} = useContext(MenuContext);
  console.log("This is siderbar "+sidebar);
  const showSideBar = () => {
    setSideBar(!sidebar);
    
  };
  const history = useHistory();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user-info");
    const userObj = JSON.parse(loggedInUser);
    const token = userObj.message[0].token;
    console.log(`This is token ${token}`);

    if (!token) {
      history.push("/login");
    }
  });

  return (
    <div className="maindashboardContainer">
      <div
        className={
          sidebar
            ? "maindashboardContainerMenu"
            : "maindashboardContainerMenuClosed"
        }
      >
        <Menus sidebar={sidebar} controlSideBar={showSideBar} />
      </div>
      <div
        className={
          sidebar
            ? "maindashboardContainerDashboard"
            : "maindashboardContainerDashboardClosed"
        }
      >
        <Dashboard />
      </div>
    </div>
  );
}

export default Maindashboard;
