import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './views/Login';
import CreateUser from './views/Create-User';
import ListUsers from './views/List-Users';
import UpdateUser from './views/Update-User';
import UserProfile from "./views/User-Profile"
import UserAddress from './views/User-address';
import EditUser from './views/User-Edit-Profile';
function App() {
    return (
      <Router>
         <div className = "App">

          <Switch>
                    <Route path="/" exact component= {Login}></Route>
                    <Route path="/login" component= {Login}></Route>
                    <Route path= "/user-list" component = {ListUsers}></Route>

                    <Route path="/create-user" component= {CreateUser}></Route>
                    <Route path= "/update-user" component={UpdateUser}></Route>

                    <Route path = "/user-profile" component = {UserProfile}></Route>
                    <Route path = "/user-address" component = {UserAddress}></Route>
                    <Route path = "/user-edit" component = {EditUser}></Route>

                    
                    <Route path ="*"><h1>404 Page Not Found</h1></Route>
          </Switch>
        </div>
      </Router>
     
    );
}

export default App;
