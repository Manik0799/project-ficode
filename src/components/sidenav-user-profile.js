import React from "react";
import "../dashboard.css"
import {Link} from "react-router-dom";

function SideNavUserProfile(){
    return(
        <div>
            <nav class="sidebar sidebar-offcanvas" id="sidebar">
					<ul class="nav">
						<li>
							<div class="user-profile m-t-20">
								<div class="user-pic"><img alt="users" class="rounded-circle img-fluid" src="assets/images/user.jpg" /></div>
								<div class="user-content hide-menu m-t-10 dropdown">
									<h5 class="m-b-10 user-name font-medium">Lorem Ipsum</h5>
								</div>
							</div>
						</li>
						
						<li class="nav-item active">
                            <Link to = {"user-profile"}>
                                <a class="nav-link">
                                    <i class="menu-icon fa fa-user"></i>
                                    <span class="menu-title">My Profile</span>
                                </a>
                            </Link>
						</li>
						<li class="nav-item">
                            <Link to = {"user-address"}>
							<a class="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic">
								<i class="menu-icon  fa fa-address-card"></i>
								<span class="menu-title">Address</span>
							</a>
                            </Link>
						</li>
					</ul>
				</nav>
        </div>
    );
}

export default SideNavUserProfile;

