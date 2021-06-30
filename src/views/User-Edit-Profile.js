import React from 'react';
import { Redirect} from "react-router-dom";

import "../dashboard.css";
import "../style.css";
import SideNavUserProfile from '../components/sidenav-user-profile';
import NavBar from '../components/navbar';
import FormUpdate from '../components/form-update-user';
import Footer from '../components/footer';
import AuthService from '../services/auth.service';
import EditUserForm from '../components/user-edit';


function EditUser(props) {
    const loggedInUser = AuthService.getCurrentUser();

    if(loggedInUser!==null){

    
    return (
   
         <div>
            <div className="container-scroller">
        <NavBar />
        <div className="page-body-wrapper">

            <SideNavUserProfile />
            <div className="main-panel"> 
                <div className="content-wrapper">
                    <div className="page-head">
                        <h2>Update User</h2>
                    </div>
                    <EditUserForm data = {props.location.data}/>
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

export default EditUser;
