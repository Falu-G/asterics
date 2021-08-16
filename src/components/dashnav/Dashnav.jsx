import React from 'react'
import './dashnav.css'

function Dashnav({title}) {
    return (
        <div className = "dashnavContainer">
            <span className = "dashnavtitle">{title}</span>
        </div>
    )
}

export default Dashnav
