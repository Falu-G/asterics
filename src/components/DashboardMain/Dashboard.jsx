import React from 'react'
import Dashnav from '../dashnav/Dashnav'
import NavigationComponent from '../navigationComponent/NavigationComponent'
import "./dashboard.css"
function Dashboard() {
    return (
        <div style={{
            backgroundImage: `url(/images/smsbg.png)`
            , backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
            backgroundPosition: 'center right'
        }} className="dashboardContainer">
            <NavigationComponent title="Dashboard" />
            <div className="dashboardContainerWrapper">

                <div className="dateAndTime">
                    <h4>Date:<span>11-90-2009</span></h4>
                    <p>Time:<span>9:00AM</span></p>
                </div>


                <div className="dashboardViewReport">
                    <div className="box box1 card">
                        <div className="outboundemails">

                            <h4>Total outboundemails</h4>

                            <h1>210</h1>

                        </div>

                        <div className="outboundsms">
                            <h4>Total outboundsms</h4>

                            <h1>210</h1>
                        </div>

                        <div className="schedulemessages">
                            <h4>ScheduledMesages</h4>

                            <h1>210</h1>
                        </div>
                    </div>
                    <div className="box box2 card">
                        <h4>Pending Messages</h4>
                        <h1>350</h1>
                    </div>
                    <div className="box box3 card">
                        <h4>Succesful Messages</h4>
                        <h1>500</h1>
                    </div>
                    <div className="box box4 card">
                        <span>Create Customer</span>
                    </div>
                    <div className="box box5 card">

                        <div className="boardScheduler">
                            <Dashnav title = "SMS Scheduler"/>
                            <div className="centralImg">
                            <img src ="/images/seccalendar.png" alt = "sms scheduler"/>
                            </div>
                            
                        </div>
                        <div className="boardSmsTemplates">
                            <Dashnav title = "SMS Template"/>
                        </div>
                    </div>
                    <div className="box box6 card">
                        <div className = "boxsone">
                        <Dashnav title ="Send Email"/>
                        <div className="centralImg"> <img src ="/images/emai.png" alt = "email"/></div>
                       
                        </div>

                        <div className = "boxtwo">
                        <Dashnav title ="Send SMS"/>
                        <div className="centralImg"> <img src ="/images/emalen.png" alt = "email env"/></div>
                        </div>
                       
                    </div>

                    <div className="box box7 card">
                        <Dashnav title="Check balance"/>
                        <div className="centralImg"><img src ="/images/calc.png" alt = "calculator"/> </div>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default Dashboard
