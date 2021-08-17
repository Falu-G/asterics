import React from 'react'
import './menu.css'
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
function Menus({controlSideBar,sidebar}) {
    return (
        <div className="menuContainer">
            <div className="menuContainerDesc">

                {sidebar ? <>
                    <Link className="menuAsset">Assetrics CRM</Link>
                    <CloseIcon  onClick = {controlSideBar}/>
                </> : <MenuIcon 
                onClick = {controlSideBar}/>}



            </div>

            <div className="menuHouse">
                <div className="firstMenu">

                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/maindashboard">
                        <MenuIcon />
                        <span>Main</span>
                    </Link>


                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/dashboard">
                        <MenuIcon />
                        <span>Dashboard</span>
                    </Link>



                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/customer">
                        <MenuIcon />
                        <span>Customer</span>
                    </Link>

                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/sendsms">
                        <MenuIcon />
                        <span>Send SMS</span>
                    </Link>

                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/sendemai">
                        <MenuIcon />
                        <span>Send Email</span>
                    </Link>

                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="/schedule">
                        <MenuIcon />
                        <span>Schedules</span>
                    </Link>

                    <Link className={sidebar ? "menuItem" : "menuItem closed"} to="">
                        <MenuIcon />
                        <span>Templates</span>
                    </Link>

                </div>

                <div className="secondMenu">


                </div>

                <div className="thirdMenu">
                    <Link className={sidebar ? "menuItem" : "menuItem closed"}>
                        <MenuIcon />
                        <span>Settings</span>
                    </Link>

                    <Link className={sidebar ? "menuItem" : "menuItem closed"}>
                        <MenuIcon />
                        <span>LogOut</span>
                    </Link>
                </div>



            </div>
        </div>
    )
}

export default Menus
