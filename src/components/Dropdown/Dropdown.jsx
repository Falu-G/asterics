import React, {useState} from 'react'
import './Dropdown.css'
function Dropdown({tasks}) {


    const [messageType, setMessageType] = useState("View Task")

    return (
        <div class="dropdown">
            <h3 class="dropbtnn">{messageType}</h3>
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
