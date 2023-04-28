import axios from 'axios';
import backend_api from 'src/config';

const authRegister = (data) => {
  return axios.post(backend_api + 'user/registerAdmin', data);
};

const authLogin = (data) => {
  return axios.post(backend_api + 'user/loginAdmin', data);
};

const getUserAll = () => {
  return axios.get(backend_api + 'user/getUserAll');
};

const logOut = (data) => {
  return axios.post(backend_api + 'user/logout', data);
};

export default {
  authRegister,
  authLogin,
  getUserAll,
  logOut,
};
