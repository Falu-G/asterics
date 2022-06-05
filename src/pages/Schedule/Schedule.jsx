import React, { useState } from 'react'
import Menus from "../../components/menu/Menu"
import "./schedule.css"
import NavigationComponent from '../../components/navigationComponent/NavigationComponent'
function Schedule() {

    const [sidebar, setSideBar] = useState(true);
    const showSideBar = () => setSideBar(!sidebar);

    return (
        <div className="sc-Container">
            <div className={sidebar ? "maindashboardContainerMenu" : "maindashboardContainerMenuClosed"}>
                <Menus sidebar={sidebar} controlSideBar={showSideBar} />
            </div>

            <div className={sidebar ? "maindashboardContainerDashboard" : "maindashboardContainerDashboardClosed"}>

                <div style={{
                    backgroundImage: `url(/images/smsbg.png)`
                    , backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
                    backgroundPosition: 'center right'
                }} className="dashboardContainer">
                    <NavigationComponent title="Schedule" />

                    
                </div>
            </div>
        </div>
    )
}

export default Schedule
