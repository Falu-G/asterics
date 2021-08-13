import "./navbar.css";
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className="navbarContainer">
            <ul>
                <li><Link to="/contactus">FAQ</Link></li>
                <li><Link to="/contactus">Contact Us</Link></li>
                <li> <Link to = "/Team">Team</Link></li>
                <li><Link to = "/login">Login</Link></li>
            </ul>
        </div>
    )
}

export default Navbar
