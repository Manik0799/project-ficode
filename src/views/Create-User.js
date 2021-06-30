import React, {useEffect, useState} from 'react';
import { Redirect} from "react-router-dom";

import '../dashboard.css';
import SideNav from '../components/side-nav';
import NavBar from '../components/navbar';
import Form from '../components/form-create-user';
import Footer from '../components/footer';
import AuthService from '../services/auth.service';

function CreateUser() {

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
                                <h2>Create User</h2>
                            </div>   
                            <Form />
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

export default CreateUser;
