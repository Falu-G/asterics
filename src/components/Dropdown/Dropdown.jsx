import React, {useState} from 'react'
import './Dropdown.css'
function Dropdown({setActiv}) {


    const [messageType, setMessageType] = useState("Select Message Type")
   

    const options = ["SMS", "Email"]

    return (
        <div class="dropdown">
            <button class="dropbtn">{messageType}</button>
            <div class="dropdown-content">

                {options.map((option, index) => (<>
                <h3 onClick={()=>{
                    setMessageType(option);
                   
                    }}>{option}</h3>
                </>))}
                
            </div>
        </div>
    )

    
}

export default Dropdown
