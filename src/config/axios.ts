import axios from 'axios';

const setupAxios = (): void => {
  axios.defaults.timeout = 60 * 1000;
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_API_URL;
};

export default setupAxios;
