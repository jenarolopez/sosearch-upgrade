import { DEFAULT_DISTANCE } from "../constants/Constants";

const api = {

  TIMEOUT_LIMIT               : 1000,
  BEARER                      : 'Bearer ',
  
  // Public
  USER_SIGNIN                 : 'public/signin',
  USER_ADD                    : 'public/add',
  USER_VERIFY_PHONE           : 'public/verification',
  USER_VERIFY_EMAIL           : 'public/verifyresetpasswordemail',
  USER_RESET_PASS_RESEND_CODE : 'public/resetpassword/resendcode',
  USER_VERIFY_CODE            : 'public/verifypassresetcode',
  USER_PASS_RESET             : 'public/resetpassword',
  USER_CHECK_EMAIL            : 'public/email/availability',
  USER_CHECK_USERNAME         : 'public/username/availability',
  USER_RESEND_CODE            : 'public/resendcode',
  USER_SEND_OTP               : 'public/send/otp',

  // User
  USER_GET                    : 'user/',
  USER_GET_DETAIL             : 'user/detail',
  USER_DELETE_MEDIA           : 'user/media/delete',
  USER_UPDATE                 : 'user/',
  USER_TOKEN_FCM              : 'user/fcmToken',
  SUBSCRIPTION                : '/subscription',
  COUPONS                     : '/coupons',
  CLAIM_FREE_TRIAL            : '/free_trial/claim',
  CHECK_FREE_TRIAL            : '/free_trial/check',
  REFERRAL_COUNTER            : '/referral/counter',
  CLAIM                       : '/claim',
  USER_REPORT_ISSUE           : 'user/reportissue',
  USER_GET_PRESIGNED_URL      : 'user/media/upload',
  USER_ADD_PHOTO              : 'user/media/photo',
  USER_GET_GALLERY            : 'user/media/gallery',
  USER_GET_TWILIO_CHAT_TOKEN  : 'user/token/twiliochat',
  USER_GET_TWILIO_VOICE_TOKEN : 'user/token/twiliovoice',
  USER_GET_TWILIO_VIDEO_TOKEN : 'user/token/twiliovideo',
  USER_CHANGE_PASS            : 'user/changepassword',
  USER_GET_REFERRAL_CODE      : 'user/referral/getCode',
  USER_CLAIM_REFERRAL_CREDIT  : 'user/referral/claim',
  USER_ADD_CHAT_PARTICIPANT   : 'user/chat/participant',
  USER_CHECK_REFERRAL_CODE    : 'user/referralCode/availability',

  // Search
  SEARCH                      : 'search/',
  SEARCH_GET_SEARCHES         : 'search',
  SEARCH_USER_BY_USERNAME     : 'search/username',
  SEARCH_ADD                  : 'search',
  SEARCH_UPDATE_CRITERIA      : 'search/',
  SEARCH_UPDATE               : 'search/',

  SEARCH_GET_ITEMS            : 'search/list',
  SEARCH_GET_DETAIL           : 'search/detail/',
  SEARCH_USER_BY_CRITERIA     : 'search/exec/',
  SEARCH_DELETE               : 'search/',
  SEARCH_SET_CRITERIA         : 'search/criteria/',

  // Connection
  CONNECTION_GET_SHORTLIST    : 'connection/shortlist',
  CONNECTION_GET_BLOCKED      : 'connection/block',
  CONNECTION_GET_NEAR_ME      : 'connection/nearme',
  CONNECTION_GET_WHO_VIEW_ME  : 'connection/whoviewme',
  CONNECTION_GET_WHO_I_VIEW   : 'connection/whoiview',
  CONNECTION_GET_WHO_LIKE_ME  : 'connection/wholikeme',
  CONNECTION_GET_CONNECTION   : 'connection/',
  CONNECTION_SET_CONNECTION   : 'connection/',
  CONNECTION_ADD_WHO_VIEW_ME  : 'connection/whoviewme/',
  CONNECTION_MARK_AS_SEEN     : 'connection/view/',
  CONNECTION_USERS_PROFILE    : 'connection/usersprofile/',

  // History
  HISTORY_GET_ITEMS           : 'history',

  // Look-up
  PROFILE_LU                  : 'lookup/profile/',
  USER_SEARCH_LU              : 'lookup/search/',
  CREDENTIAL_LU               : 'lookup/credential/',
  SUBSCRIPTION_PLAN_LU        : 'lookup/subscription/',

  COUNTRIES_LU                : 'lookup/countries',
  COUNTRIES_CODE_LU           : 'lookup/countries/',
  STATES_LU                   : 'lookup/states/',
  CITIES_LU                   : 'lookup/cities/',

  // Call
  CALL_GET_LOGS               : 'call/getcall',
  CALL_START                  : 'call/startCall',
  CALL_RESPOND                : 'call',
  CALL_GET_USER_LOGS          : (userId) => `call/${userId}`,

  // Calendar  
  CALENDAR_GET_ALL_EVENTS     : 'calendar/events',
  CALENDAR_ADD_EVENT          : 'calendar/event/add',
  CALENDAR_UPDATE_MEETUP      : 'calendar/meetup/update',
  CALENDAR_UPDATE_EVENT       : 'calendar/update',

  // Near Me
  NEAR_ME_ADD                 : 'nearme/',
  NEAR_ME_CHECK_USER          : 'nearme/check',
  NEAR_ME_GET_HISTORY         : 'nearme/',
  NEAR_ME_UPDATE              : 'nearme/',
  
  // Notification
  NOTIFICATION_BIND           : 'notification/bind',
  NOTIFICATION_GET            : 'notification/',
  NOTIFICATION_SEEN           : 'notification/seen',
  NOTIFICATION_SEND           : 'notification/send',
  NOTIFICATION_CHAT_SEND      : 'notification/chat/send',
  NOTIFICATION_MARK_ALL_READ  : 'notification/markAllRead',
  NOTIFICATION_GET_UNSEEN     : (userId) => `notification/${userId}/count/unseen`,

  //Google Place API
  GOOGLE_PLACE_AUTOCOMPLETE   : 'https://maps.googleapis.com/maps/api/place/autocomplete/json'

};

export default api;
