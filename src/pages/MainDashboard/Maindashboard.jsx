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

  //var retrievedPerson = JSON.parse(localStorage.getItem('user-info'));
  // useEffect(() => {
  //     // POST request using fetch inside useEffect React hook
  //     const requestOptions = {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'Accept': 'application/json',
  //             'Authorization': localStorage.getItem(''),
  //         },
  //         body: JSON.stringify({
  //             title: 'React Hooks POST Request Example'
  //         })
  //     };
  //     fetch('https://reqres.in/api/posts', requestOptions)
  //         .then(response => response.json())
  //         .then(data => setPostId(data.id));

  // // empty dependency array means this effect will only run once (like componentDidMount in classes)
  // }, []);

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
