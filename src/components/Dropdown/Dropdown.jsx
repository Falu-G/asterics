import React, {useState} from 'react'
import './Dropdown.css'
function Dropdown({tasks}) {


    const [messageType, setMessageType] = useState("View Task")

    return (
        <div class="dropdown">
            <h6 class="dropbtnn">{messageType}</h6>
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
