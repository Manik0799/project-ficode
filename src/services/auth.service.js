// To save the JWT in the local storage after the request for login has been made
// to the API
import axios from "axios";

const API_URL = "http://localhost:5000/";

class AuthService {
  adminlogin(email, password) {
    return axios
      .post(API_URL + "admin/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response;
      });
  }

  userlogin(email, password) {
    return axios
      .post(API_URL + "user/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response;
      });
  }


  logout() {
    localStorage.removeItem("user");
  }

//   For the signup button , if added in future
//   register(email, password) {
//     return axios.post(API_URL + "signup", {
//       email,
//       password
//     });
//   }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();