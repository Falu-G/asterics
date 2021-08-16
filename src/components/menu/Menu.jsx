import React from 'react'
import './menu.css'
import MenuIcon from '@material-ui/icons/Menu';
function Menus() {
    return (
        <div className="menuContainer">
            <div className="menuContainerDesc">
                <span>Assetrics CRM</span>
                <MenuIcon />
            </div>

            <div className="menuHouse">
                <div className="firstMenu">

                    <div className="menuItem">
                        <MenuIcon />
                        <span>Main</span>
                    </div>

                    <div className="menuItem">
                        <MenuIcon />
                        <span>Dashboard</span>
                    </div>

                    <div className="menuItem">
                        <MenuIcon />
                        <span>Customer</span>
                    </div>

                    <div className="menuItem">
                        <MenuIcon />
                        <span>Send SMS</span>
                    </div>

                    <div className="menuItem">
                        <MenuIcon />
                        <span>Send Email</span>
                    </div>

                    <div className="menuItem">
                        <MenuIcon />
                        <span>Schedules</span>
                    </div>

                    <div className="menuItem">
                        <MenuIcon />
                        <span>Templates</span>
                    </div>

                </div>

                <div className="secondMenu">

                </div>

                <div className="thirdMenu">
                    <div className="menuItem">
                        <MenuIcon />
                        <span>Settings</span>
                    </div>

                    <div className="menuItem">
                        <MenuIcon />
                        <span>LogOut</span>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Menus
