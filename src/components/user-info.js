import React from "react";
import {Link} from "react-router-dom"
import avatarImage from "../images/marc.jpg"

function DisplayUserInfo({user}){

    return(
        <div className="content-wrapper">
						<div className="page-head">
							<h2>Profile</h2>
						</div>
						<div className="main-content">
							
							<div className="d-flex">
								<div className="ml-auto btn btn-md btn-settings">
									<Link to = {{
                                                    pathname :"user-edit",
													data : user
                                                }}>
										<a className="edit-btn" href="#">Edit Profile</a>
									</Link>
								</div>
							</div>
							<div className="row">
								<div className="col-md-4 p-4">
									<div className="md-card md-card-profile md-theme-default">
										<div className="md-card-avatar">
                                            {/* <img src={avatarImage} className="img" /> */}
                                        </div>
										<div className="md-card-content">
											<h6 className="user-post text-gray text-center mt-2">{user.userid}</h6>
											<h4 className="card-title text-center mt-2">{user.name}</h4>
											
										</div>
									</div>
								</div>
								<div className="col-md-8 p-4">
									<div className="mb-3">
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">UserID </h6>
											</div>
											<div className="col-sm-9 text-muted">
												{user.userid}
											</div>
										</div>
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Name</h6>
											</div>
											<div className="col-sm-9 text-muted">
												{user.name}
											</div>
										</div>
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Email</h6>
											</div>
											<div className="col-sm-9 text-muted">
												{user.email}
											</div>
										</div>
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Phone</h6>
											</div>
											<div className="col-sm-9 text-muted">
												{user.phone}
											</div>
										</div>
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Address</h6>
											</div>
											<div className="col-sm-9 text-muted">
												{user.address}
											</div>
										</div>
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Activity Status</h6>
											</div>
											<div className="col-sm-9 text-muted">
												{user.activityStatus==="Yes" ? "Active" : "Inactive"}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					
					</div>
    );
}

export default DisplayUserInfo