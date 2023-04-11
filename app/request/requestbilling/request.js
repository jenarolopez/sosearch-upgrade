import axios  from 'axios';
import axiosInstance  from './axios'
import api            from './api';

// TODO move the headers to axiosInstance
export const billingRequest = {
  
  billingSubscribe: (data) => axiosInstance.post(
    api.BILLING_SUBSCRIBE,
    data,
    {
      header: {
        ['user-id'] : data.userId
      }
    }
  ),

  billingUnsubscribe: (stripeSubscriptionPlanId) => axiosInstance.delete(
    api.BILLING_UNSUBSCRIBE +'/'+stripeSubscriptionPlanId,
    {
      header: {
        // ['user-id'] : data.userId
        // ['user-id'] : 12
      }
    }
  ),

  paymentLink: (data) => axiosInstance.post(
    api.PAYMENT_LINK,
    data,
    {
      header: {
        ['user-id'] : data.userId
      }
    }
  ),

  // claimCoupon: (data) => axiosInstance.post(
  //   api.COUPON_CLAIM,
  //   data,
  //   {
  //     header: {
  //       ['user-id'] : data.userId
  //     }
  //   }
  // ),

  unsubscribeWipeData: (userId) => axiosInstance.delete(
    api.UNSUBSCRIBE_WIPE_DATA +'/'+ userId,
  ),

}


