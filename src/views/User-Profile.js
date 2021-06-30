import React, {useState, useEffect} from 'react';
import { Redirect} from "react-router-dom";
import axios from 'axios';

import "../dashboard.css";
import "../style.css";
import SideNavUserProfile from '../components/sidenav-user-profile';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import DisplayUserInfo from '../components/user-info';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';


function UserProfile() {

    const userData = AuthService.getCurrentUser();
    const userid = userData.userid
    const [user, setUser] = useState([])
    
    // Receiving data from API
    const fetchData = () => {
        return axios.get("http://localhost:5000/users/" + userid, {headers : authHeader()})
                .then((response) => {
                    setUser(response.data);
                });
    }
    
    useEffect(() => {
        fetchData();
    }, []);


    const loggedInUser = AuthService.getCurrentUser();

    if(loggedInUser!==null){
            return (
                <div >
            <div className="container-scroller">
                <NavBar />
                
                <div className="page-body-wrapper">

                <SideNavUserProfile />
                 <div className="main-panel">
                    <DisplayUserInfo user = {user} />
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

export default UserProfile;
