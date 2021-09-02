import React from 'react'
import './white.css'

function White({title}) {
    return (
        <div className = "whiteNavbar">
             <h4 className = "whiteNavbar-title" >{title}</h4>
            <div className="whiteNavbar-Logo">
                <img src="images/ALogo.png" alt="" />
            </div>
        </div>
    )
}

export default White
