import React, { useState } from "react";
import "./dropdownuser.css";
function DropdownUsers({ options, setIsActive,isActive,selected,setSelected}) {
  
  // const options = ["Rue","Vue","Javascript"]
  return (
    <div className="dropdownx">
      <div className="dropdownx-btn" onClick={() => setIsActive(!isActive)}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdownx-content">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdownx-item"
              onClick={() => {
                setSelected(`${option.firstname} ${option.lastname}`);
                setIsActive(false);
              }}
            >
              {`${option.firstname} ${option.lastname}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownUsers;
