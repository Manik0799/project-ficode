import React, {useState} from "react";
import axios from "axios"
import "../dashboard.css"
import authHeader from "../services/auth-header";
import usertempImage from "../images/marc.jpg"

function FormUpdate({data}){

    const id = data.userid
    const initialValues = {
        userid : data.userid,
        name : data.name,
        email: data.email,
        phone : data.phone,
        address : data.address
     }

     const [values, setValues] = useState(initialValues);
     //  To handle changes in the form
    const set = (fieldName) => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [fieldName]: value }));
    }
    };


    //   PUT request to API 
    const saveFormData = async () => {
        
        var link = "http://localhost:5000/update/" + id
        const response = await axios.put(link, values, {headers : authHeader()});

        if (response.status !== 200) {
        throw new Error(`Server Error: ${response.status}`); 
        }
    }

// Dealing with form submission to update the record
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
        // Request to the API
      await saveFormData();

      alert('Updation of user was successful');
    //   Resetting the form values after submission
    
      setValues(values);
    } catch (e) {
      var e = e.message
      if(e.substring(e.length - 3)== 404)
        alert(`All Fields Compulsory !!!`);
      else if(e.substring(e.length - 3)== 409)
        alert(`Email already exists !!!`); 
    }
  }

    return(
        <div>
                <div className="form-area">
							<form onSubmit = {onSubmit}>
								<div className="row mt-4">
									<div className="col-md-4 p-4">
										<div className="md-card md-card-profile md-theme-default">
											<div className="md-card-avatar"><img src= "" className="img" /></div>
											<div className="md-card-content">
												<h6 className="user-post text-gray text-center mt-2">{values.userid}</h6>
										        <h4 className="card-title text-center mt-2">{values.name}</h4>
												
											</div>
											<div className="container">
												<div className="row">
													<div className="col text-center">
														<div className="file btn btn-md btn-primary image-btn btn-center mt-2">
                                                            Change Image
															
															{/* <input type="file" name="image"/> */}
                                                            
{/* 														
                                                        <label class="form-label" for="customFile">Change Image</label>
                                                            <input type="file" class="form-control" id="customFile" /> */}
                                                        
                                                        </div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-8 p-4">
										<div className="form-group">
											<div className="row">
												<div className="col-md-6">
													<label>User ID<span className="required">*</span></label>
													<input className="form-control" type="text" value={values.userid} disabled = "true" />
												</div>	
												
												<div className="col-md-6">	
													<label>Name<span className="required">*</span></label>
													<input className="form-control" type="text"  value = {values.name}
                                            onChange = {set('name')} />
												</div>
											</div>
										</div>
										
										<div className="form-group">
											<div className="row">
												<div className="col-md-6">
													<label>Email<span className="required">*</span></label>
													<input className="form-control" type="text"  value = {values.email}
                                            onChange = {set('email')} />
												</div>
												
												<div className="col-md-6">
													<label>Phone<span className="required">*</span></label>
													<input className="form-control" type="text"  value = {values.phone}
                                            onChange = {set('phone')} />
												</div>
											</div>
										</div>
										<div className="form-group">
											<div className="row">
												<div className="col-md-12">
													
													<label>Address<span className="required">*</span></label>
													<textarea className="form-control"  value = {values.address}
                                            onChange = {set('address')}></textarea>
												</div>
											</div>
										</div>
										<div className="col-md-12">
											<button className = "form-btn" type = "submit">Update</button>
										</div>
									</div>
								</div>
							</form>
						</div>
        </div>
    );
}

export default FormUpdate;

