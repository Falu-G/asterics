import React, {useState, useContext } from "react";
import './monthlyschedule.css'
import { MenuContext } from "../../components/MenuContext";
import Menus from "../../components/menu/Menu"
import NavigationComponent from '../../components/navigationComponent/NavigationComponent'
import Dashnav from '../../components/dashnav/Dashnav'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import Modal from "react-modal"
import NewSchedule from '../../components/newSchedule/NewSchedule'
import Dropdown from '../../components/Dropdown/Dropdown'
import {CalendarToday} from '@material-ui/icons'


function Monthlyschedule() {
    let today = new Date();
    let month = today.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let days = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    
    today = today.getFullYear() + "-" + month + "-" + days;
    
    console.log(today);
    
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
    const {sidebar,setSideBar} = useContext(MenuContext);
    console.log("I am on monthly "+sidebar)
    const [dataRow, setDataRow] = useState(dataHorizontal);

    const handledelete = (id) => setDataRow(() => dataRow.filter((item) => item.id !== id));
    const showSideBar = () => setSideBar(!sidebar)

    const listOfTasks = ["Monthly Schedule", "Weekly Schedule", "Daily Schedule"];
 
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

                                
                                <div className="generalbox">
                                    <div className="headerboxBlue">
                                        <div className="headerboxBlueInner">
                                        <CalendarToday/>
                                        <span>Monthly Schedule</span>
                                        </div>
                                        
                                        <span className="headerboxBluedate">{today}</span>
                                        </div>
                                    <div className="headerboxContainer">
                                        <div className="headerboxone">
                                            <span>Scheduled Messages</span>
                                            <h3>400</h3>
                                        </div>
                                        <div className="headerboxtwo">
                                        <span>Pending Messages</span>
                                            <h3>350</h3>
                                            </div>
                                        <div className="headerboxthree">
                                        <span>Successful Messages</span>
                                            <h3>50</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="TaskSchedule">

                                <Dropdown tasks = {listOfTasks}/>
                                

                                <h3 onClick={() => setOpenModal(() => openModal ? false : true)}>New Schedule</h3>
                            </div>

                        </div>
                        <div style = {{marginTop: 25}}>
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

                        {/*<Modal isOpen={openModal}
                            style={customStyles}>

                            <NewSchedule setOpenModal = {() => setOpenModal(() => openModal ? false : true)}/>
                        </Modal>






                        <div className="reportTask">

                            <div className="ScheduleReports">

                                
                                <div className="generalbox">
                                    <div className="headerboxBlue">
                                        <div className="headerboxBlueInner">
                                        <CalendarToday/>
                                        <span>Monthly Schedule</span>
                                        </div>
                                        
                                        <span className="headerboxBluedate">{today}</span>
                                        </div>
                                    <div className="headerboxContainer">
                                        <div className="headerboxone">
                                            <span>Scheduled Messages</span>
                                            <h3>400</h3>
                                        </div>
                                        <div className="headerboxtwo">
                                        <span>Pending Messages</span>
                                            <h3>350</h3>
                                            </div>
                                        <div className="headerboxthree">
                                        <span>Successful Messages</span>
                                            <h3>50</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="TaskSchedule">

                                <Dropdown tasks = {listOfTasks}/>
                                

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
                        </div>*/}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Monthlyschedule
