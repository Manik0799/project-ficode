import React from 'react';
import { Redirect} from "react-router-dom";
import axios from "axios"

import '../dashboard.css';
import DisplayActivityInfo from '../components/display-activity-info';
import SideNav from '../components/side-nav';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import AuthService from '../services/auth.service';

function ActiveUsers() {

        const loggedInUser = AuthService.getCurrentUser();



    if(loggedInUser!==null){

    
    return (

        
   
        <div>
            <div className="container-scroller">
                <NavBar />
                <div className="page-body-wrapper">
                    <SideNav />
                    
                    <div className="main-panel"> 
                        <div className="content-wrapper">
                            <div className="page-head">
                                <h2>Active Users</h2>
                            </div>   
                            <DisplayActivityInfo />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
     
     
    );
    }
    else{
        return(
                <Redirect to = "/login" />
            )
    }
}

export default ActiveUsers;
