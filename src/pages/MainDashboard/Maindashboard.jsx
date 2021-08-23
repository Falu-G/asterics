import React, {useEffect} from 'react'
import "./Maindashboard.css"
import Menus from "../../components/menu/Menu"
import Dashboard from "../../components/DashboardMain/Dashboard"
import { useState } from 'react'
function Maindashboard() {
    const [sidebar, setSideBar] = useState(false);
    const showSideBar = ()=> setSideBar(!sidebar)
    //var retrievedPerson = JSON.parse(localStorage.getItem('user-info')); 
    // useEffect(() => {
    //     // POST request using fetch inside useEffect React hook
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': localStorage.getItem(''),
    //         },
    //         body: JSON.stringify({ 
    //             title: 'React Hooks POST Request Example' 
    //         })
    //     };
    //     fetch('https://reqres.in/api/posts', requestOptions)
    //         .then(response => response.json())
    //         .then(data => setPostId(data.id));
    
    // // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, []);


    return (
        <div className="maindashboardContainer">
            <div className={sidebar ? "maindashboardContainerMenu" : "maindashboardContainerMenuClosed"}>
                <Menus sidebar = {sidebar} controlSideBar = {showSideBar}/>
            </div>
            <div className={sidebar ? "maindashboardContainerDashboard" : "maindashboardContainerDashboardClosed"}>
                <Dashboard/>
                
            {/*console.log(localStorage.getItem('user-info'))*/}

            
            </div>

        </div>
    )
}

export default Maindashboard
