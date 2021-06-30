import React from "react"
import axios from "axios"
import AuthService from "../services/auth.service";

function UserAddressComponent(){
    const userData = AuthService.getCurrentUser();  

	const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
	const search_address = userData.address

	const map_link = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}
  						&q=${search_address}`

	//    request to API 
    const sendMailToRecipient = async () => {
        
        var link = "http://localhost:5000/send-mail/" + userData.email
        const response = await axios.get(link);

        if (response.status !== 200) {
        throw new Error(`Server Error: ${response.status}`); 
        }
    }
	const sendMail = async (event) => {
		event.preventDefault();

		try{
			// Request to the API
			await sendMailToRecipient();

			alert('Mail sent to the recepient');
			
		}catch(e){
			alert(`Error in sending the mail !!!`); 
		}
	}

    return(
        <div className="content-wrapper">
						<div className="page-head">
							<h2>Address</h2>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="responsive-map">
									<iframe src= {map_link} style = {{"width": "100%",  "height" : "405px" , "frameborder" : 0  , "border" : 0}} allowfullscreen></iframe>
								
								</div>
							</div>
							<div className="col-md-6">
								<div className="p-5 bg-white text-center shadow-lg">
									<h3 className="text-muted">{userData.phone}</h3>
									<div className=" mt-4">
										<address>
											<strong className="text-muted">{userData.address}</strong><br></br>
                                            <br></br>
											
											{/* <abbr title="Phone">P - </abbr> {userData.phone} */}
										</address>
										
										<address className="mb-5">
											<strong className="text-muted">Email</strong><br></br>
											<a href="mailto:#" className="text-muted">{userData.email}</a>
										</address>
										<a href="" className="btn btn-outline-danger btn-lg w-100 d-block"
											onClick = {sendMail}
										>Send Message</a>
									</div>
								</div>
							</div>
						</div>
					</div>
    )
}

export default UserAddressComponent;