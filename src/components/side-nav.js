import React from "react";
import "../dashboard.css"
import {Link} from "react-router-dom";

function SideNav(){
    return(
        <div>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
               
                    <li>
                        <div className="user-profile m-t-20">
                            <div className="user-pic"><img alt="users" className="rounded-circle img-fluid" src="assets/images/user.jpg" /></div>
                            <div className="user-content hide-menu m-t-10 dropdown">
                                <h5 className="m-b-10 user-name font-medium">Lorem Ipsum</h5>
                            </div>
                        </div>
                    </li>
                     <li className="nav-item">
                     <Link to = {"create-user"}>
                        <a className="nav-link">
                            <i className="menu-icon fa fa-tachometer" aria-hidden="true"></i>
                            <span className="menu-title">Create User</span>
                        </a>
                     </Link>
                        
                    </li>

                    <li className="nav-item">
                    <Link to = {"user-list"}>
                        <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic">
                            <i className="menu-icon fa fa-user"></i>
                            <span className="menu-title">List User</span>
                        </a>
                    </Link>
                        
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default SideNav;

