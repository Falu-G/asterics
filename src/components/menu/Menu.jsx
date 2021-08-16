import React from 'react'
import './menu.css'
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
function Menus() {
    return (
        <div className="menuContainer">
            <div className="menuContainerDesc">
                <Link className="menuAsset">Assetrics CRM</Link>
                <MenuIcon />
            </div>

            <div className="menuHouse">
                <div className="firstMenu">

                    <Link className="menuItem" to = "/maindashboard">
                        <MenuIcon />
                        <span>Main</span>
                    </Link> 

                   
                        <Link className="menuItem" to = "/dashboard">
                        <MenuIcon />
                        <span>Dashboard</span>
                        </Link>
                        
                    

                    <Link className="menuItem" to = "/customer">
                        <MenuIcon />
                        <span>Customer</span>
                    </Link>

                    <Link className="menuItem" to ="/sendsms">
                        <MenuIcon />
                        <span>Send SMS</span>
                    </Link>

                    <Link className="menuItem" to = "/sendemai">
                        <MenuIcon />
                        <span>Send Email</span>
                    </Link>

                    <Link className="menuItem" to = "/schedule">
                        <MenuIcon />
                        <span>Schedules</span>
                    </Link>

                    <Link className="menuItem" to = "">
                        <MenuIcon />
                        <span>Templates</span>
                    </Link>

                </div>

                <div className="secondMenu">


                </div>

                <div className="thirdMenu">
                    <Link className="menuItem">
                        <MenuIcon />
                        <span>Settings</span>
                    </Link>

                    <Link className="menuItem">
                        <MenuIcon />
                        <span>LogOut</span>
                    </Link>
                </div>



            </div>
        </div>
    )
}

export default Menus
