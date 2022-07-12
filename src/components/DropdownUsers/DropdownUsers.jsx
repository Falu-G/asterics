import "./dropdownuser.css";

function DropdownUsers({ options, setIsActive,isActive,selected,setSelected}) {
  
  return (
    <div className="dropdownx" style = {{
      width: "250px",
    }}>
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
                setSelected(option);
                setIsActive(false);
              }}
            >
              {`${option}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownUsers;
