import './App.css';
import {useState} from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import AddCustomer from './pages/AddCustomer/AddCustomer';
import SendEmail from './pages/SendEmail/SendEmail';
import Sendsms from './pages/sendSms/Sendsms';
import Maindashboard from './pages/MainDashboard/Maindashboard';
import MonthlySchedule from './pages/MonthlySchedule/Monthlyschedule'
import Templates from './pages/Template/Template';
import Customer from './pages/Customer/Customer';
import Testpage from './pages/Testpage/Testpage';
import SignUp from './pages/SignUp/SignUp';
import Menus from './components/menu/Menu'
import { ToastProvider} from 'react-toast-notifications';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ResetPassword from './pages/resetPassword/ResetPassword';
import Passwordsent from './pages/passwordSent/Passwordsent';
import SessionExpired from './pages/SessionExpired/SessionExpired';
import {MenuContext} from './components/MenuContext';


function App() {
  const [sidebar, setSideBar] = useState(true);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path = "/login" component = {Login} />
          <Route path = "/addCustomer" component = {AddCustomer} />

          <MenuContext.Provider value = {{sidebar, setSideBar}}> 


          <Route path = "/sendsms" component = {()=> <ToastProvider> <Sendsms/> </ToastProvider>} />

          <Route path = '/huhgddyuhtrthwh' component = {Menus}/>
       
          <Route path = "/sendemail" component = {()=> <ToastProvider> <SendEmail/> </ToastProvider>} />
          <Route path = "/maindashboard" component = {Maindashboard} />
          <Route path = "/schedule" component = {MonthlySchedule} />
          <Route path = "/templates" component = {Templates} />
          <Route path = "/customer" component = {()=> <ToastProvider> <Customer/> </ToastProvider>} />
          <Route path = "/testpage" component = {Testpage} />
          <Route path = "/signup" component = {SignUp} />
          <Route path = "/resetpassword" component = {ResetPassword} />
          <Route path = "/passwordsent" component = {Passwordsent} />
          <Route path = "/sessionexpired" component = {SessionExpired} />
          </MenuContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
