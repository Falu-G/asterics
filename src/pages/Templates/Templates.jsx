import React from 'react'
import { useState } from 'react'
import Menus from "../../components/menu/Menu"
import NavigationComponent from '../../components/navigationComponent/NavigationComponent'
function Templates() {

    const [sidebar, setSideBar] = useState(false);

    const showSideBar = () => setSideBar(!sidebar)
    return (
        <div className="templatesContainer">
            <div className={sidebar ? "maindashboardContainerMenu" : "maindashboardContainerMenuClosed"}>
                <Menus sidebar={sidebar} controlSideBar={showSideBar} />
            </div>
            <div className={sidebar ? "maindashboardContainerDashboard" : "maindashboardContainerDashboardClosed"}>


                <div style={{
                    backgroundImage: `url(/images/smsbg.png)`
                    , backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
                    backgroundPosition: 'center right'
                }} className="dashboardContainer">
                    <NavigationComponent title="Dashboard" />
                    <div className="scheduleDashboard"></div>

                </div>

            </div>
        </div>
    )
}

export default Templates
