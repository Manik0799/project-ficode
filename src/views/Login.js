import React, {useState} from 'react';
import '../style.css';
import companyLogo from  "../images/logo.png";
import AuthService from '../services/auth.service';

function Login(props) {

  const [values, setValues] = useState({
        email: "",
        password : ""
     })

    //  To handle changes in the form
    const set = (fieldName) => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [fieldName]: value }));
    }
  };

//   Post request to API 
const saveAdminFormData = async () => {
    
    const response = await AuthService.adminlogin(values.email, values.password)

    // "response.data" would contain the access token and the email of the admin
    if (response.status !== 200) {
      throw new Error(`Server Error: ${response.status}`); 
    }
    
    if (response.status==200){
      // After successful login, redirecting the user to the 'List User' Page
      props.history.push({
        pathname : "/user-list",
        state : response.data.email
      })
    }
      
  }

  const saveUserFormData = async () => {
    
    const response = await AuthService.userlogin(values.email, values.password)

    // "response.data" would contain the access token and the email of the user
    if (response.status !== 200) {
      throw new Error(`Server Error: ${response.status}`); 
    }
    
    if (response.status==200){
      // After successful login, redirecting the user to the 'User Profile' Page
      props.history.push({
        pathname : "/user-profile",
        state : {email : response.data.email, userid : response.data.userid}
      })
    }
      
  }

// Dealing with form submission
  const onSubmit = async (event) => {

    // Getting the "id" of the input which has submitted the form - "login as admin" or "login as user"
    // input_id = 1 -> admin
    // input_id = 2 ->user
    const input_id = event.nativeEvent.submitter.id;

    event.preventDefault(); // Prevent default submission
    try {
        // Request to the API
        if(input_id == 1)
        {
            // console.log("Call to /admin/login");
          await saveAdminFormData();
        }
        else 
          {
            // console.log("Call to /user/login");
            await saveUserFormData();
          }


      //   Resetting the form values after submission
      setValues({
        email: "",
        password : "" 
      });
    } catch (e) {
      alert(`Login failed - Invalid Credentials`);
    }
  }

    return (
        <div>
        <section className="login-section" style={{background: "url('../../public/assets/images/login-bg.jpg')"}}>
        <div className="login-form">   
            <a className="logo-img" href="#">
                <img src={companyLogo} alt="logo" />
                <div id="wrapper" className="wrapper">
                </div>
            </a>
            <div className="flip-container">
                <div className="flipper" id="flipper">
                    <div className="wrap-login100 front">
                        <form onSubmit = {onSubmit}>
                            <div className="form-group">
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <input className="form-control" type="text" placeholder="Email" 
                                value = {values.email}
                                onChange = {set('email')}
                                />
                            </div>
                            <div className="form-group">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                                <input className="form-control" type="password" placeholder="Password" 
                                value = {values.password} 
                                 onChange = {set('password')}   
                                />
                            </div>

                            
                            <input id = "1" type="submit" value="log in (as admin)" />
                            <input id = "2" type="submit" value="log in (as user)" />
                            
                            <a className="flipbutton" id="forgetButton" href="#">Forgot Password?</a>

                        </form>
                    </div>
                    <div className="wrap-login100 back">
                        <form>
                            <div className="form-group">
                                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                <input className="form-control" type="text" placeholder="Email" />
                            </div>
                            <input type="submit" value="Reset" />
                            <a className="flipbutton" id="forgetButton" href="#">Sign In</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
            </section>
    </div>
     
    );
}

export default Login;
