import axios from 'axios';
import backend_api from 'src/config';

const authRegister = (data) => {
  return axios.post(backend_api + 'user/registerAdmin', data);
};

const authLogin = (data) => {
  return axios.post(backend_api + 'user/loginAdmin', data);
};

export default {
  authRegister,
  authLogin,
};
