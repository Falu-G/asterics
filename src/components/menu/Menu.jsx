import React from 'react'
import './menu.css'
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { Subscriptions, Assessment, Message, Schedule, People, Settings, ExitToApp, MailOutline, Dashboard } from '@material-ui/icons'
function Menus({ controlSideBar, sidebar }) {
    return (
        <div className="menuContainer">
            <div className="menuContainerDesc">

                {sidebar ? <>

                    <div className="whitebg">
                    <img src= "images/ABlogo.png" alt=""/>
                    </div>
                   
                    <Link className="menuAsset">Assetrics CRM</Link>
                    <MenuIcon style = {{
                        color: `#fff`
                    }} onClick={controlSideBar} />
                </> : <MenuIcon style = {{
                        color: `#fff`
                    }}
                    onClick={controlSideBar} />
                }
            </div>

            <div className="menuHouse">
                <div className="firstMenu">

                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/maindashboard">
                        <img src="images/menu.png" alt="" />
                        <span>Main</span>
                    </Link>


                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/schedule">
                        <Dashboard />
                        <span>Dashboard</span>
                    </Link>



                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/customer">
                        <People />
                        <span>Customer</span>
                    </Link>

                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/sendsms">
                        <MenuIcon />
                        <span>Send SMS</span>
                    </Link>

                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="">
                        <MailOutline />
                        <span>Send Email</span>
                    </Link>

                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/schedule">
                        <Schedule />
                        <span>Schedules</span>
                    </Link>

                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/templates">
                        <Message />
                        <span>Templates</span>
                    </Link>


                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/templates">
                        <Subscriptions />
                        <span>Subscription</span>
                    </Link>


                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/templates">
                        <Assessment />
                        <span>Reports</span>
                    </Link>

                </div>

                <div className="secondMenu">


                </div>

                <div className="thirdMenu">
                    <Link className={sidebar ? "menuItem" : "menuItem closed"}>
                        <Settings />
                        <span>Settings</span>
                    </Link>

                    <Link className={sidebar ? "menuItem" : "menuItem closed"}>
                        <ExitToApp />
                        <span>LogOut</span>
                    </Link>
                </div>



            </div>
        </div>
    )
}

export default Menus
