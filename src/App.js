import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import AddCustomer from './pages/AddCustomer/AddCustomer';
import SendEmail from './pages/SendEmail/SendEmail';
import Sendsms from './pages/sendSms/Sendsms';
import Maindashboard from './pages/MainDashboard/Maindashboard';
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
