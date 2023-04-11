import axios  from 'axios';
import api    from './api';
import host   from './host';
import { store } from '../../../index';


import { 
  CSRF_TOKEN,
  XML_HTTP_REQUEST 
} from '../../constants/Constants';

const axiosInstance = axios.create({
  baseURL : host.DEV_API,
  headers : {
    'Access-Control-Allow-Origin': '*', 
    'X-Requested-With': XML_HTTP_REQUEST,
    'Csrf-token'      : CSRF_TOKEN,
  }
});




export default axiosInstance;