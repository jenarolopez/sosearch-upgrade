import axios  from 'axios';
import axiosInstance, { localInstance } from './axios'
import api            from './api';
import {
  CONNECTION_ACTION_ADD,
  CONNECTION_ACTION_BLOCK,
  CONNECTION_ACTION_REMOVE,
  CONNECTION_ACTION_UNBLOCK,
  CONNECTION_TYPE_BLOCK,
  CONNECTION_TYPE_HEART,
  CONNECTION_TYPE_NOTE,
  CONNECTION_TYPE_RATING,
  CONNECTION_TYPE_SHORTLIST,
  DEFAULT_DISTANCE,
}                     from '../constants/Constants';

export const multipleRequest = (request) => axios.all(request);

export const calendarRequest = {
  
  addCalendarEvent: (data) => axiosInstance.post(
    api.CALENDAR_ADD_EVENT,
    data
  ),

  getCalendarEvents: (params, userId) => axiosInstance.get(
    api.CALENDAR_GET_ALL_EVENTS + '/' + userId,
    {
      params
    }
  ),

  updateCalendarEvent: (data) => axiosInstance.post(
    api.CALENDAR_UPDATE_EVENT,
    data
  ),

  updateMeetup: (data) => axiosInstance.post(
    api.CALENDAR_UPDATE_MEETUP,
    data
  )
}

export const callRequest = {

  getCall: (params, callType) => axiosInstance.get(
    api.CALL_GET_LOGS + '/' + callType,
    {
      params
    }
  ),

  getCallLogs: (payload) => axiosInstance.get(
      api.CALL_GET_USER_LOGS(payload.userId),
      {
        params: payload.params
      }
  ),

  startCall: (data, callType) => axiosInstance.post(
    api.CALL_START + '/' + callType,
    data
  ),

  respondToCall: (data, action, callThreadId) => axiosInstance.post(
    api.CALL_RESPOND + '/' + action + '/' + callThreadId,
    data
  )
}

export const connectionRequest = {
  
  addToShortlist: (data, connectionUserId) => axiosInstance.post(
    api.CONNECTION_SET_CONNECTION+ CONNECTION_TYPE_SHORTLIST+ '/'+ CONNECTION_ACTION_ADD+ '/'+ connectionUserId,
    data
  ),

  addNote: (data, connectionUserId) => axiosInstance.post(
    api.CONNECTION_SET_CONNECTION+ CONNECTION_TYPE_NOTE+ '/'+ CONNECTION_ACTION_ADD+ '/'+ connectionUserId,
    data
  ),

  blockUser: (data, connectionUserId) => axiosInstance.post(
    api.CONNECTION_SET_CONNECTION+ CONNECTION_TYPE_BLOCK+ '/'+ CONNECTION_ACTION_BLOCK+ '/'+ connectionUserId,
    data
  ),

  connectUser: (data, path) => axiosInstance.post(
    api.CONNECTION_SET_CONNECTION+ path,
    data
  ),

  getBlockedUser: (params) => axiosInstance.get(
    api.CONNECTION_GET_BLOCKED,
    {
      params
    }
  ),

  getConnection: (params, connectionUserId) => axiosInstance.get(
    api.CONNECTION_GET_CONNECTION+ connectionUserId,
    {
      params
    }
  ),

  getHistory: (params, userId) => axiosInstance.get(
    api.HISTORY_GET_ITEMS+ '/' + userId,
    {
      params
    }
  ),

  getShortlist: (params) => axiosInstance.get(
    api.CONNECTION_GET_SHORTLIST,
    {
      params
    }
  ),

  getUsersNearMe: (params) => axiosInstance.get(
    api.CONNECTION_GET_NEAR_ME,
    {
      params
    }
  ),

  getWhoIViewed: (params) => axiosInstance.get(
    api.CONNECTION_GET_WHO_I_VIEW,
    {
      params
    }
  ),

  getWhoLikedMe: (params) => axiosInstance.get(
    api.CONNECTION_GET_WHO_LIKE_ME,
    {
      params
    }
  ),

  getWhoViewedMe: (params) => axiosInstance.get(
    api.CONNECTION_GET_WHO_VIEW_ME,
    {
      params
    }
  ),

  likeUser: (data, path) => axiosInstance.post(
    api.CONNECTION_SET_CONNECTION+ CONNECTION_TYPE_HEART+ '/'+ path,
    data
  ),

  markAsSeen: (data) => axiosInstance.post(
    api.CONNECTION_MARK_AS_SEEN,
    data
  ),

  rateUser: (data, connectionUserId) => axiosInstance.post(
    api.CONNECTION_SET_CONNECTION+ CONNECTION_TYPE_RATING+ '/'+ CONNECTION_ACTION_ADD+ '/'+ connectionUserId,
    data
  ),

  removeShortlist: (data, connectionUserId) => axiosInstance.post(
    api.CONNECTION_SET_CONNECTION+ CONNECTION_TYPE_SHORTLIST+ '/'+ CONNECTION_ACTION_REMOVE+ '/'+ connectionUserId,
    data
  ),

  unblockUser: (data, connectionUserId) => axiosInstance.post(
    api.CONNECTION_SET_CONNECTION+ CONNECTION_TYPE_BLOCK+ '/'+ CONNECTION_ACTION_UNBLOCK+ '/'+ connectionUserId,
    data
  ),

  viewUser: (data, connectionUserId) => axiosInstance.post(
    api.CONNECTION_ADD_WHO_VIEW_ME+ connectionUserId,
    data
  ),
  
  usersProfile: (data) => axiosInstance.post(
    api.CONNECTION_USERS_PROFILE,
    data
  )

}

export const lookupRequest = {

  getProfileLookup: (lookup) => axiosInstance.get(
    api.PROFILE_LU+ lookup
  ),

  getSearchLookup: (lookup) => axiosInstance.get(
    api.USER_SEARCH_LU+ lookup
  ),

  getCredentialLookup: (lookup) => axiosInstance.get(
    api.CREDENTIAL_LU+ lookup
  ),

  getCountries: () => axiosInstance.get(
    api.COUNTRIES_LU
  ),
  getCountries: (lookup) => axiosInstance.get(
    api.COUNTRIES_CODE_LU+ lookup
  ), 
  getStates: (lookup) => axiosInstance.get(
    api.STATES_LU+ lookup
  ),
  getCities: (lookup) => axiosInstance.get(
    api.CITIES_LU+ lookup
  ),
}

export const notificationRequest = {

  bindUserNotification: (data) => axiosInstance.post(
    api.NOTIFICATION_BIND,
    data
  ),

  get: (userId,page) => axiosInstance.get(
    api.NOTIFICATION_GET + userId + '?page=' + page),

  seenNotification: (data) => axiosInstance.post(
    api.NOTIFICATION_SEEN,
    data
  ),

  sendNotification: (data) => axiosInstance.post(
    api.NOTIFICATION_SEND,
    data
  ),

  markAllNotificationRead: (data) => axiosInstance.post(
    api.NOTIFICATION_MARK_ALL_READ,
    data
  ),
  
  sendChatNotification: (data) => axiosInstance.post(
    api.NOTIFICATION_CHAT_SEND,
    data
  ),

  getUnseenNotification: (data) => axiosInstance.get(
    api.NOTIFICATION_GET_UNSEEN(data)
  )

}

export const nearMeRequest = {

  addNearMe: (data) => axiosInstance.post(
    api.NEAR_ME_ADD,
    data
  ),

  getNearMeHistory: (params) => {
    return axiosInstance.get(
      api.NEAR_ME_GET_HISTORY,
      {
        params
      }
    )
  },

  checkUsersNearMe: (params) => axiosInstance.get(
    api.NEAR_ME_CHECK_USER,
    {
      params
    }
  ),

  updateNearMe: (data) => axiosInstance.put(
    api.NEAR_ME_UPDATE,
    data
  ),

}

export const searchRequest = {
  getSearches: (params) => axiosInstance.get(
    api.SEARCH,
    {
      params
    }
  ),

  searchByUsername: (params) => axiosInstance.get(
    api.SEARCH + 'username',
    {
      params
    }
  ),
  
  addSearch: (data) => axiosInstance.post(
    api.SEARCH,
    data
  ),

  addSearchCriteria: (data, searchId, criteriaType) => axiosInstance.post(
    api.SEARCH + searchId + '/' + criteriaType,
    data
  ),

  updateSearch: (data, searchId) => axiosInstance.put(
    api.SEARCH + searchId,
    data
  ),

  deleteSearch: (data, searchId) => axiosInstance.delete(
    api.SEARCH + searchId,
    {
      data
    }
  )
}

export const twilioRequest = {
  addConversationParticipants: (data) => axiosInstance.post(
    api.USER_ADD_CHAT_PARTICIPANT,
    data
  ),

  // getPhoneCallsTo: (lookup) => axiosInstance.get(
  //   TWILIO_BASE_URL+ api.+ lookup
  // ),

  // getPhoneCallsFrom: (lookup) => axiosInstance.get(
  //   TWILIO_BASE_URL+ api.+ lookup
  // ), 
}

export const userRequest = {

  addUser: (data) => axiosInstance.post(
    api.USER_ADD,
    data
  ),

  cancelRequest: (source) => {
    source.cancel({
      code    : 100,
      message : 'Operation cancelled by the user.'
    });
  },

  changePassword: (data) => axiosInstance.post(
    api.USER_CHANGE_PASS,
    data
  ),

  checkEmail: (data) => axiosInstance.post(
    api.USER_CHECK_EMAIL,
    data
  ),

  checkUsername: (data) => axiosInstance.post(
    api.USER_CHECK_USERNAME,
    data
  ),

  claimReferralCredit: (data) => axiosInstance.post(
    api.USER_CLAIM_REFERRAL_CREDIT,
    data
  ),

  deleteUserMedia: (data) => axiosInstance.delete(
    api.USER_DELETE_MEDIA,
    {
      data
    }
  ),

  get: (params) => axiosInstance.get(
    api.USER_GET,
    {
      params
    }
  ),

  getDetail: (params) => axiosInstance.get(
    api.USER_GET_DETAIL,
    {
      params
    }
  ),

  getMediaGallery: (params) => axiosInstance.get(
    api.USER_GET_GALLERY,
    {
      params
    }
  ),

  getSubscriptionPlan: (params) => axiosInstance.get(
    api.SUBSCRIPTION_PLAN_LU,
    {
      params
    }
  ),

  getPresignedUrl: (data) => axiosInstance.post(
    api.USER_GET_PRESIGNED_URL,
    data
  ),

  getReferralCode: (params) => axiosInstance.get(
    api.USER_GET_REFERRAL_CODE,
    {
      params
    }
  ),

  getTwilioChatToken: (params) => axiosInstance.get(
    api.USER_GET_TWILIO_CHAT_TOKEN,
    {
      params
    }
  ),  

  getTwilioVideoToken: (params) => axiosInstance.get(
    api.USER_GET_TWILIO_VIDEO_TOKEN,
    {
      params,
    }
  ),  

  getTwilioVoiceToken: (params) => axiosInstance.get(
    api.USER_GET_TWILIO_VOICE_TOKEN,
    {
      params,
    }
  ),  

  reportIssue: (data) => axiosInstance.post(
    api.USER_REPORT_ISSUE,
    data
  ),

  resendCode: (data) => axiosInstance.post(
    api.USER_RESEND_CODE,
    data
  ),

  resetPassword: (data) => axiosInstance.post(
    api.USER_PASS_RESET,
    data
  ),

  resetPasswordResendCode: (data) => axiosInstance.post(
    api.USER_RESET_PASS_RESEND_CODE,
    data
  ),

  setUserField: (data) => axiosInstance.post(
    api.USER_UPDATE,
    data
  ),

  signIn: (data) => axiosInstance.post(
    api.USER_SIGNIN,
    data
  ),

  updateUser: (data) => axiosInstance.post(
    api.USER_UPDATE,
    data
  ),

  uploadPhoto: (data) => axiosInstance.post(
    api.USER_ADD_PHOTO,
    data
  ),

  verifyCode: (data) => axiosInstance.post(
    api.USER_VERIFY_CODE,
    data
  ),

  verifyPhone: (data) => axiosInstance.post(
    api.USER_VERIFY_PHONE,
    data
  ),

  verifyResetPasswordEmail: (data) => axiosInstance.post(
    api.USER_VERIFY_EMAIL,
    data
  ),
  
  saveFcmToken: (data) => axiosInstance.post(
    api.USER_TOKEN_FCM,
    data
  ),

  updateSubscription: (data, userId) => axiosInstance.patch(
    api.USER_UPDATE + userId + api.SUBSCRIPTION,
    data
  ),

  // getCoupons: (userId) => axiosInstance.get(
  //   api.USER_GET + userId + api.COUPONS
  // ),

  claimCoupon: (userId, couponId) => axiosInstance.post(
    api.USER_UPDATE + userId + api.COUPONS + '/' + couponId + api.CLAIM
  ),

  verifyReferralCode: (data) => axiosInstance.post(
    api.USER_CHECK_REFERRAL_CODE,
    data
  ),

  checkFreeTrial: (userId) => axiosInstance.get(
    api.USER_GET + userId + api.CHECK_FREE_TRIAL
  ),

  claimFreeTrial: (userId) => axiosInstance.post(
    api.USER_UPDATE + userId + api.CLAIM_FREE_TRIAL
  ),
  
  getCreditCount: (userId) => axiosInstance.get(
    api.USER_GET + userId + api.REFERRAL_COUNTER
  ),
  
  sendOtp: (data) => axiosInstance.post(
    api.USER_SEND_OTP,
    data
  ),

}

export const googleRequest = {
  getSuggestionPlace: (params) => axiosInstance.get(
    api.GOOGLE_PLACE_AUTOCOMPLETE,
    {
      params
    }
  )
}

/* * * * * * * * * * * * * * * * 
 *  Sample Object 
 * * * * * * * * * * * * * * * */
/*
export const connection = {
  * * * * * * * * * * * * * * * * 
  *  Sample POST API
  * * * * * * * * * * * * * * * * 
  get: (params) => axiosInstance.get(
    api.USER_GET, 
    {
      params
    }),

  * * * * * * * * * * * * * * * * 
  *  Sample POST API
  * * * * * * * * * * * * * * * * 
  post: (data) => axiosInstance.post(
    api.USER_GET, 
    data
  ),
}
*/