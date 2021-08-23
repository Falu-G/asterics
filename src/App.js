import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import AddCustomer from './pages/AddCustomer/AddCustomer';
import SendEmail from './pages/SendEmail/SendEmail';
import Sendsms from './pages/sendSms/Sendsms';
import Maindashboard from './pages/MainDashboard/Maindashboard';
import MonthlySchedule from './pages/MonthlySchedule/Monthlyschedule'
<<<<<<< HEAD
import Templates from './pages/Templates/Templates'
=======
import Templates from './pages/Template/Template';
import Customer from './pages/Customer/Customer';
import Testpage from './pages/Testpage/Testpage';
import SignUp from './pages/SignUp/SignUp';
>>>>>>> c63535ecc1c0de4684f5a1f563e2d64d0c02cf9c
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path = "/login" component = {Login} />
          <Route path = "/addCustomer" component = {AddCustomer} />
          <Route path = "/sendsms" component = {Sendsms} />
          <Route path = "/sendemail" component = {SendEmail} />
          <Route path = "/maindashboard" component = {Maindashboard} />
          <Route path = "/schedule" component = {MonthlySchedule} />
          <Route path = "/templates" component = {Templates} />
<<<<<<< HEAD
=======
          <Route path = "/customer" component = {Customer} />
          <Route path = "/testpage" component = {Testpage} />
          <Route path = "/signup" component = {SignUp} />
>>>>>>> c63535ecc1c0de4684f5a1f563e2d64d0c02cf9c
        </Switch>
      </Router>
    </div>
  );
}

export default App;
