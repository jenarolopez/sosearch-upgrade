import axios  from 'axios';
import api    from './api';
import host   from './host';
import { store } from '../../index';

import { 
  CSRF_TOKEN,
  XML_HTTP_REQUEST 
} from '../constants/Constants';

const axiosInstance = axios.create({
  baseURL : host.DEV_API,
  headers : {
    'X-Requested-With': XML_HTTP_REQUEST,
    'Csrf-token'      : CSRF_TOKEN
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().User.token
    if (token) config.headers.Authorization = api.BEARER+ token.jwt;

    return config;
  },
  (error) => {
    console.log('error : ', error);

    return Promise.reject (error);
  }
);

const localInstance = axios.create({
  baseURL : host.LOCAL_API,
  headers : {
    'X-Requested-With': XML_HTTP_REQUEST,
    'Csrf-token'      : CSRF_TOKEN
  }
});

localInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().User.token
    if (token) config.headers.Authorization = api.BEARER+ token.jwt;

    return config;
  },
  (error) => {
    console.log('error : ', error);

    return Promise.reject (error);
  }
);

export default axiosInstance;
export { localInstance };