import axios from 'axios';
import backend_api from 'src/config';

const uploadFile = (formData) => {
  return axios.post(backend_api + 'upload/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const prompt = (value) => {
  return axios.post(backend_api + 'upload/changePrompt', value);
};

const getPrompt = () => {
  return axios.get(backend_api + 'upload/getPrompt');
};

const embedding = (fileName) => {
  return axios.post(backend_api + 'upload/train', {
    filename: fileName,
  });
};

const requestMessage = (value) => {
  console.log('vaule = ', value);
  return fetch(backend_api + 'upload/requestMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      value,
    }),
  });
};

export default {
  uploadFile,
  embedding,
  requestMessage,
  prompt,
  getPrompt,
};
