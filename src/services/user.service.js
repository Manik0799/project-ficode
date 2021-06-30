import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/';

class UserService {
  getAllUsers(){
    return axios.get(API_URL + 'users', { headers: authHeader() })
  }
  
}

export default new UserService();