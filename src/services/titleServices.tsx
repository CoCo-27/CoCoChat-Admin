import axios from 'axios';
import backend_api from 'src/config';
import setAuthToken from 'src/utils/setAuthToken';

const createTitle = (value) => {
  return axios.post(backend_api + 'title/create', value);
};

const getTitle = () => {
  return axios.get(backend_api + 'title/get');
};

const editTitle = (value) => {
  return axios.post(backend_api + 'title/edit', { value: value });
};

export default {
  createTitle,
  getTitle,
  editTitle,
};
