import axios  from 'axios';
import axiosInstance  from './axios'
import api            from './api';

export const stripeRequest = {
  
  paymentMethod: (data) => axiosInstance.post(
    api.PAYMENT_METHOD,
    data
  ),

  paymentIntent: (data) => axiosInstance.post(
    api.PAYMENT_INTENT + data + api.CONFIRM
  )
}


