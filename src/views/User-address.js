import React from 'react';
import { Redirect} from "react-router-dom";

import "../dashboard.css";
import "../style.css";
import SideNavUserProfile from '../components/sidenav-user-profile';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import AuthService from '../services/auth.service';
import UserAddressComponent from '../components/user-address';

function UserAddress(props) {
    const loggedInUser = AuthService.getCurrentUser();

    const data = props.location.data;
    if(loggedInUser!==null){
            return (
                <div >
            <div className="container-scroller">
                <NavBar />
                
                <div className="page-body-wrapper">

                <SideNavUserProfile />
                 <div className="main-panel">
                        <UserAddressComponent />
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

export default UserAddress;
