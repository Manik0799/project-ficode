import React, {useState, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

import "../dashboard.css";
import "../style.css";

// Components import
import SideNav from '../components/side-nav';
import NavBar from '../components/navbar';
import TableDisplayUsers from '../components/table-list-users';
import Footer from '../components/footer';

function ListUsers() {

    const loggedInUser = AuthService.getCurrentUser();
    const [users, setUsers] = useState([])
    
    // Receiving data from API
    const fetchData = () => {
        return axios.get("http://localhost:5000/users", {headers : authHeader()})
                .then((response) => {
                    setUsers(response.data);
                });
    }
    
    useEffect(() => {
        fetchData();
    }, []);

   
   
        if(loggedInUser!==null){
            return (
                <div >
            <div className="container-scroller">
                <NavBar />
                
                <div className="page-body-wrapper">

                <SideNav />
                 <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-head">
                            <h2>User List</h2>
                        </div>
                        <div className="main-content">
                            <div className="top-header">
                                <h3>User(s)</h3>
                                <div className="btn-settings">
                                    <Link to = {"create-user"}>
                                        <a>Create User</a>
                                    </Link>
                                </div>
                            </div>

                            <div className="header_wrap">
                                <div className="search-bar">
                                    <input type="text" id="search_input_all" onkeyup="FilterkeyWord_all_table()" placeholder="Name" className="form-control"
                                     style = {{marginRight : "3px"}} />
                                    <button className="btn btn-sm btn_0"
                                        style = {{marginRight : "4px"}}
                                    >Search</button>
                                    <button className="btn btn-sm btn_0">Reset</button>
                                </div>
                            </div>

                            <TableDisplayUsers users = {users}/>
					    </div>

                        </div>
                            <Footer />
                     </div>
                    </div>
            </div>

        </div>
            )
        }
        else{
            return(
                <Redirect to = "/login" />
            )
        }
     
     

}

export default ListUsers;
