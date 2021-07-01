import React, {useState, useEffect} from "react"
import axios from "axios"
import authHeader from "../services/auth-header";
import {Pie} from "react-chartjs-2"
import '../dashboard.css';
 


function DisplayActivityInfo(){

    const [activityInfo, setactivityInfo] = useState([])

                // Receiving data from API
            const fetchData = () => {
                return axios.get("http://localhost:5000/useractivity", {headers : authHeader()})
                        .then((response) => {
                            setactivityInfo(response.data);
                        });
            }
            
            useEffect(() => {
                fetchData();
            }, []);




    return(
            <div>
							<div className="row">
								<div className="col-md-6 md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
									<div className="md-card md-card-stats md-theme-default">
										{/* <canvas id="activeUsers" width="600" height="370"> */}
                                            <Pie 
                                                data = {{
                                                    labels : ["Active Users", "Inactive Users"],
                                                    datasets : [{
                                                        data : [activityInfo.active, activityInfo.inactive],
                                                        backgroundColor : ['#80aaff', '#ff9999'],
                                                    }]
                                                }}
                                                 options={{
                                                    responsive: true,
                                                    maintainAspectRatio: true,
                                                    }}
                                                // height = "50%"
                                                // width = "600"
                                            />
                                        {/* </canvas> */}
									</div>
								</div>
								
								<div className="col-md-6 md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25 tweet-box-mb">
									<div className="md-card md-card-stats md-theme-default">
										<div className="md-card-header" data-background-color="blue">
											<i className="fa fa-twitter"></i></div><div className="md-card-content">
											<p className="category">Total Tweets</p>
											<h3 className="title">+245</h3>
										</div>
										<div className="md-card-actions md-alignment-left"><div className="stats">
										<i className="fa fa-clock-o" aria-hidden="true"></i> Just Updated </div>
										</div>
									</div>
								</div>
							</div>
						</div>
    );
}

export default DisplayActivityInfo