import React from 'react'
import "./Maindashboard.css"
import Menus from "../../components/menu/Menu"
import Dashboard from "../../components/DashboardMain/Dashboard"
function Maindashboard() {
    return (
        <div className="maindashboardContainer">
            <div className="maindashboardContainerMenu">
                <Menus />
            </div>
            <div className="maindashboardContainerDashboard">
                <Dashboard />
            </div>
        </div>
    )
}

export default Maindashboard
