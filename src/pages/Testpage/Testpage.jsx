import React, { useState } from 'react'
import Menus from "../../components/menu/Menu"
import NavigationComponent from '../../components/navigationComponent/NavigationComponent'
import "./testpage.css"
function Testpage() {
    const [sidebar, setSideBar] = useState(false);
    const showSideBar = () => setSideBar(!sidebar);
    return (
        <div className="testContainer">


            <div className={sidebar ? "maindashboardContainerMenu" : "maindashboardContainerMenuClosed"}>
                <Menus sidebar={sidebar} controlSideBar={showSideBar} />
            </div>
            <div className={sidebar ? "maindashboardContainerDashboard" : "maindashboardContainerDashboardClosed"}>

                <div style={{
                    backgroundImage: `url(/images/smsbg.png)`
                    , backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
                    backgroundPosition: 'center right'
                }} className="dashboardContainer">
                    <NavigationComponent title="Template" />
                    <div className="scheduleDashboard">



                    
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Testpage
