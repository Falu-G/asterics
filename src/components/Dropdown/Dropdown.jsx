import React, {useState} from 'react'
import './Dropdown.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function Dropdown({tasks}) {


    const [messageType, setMessageType] = useState("View Task")

    return (
        <div class="dropdown">
            <div style = {{
                display : `flex`,
                justifyContent:`space-between`,
                alignItems: "center",
               
            }}>

            <h6 class="dropbtnn">{messageType}</h6>
            <ArrowDropDownIcon sx = {{
                color: `white`,
              
            }}/>
            </div>
        
            <div class="dropdown-content">

                {tasks.map((task, index) => (<>
                <span onClick={()=>{
                    setMessageType(task);
                   
                    }}>{task}</span>
                </>))}
                
            </div>
        </div>
    )

    
}

export default Dropdown
