import axios from 'axios';
import config from 'config/appConfig';

const setupAxios = (): void => {
  axios.defaults.timeout = 60 * 1000;
  axios.defaults.baseURL = config.apiUrl;
};

export default setupAxios;
