import React from 'react';
import { Redirect} from "react-router-dom";

import "../dashboard.css";
import "../style.css";
import SideNav from '../components/side-nav';
import NavBar from '../components/navbar';
import FormUpdate from '../components/form-update-user';
import Footer from '../components/footer';
import AuthService from '../services/auth.service';


function UpdateUser(props) {
    const loggedInUser = AuthService.getCurrentUser();

    const data = props.location.data;
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
                        <h2>Update User</h2>
                    </div>
                    <FormUpdate data = {data}/>
                </div>
                <Footer />
            </div>
        </div>
    </div>
        </div>
     
     
    )}
    else{
        return(
            <Redirect to = "/login" />
        )
    }
}

export default UpdateUser;
