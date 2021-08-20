import React from 'react'
import { useState } from 'react'
import './monthlyschedule.css'
import Menus from "../../components/menu/Menu"
import NavigationComponent from '../../components/navigationComponent/NavigationComponent'
import Dashnav from '../../components/dashnav/Dashnav'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import Modal from "react-modal"
import NewSchedule from '../../components/newSchedule/NewSchedule'

function Monthlyschedule() {


    const [openModal, setOpenModal] = useState(false);
    const customStyles = {
        content: {
            width: '80%',
            height: '70%',
            top: '50%',
            left: '50%',
            padding: '0',
            transform: 'translate(-50%, -50%)',
        },
    };
    const dataHorizontal = [
        { id: 1, dateSchedule: "12-Aug-2021", MessageContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia", status: "Pending" },
        { id: 2, dateSchedule: "12-Aug-2021", MessageContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia", status: "Pending" },
        { id: 3, dateSchedule: "12-Aug-2021", MessageContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia", status: "Pending" },
        { id: 4, dateSchedule: "12-Aug-2021", MessageContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia", status: "Pending" },
        { id: 5, dateSchedule: "12-Aug-2021", MessageContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia", status: "Pending" },
    ];
    const [sidebar, setSideBar] = useState(false);
    const [dataRow, setDataRow] = useState(dataHorizontal);

    const handledelete = (id) => setDataRow(() => dataRow.filter((item) => item.id !== id));
    const showSideBar = () => setSideBar(!sidebar)
    // const columns = [
    //     { field: 'id', headerName: 'ID', width: 90 },
    //     {
    //         field: 'firstName',
    //         headerName: 'First name',
    //         width: 150,
    //         editable: true,
    //     },
    //     {
    //         field: 'lastName',
    //         headerName: 'Last name',
    //         width: 150,
    //         editable: true,
    //     },
    //     {
    //         field: 'age',
    //         headerName: 'Age',
    //         type: 'number',
    //         width: 110,
    //         editable: true,
    //     },
    //     {
    //         field: 'fullName',
    //         headerName: 'Full name',
    //         description: 'This column has a value getter and is not sortable.',
    //         sortable: false,
    //         width: 160,
    //         valueGetter: (params) =>
    //             `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
    //             }`,
    //     },
    // ];

    // const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];

    const dataVertical = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'dateSchedule',
            headerName: 'Date Schedule',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            renderCell: (prenentr) => {

                console.log(prenentr);
                <div>hdh</div>

            }
        },
        {
            field: "MessageContent",
            headerName: 'Message Content',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 500,
            renderCell: () => {

            }
        },
        {
            field: "status",
            headerName: "Status",
            width: 160,
            renderCell: ({ row }) => {
                <div className="CentralizeCell">
                    {row.status}
                </div>

            }
        },

        {

            field: "",
            headerName: "",
            width: 160,
            renderCell: ({ row }) => (<><div className="userdelete">
                <DeleteOutline style={{
                    marginLeft: 20,
                    color: "red",
                    cursor: "pointer"
                }} onClick={() => handledelete(row.id)} /></div></>)

        }


    ]



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

                        <Modal isOpen={openModal}
                            style={customStyles}>

                            <NewSchedule setOpenModal = {() => setOpenModal(() => openModal ? false : true)}/>
                        </Modal>
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
                                <h3>View Task</h3>

                                <h3 onClick={() => setOpenModal(() => openModal ? false : true)}>New Schedule</h3>
                            </div>

                        </div>

                        <div style = {{marginTop: 55}}>
                            <h3>MessagesQueue</h3>
                            <div className="messagesQueueTable card">
                                <Dashnav />
                            </div>
                        </div>
                        <div className="Emailqueue">
                            <h3>Email queue</h3>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={dataHorizontal}
                                    columns={dataVertical}
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
