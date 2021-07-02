import React, {useState, useEffect} from "react"
import axios from "axios"
import authHeader from "../services/auth-header";
import {Pie, Bar} from "react-chartjs-2"
import '../dashboard.css';
 


function DisplayActivityInfo(){

    const [activityInfo, setactivityInfo] = useState([])
    const [currencyData, setcurrencyData] = useState([])

                // Receiving data from local host API
            const fetchData = () => {
                return axios.get("http://localhost:5000/useractivity", {headers : authHeader()})
                        .then((response) => {
                            setactivityInfo(response.data);
                        });
            }

            const fetchCurrencyData = () => {
                return axios.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.json")
                        .then((response) => {
                            setcurrencyData(response.data.btc)
                        });
            }
            
            useEffect(() => {
                fetchData();
                fetchCurrencyData();
            }, []);




    const options = {
        scales: {
            yAxes: [
            {
                ticks: {
                beginAtZero: true,
                },
            },
            ],
        },
    };


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
											<i className="fa fa-money"></i>
                                        </div>
                                        <div className="md-card-content">
											<p className="category">Currency Exchange</p>
											<h3 className="title">BTC</h3>
                                                <div style = {{marginTop : "16%"}}>
                                                    <Bar 
                                                        data = {{
                                                            labels : [ "GBP" , "CAD", "EUR", "CNY", "USD"],
                                                             datasets : 
                                                                [
                                                                    {
                                                                        label: 'Currency Exchange Rate',
                                                                        data: [ currencyData.gbp, currencyData.cad,
                                                                        currencyData.eur, currencyData.cny, currencyData.usd ],
                                                                        backgroundColor: [
                                                                            'rgba(255, 99, 132, 0.2)',
                                                                            'rgba(54, 162, 235, 0.2)',
                                                                            'rgba(255, 206, 86, 0.2)',
                                                                            'rgba(75, 192, 192, 0.2)',
                                                                            'rgba(153, 102, 255, 0.2)',
                                                                            'rgba(255, 159, 64, 0.2)',
                                                                        ],
                                                                        borderColor: [
                                                                            'rgba(255, 99, 132, 1)',
                                                                            'rgba(54, 162, 235, 1)',
                                                                            'rgba(255, 206, 86, 1)',
                                                                            'rgba(75, 192, 192, 1)',
                                                                            'rgba(153, 102, 255, 1)',
                                                                            'rgba(255, 159, 64, 1)',
                                                                        ],
                                                                        borderWidth: 1,
                                                                        },
                                                                ]  

                                                        }}
                                                        title = "Currency Exchange Rate"
                                                        options = {options}
                                                    />

                                                </div>
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