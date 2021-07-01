import React, {useState} from "react";
import axios from "axios";
import { InputGroup, FormControl } from "react-bootstrap";

import "../dashboard.css"
import authHeader from "../services/auth-header";

function Form(){

    const [values, setValues] = useState({
        userid : "",
        name : "",
        email: "",
        phone : "",
        address : "",
        activityStatus : "Yes"
     })

    //  To handle changes in the form
    const set = (fieldName) => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [fieldName]: value }));
    }
  };

  console.log(values);

//   Post request to API 
const saveFormData = async () => {
    

    const response = await axios.post('http://localhost:5000/add', values, {headers : authHeader()});
    
    if (response.status !== 200) {
      throw new Error(`Server Error: ${response.status}`); 
    }
  }

// Dealing with form submission
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
        // Request to the API
     await saveFormData();

      alert('Your registration was successfully submitted!');
    //   Resetting the form values after submission
      setValues({
        userid : "",
        name : "",
        email: "",
        phone : "",
        address : ""
      });

    } catch (e) {
      var e = e.message
      if(e.substring(e.length - 3)== 404)
        alert(`All Fields Compulsory !!!`);
      else if(e.substring(e.length - 3)== 409)
        alert(`User ID or email already exists !!!`); 
    }
  }

    return(
        <div>
                <div className="form-area">
                        <form onSubmit = {onSubmit}>
                            <div className="row">
                                 <div className="col-md-3">
                                    <div className="form-group">
                                        <label>User ID<span className="required">*</span></label>
                                        <input className="form-control" 
                                            type="text" 
                                            value = {values.userid} 
                                            placeholder="Enter your User ID"
                                            onChange = {set('userid')}
                                         />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Name<span className="required">*</span></label>
                                        <input className="form-control" 
                                            type="text" placeholder="Name of User" 
                                            value = {values.name}
                                            onChange = {set('name')}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Email<span className="required">*</span></label>
                                        <input className="form-control" type="text" placeholder="Email" 
                                            value = {values.email}
                                            onChange = {set('email')}
                                        />
                                    </div>
                                </div>
                              <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Phone<span className="required">*</span></label>
                                        <input className="form-control" type="text" placeholder="Phone" 
                                            value ={values.phone}
                                            onChange = {set('phone')}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Address<span className="required">*</span></label>
                                        <textarea className="form-control" placeholder="Enter your address.."
                                            value = {values.address}
                                            onChange = {set('address')}
                                        >
                                        </textarea>
                                    </div>
                                </div>
                                {/* To get the activity status of the user */}
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Activity Status<span className="required">*</span></label>
                                          <div>

                                            <label >
                                              <div> 
                                                <input type = "radio" value = "Yes" 
                                                  onChange = {set('activityStatus')}
                                                  checked = {values.activityStatus === "Yes"}
                                                style = {{'width' : "auto"}} /> 
                                                Yes
                                              </div>
                                            </label>
                                            <label>
                                              <div>
                                                <input type = "radio" value = "No" 
                                                  onChange = {set('activityStatus')}
                                                  checked = {values.activityStatus === "No"}
                                                style = {{'width' : "auto"}}/> 
                                                No
                                              </div>
                                            </label>
                                          </div>

                                         
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button className = "form-btn" type = "submit">Submit</button> 
                                </div>
                            </div>
                        </form>
                    </div>  
        </div>
    );
}

export default Form;

