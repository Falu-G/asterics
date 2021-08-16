import React from 'react'
import './navigationComponent.css'
function NavigationComponent({title}) {
    return (
        <div className="navigationComponentContainer">
            <h4>{title}</h4>
            <div className="navigationComponent-Logo">
                <img src="images/ALogo.png" alt="" />
            </div>
        </div>
    )
}

export default NavigationComponent
