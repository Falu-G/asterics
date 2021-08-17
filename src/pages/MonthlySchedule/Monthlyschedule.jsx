import React from 'react'
import { useState } from 'react'
import './monthlyschedule.css'
import Menus from "../../components/menu/Menu"
import NavigationComponent from '../../components/navigationComponent/NavigationComponent'
import Dashnav from '../../components/dashnav/Dashnav'
import { DataGrid } from '@material-ui/data-grid';


function Monthlyschedule() {
    const [sidebar, setSideBar] = useState(false);

    const showSideBar = () => setSideBar(!sidebar)
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
                }`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];


    return (
        <div className="monthlyscheduleConatiner">
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
                    <div className="scheduleDashboard">
                        <div className="reportTask">

                            <div className="ScheduleReports">

                                <h3>Icon</h3>
                                <div className="generalbox">
                                    <div className="headerboxBlue">blue</div>
                                    <div className="headerboxContainer">
                                        <div className="headerbox">first</div>
                                        <div className="headerbox">second</div>
                                        <div className="headerbox">third</div>
                                    </div>
                                </div>
                            </div>

                            <div className="TaskSchedule">
                                TaskSchedule

                                <div className="taskList">

                                </div>

                            </div>

                        </div>

                        <div className="MessagesQueue ">
                            MessagesQueue
                            <div className="messagesQueueTable card">
                                <Dashnav />
                            </div>
                        </div>
                        <div className ="Emailqueue">
                            <h3>Email queue</h3>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    checkboxSelection
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Monthlyschedule
