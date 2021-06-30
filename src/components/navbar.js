import React, {useState} from "react";
import "../dashboard.css"
import companyLogo from  "../images/logo.png";
import smallLogo from "../images/small-logo.png"
import {Link, Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";

function NavBar(){

    const [loggedIn, setloggedIn] = useState(true)

    const logoutUser = async () => {
        await AuthService.logout();
    }
    
    // Call to the API for logout route
    const handleClick = async () => {
        // Request to the API
      try {
        await logoutUser();
        setloggedIn(!loggedIn)
    } catch (e) {
      alert(`Logout failed! ${e.message}`);
        }
    }

    

    return(
        <div>
             <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                
                <Link to = "create-user">
                <a className="navbar-brand brand-logo">
                    <img src= {companyLogo} alt="logo" />
                </a>    
                </Link>
                
                <a className="navbar-brand brand-logo-mini" href="#"><img src={smallLogo} alt="logo" /></a>
            </div>

            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">

              
                <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span className="fa fa-bars"></span>
                </button>

                <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item nav-profile dropdown">
                        <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                            
                        </a>
                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                            

                           
                            <a className="dropdown-item" onClick = {handleClick}>
                                <i className="fa fa-sign-out"></i>
                                Logout
                            </a>
                            {loggedIn ? null:  <Redirect to = "/login"/>}
                        </div>
                    </li>
                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                    <span className="mdi mdi-menu"></span>
                </button>
            </div>
        </nav>
        </div>
    );
}

export default NavBar;

