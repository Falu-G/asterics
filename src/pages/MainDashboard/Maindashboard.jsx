import React from 'react'
import "./Maindashboard.css"
import Menus from "../../components/menu/Menu"
import Dashboard from "../../components/DashboardMain/Dashboard"
import { useState } from 'react'
function Maindashboard() {
    const [sidebar, setSideBar] = useState(false);

    const showSideBar = ()=> setSideBar(!sidebar)
    return (
        <div className="maindashboardContainer">
            <div className={sidebar ? "maindashboardContainerMenu" : "maindashboardContainerMenuClosed"}>
                <Menus sidebar = {sidebar} controlSideBar = {showSideBar}/>
            </div>
            <div className={sidebar ? "maindashboardContainerDashboard" : "maindashboardContainerDashboardClosed"}>
                <Dashboard />
            </div>
        </div>
    )
}

export default Maindashboard
