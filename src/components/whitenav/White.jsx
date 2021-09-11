import React from "react";
import "./white.css";

function White({ title }) {
  return (
    <div className="whiteNavbar">


      <h4 className="whiteNavbar-title">{title}</h4>
      
      <div  className="whiteNavbar-Logo"> 

      <div className="whiteNavbar-container">
      <img src="images/ALogo.png" alt="" />
      </div>

      <div class="wn-dropdown-content">
          <a href="#Profile">Profile</a>
          <a href="#Settings">Settings</a>
          <a href="#Logout">LogOut</a>
        </div>


      </div>
    
    </div>
  );
}

export default White;
