import axios  from 'axios';
import api    from './api';
import host   from './host';


import { 
  CSRF_TOKEN,
  XML_HTTP_REQUEST 
} from '../../constants/Constants';

const axiosInstance = axios.create({
  baseURL : host.STRIPE_API,
  headers : {
    // 'Content-Type'    : 'application/x-www-form-urlencoded',
    'X-Requested-With': XML_HTTP_REQUEST,
    'Csrf-token'      : CSRF_TOKEN,
    'Authorization'   : 'Bearer sk_test_51KkwTrJ4lpxNpT7NzXXvbxxR5nEGDJ0eOAkvNGp4SDaUWMXjO124OKkCb8CVYsySudKuajZ11XVazvz7WCd5mrwB00mmnENdLh'

  }
});

export default axiosInstance;
