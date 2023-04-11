const action = {

  USER_SIGNIN                     : "USER_SIGNIN",
  USER_SIGNED_IN                  : "USER_SIGNED_IN",

  USER_TOKEN_UPDATE               : "USER_TOKEN_UPDATE",
  TWILIO_VIDEO_TOKEN_SET          : "USER_TWILIO_VIDEO_TOKEN_UPDATE",

  USER_GET                        : "USER_GET",
  USER_UPDATE                     : "USER_UPDATE",
  USER_DELETE                     : "USER_DELETE",
  USER_FIELD_GET                  : "USER_FIELD_GET",
  USER_FIELD_UPDATE               : "USER_FIELD_UPDATE",
  USER_FIELD_GET_ERROR            : "USER_FIELD_GET_ERROR",
  USER_CREDIT_CARD_UPDATE         : "USER_CREDIT_CARD_UPDATE",
  USER_SETTING_UPDATE             : "USER_SETTING_UPDATE",
  USER_SUBSCRIPTION_UPDATE        : "USER_SUBSCRIPTION_UPDATE",
  USER_DETAIL_GET                 : "USER_DETAIL_GET",
  USER_DETAIL_UPDATE              : "USER_DETAIL_UPDATE",
  USER_MEDIA_GET                  : "USER_MEDIA_GET",
  USER_UPDATE_PROFILE_PHOTO       : "USER_UPDATE_PROFILE",
  USER_SIGN_IN_SET                : "USER_SIGN_IN_SET",
  USER_NOTIF_SAVE_CHANNEL         : "USER_NOTIF_SAVE_CHANNEL",
  USER_NOTIF_GET                  : "USER_NOTIF_GET",
  USER_NOTIF_GET_SUCCESS          : "USER_NOTIF_GET_SUCCESS",
  USER_TOKEN_FCM_UPDATE           : "USER_TOKEN_FCM_UPDATE",

  USER_NEXT_SIGN_IN_ATTEMPT_SET   : "USER_NEXT_SIGN_IN_ATTEMPT_SET",
  USER_NEXT_SIGN_IN_ATTEMPT_RESET : "USER_NEXT_SIGN_IN_ATTEMPT_RESET",
  USER_MAX_SIGN_IN_ATTEMPT_REACH  : "USER_MAX_SIGN_IN_ATTEMPT_REACH",

  REFERRAL_CODE_UPDATE            : "REFERRAL_CODE_UPDATE",
  REFERRAL_REWARD_CLAIM           : "REFERRAL_REWARD_CLAIM",
  REFERRAL_REWARD_MSG_DISMISS     : "REFERRAL_REWARD_MSG_DISMISS",
  
  ADD_USER_SETTINGS_OBJECT        : "ADD_USER_SETTINGS_OBJECT",


  signInUser: user => ({
    type    : action.USER_SIGNIN,
    payload : user
  }),

  updateToken: token => ({
    type    : action.USER_TOKEN_UPDATE,
    payload : token
  }),

  updateTokenFcm: tokenFcm => ({
    type    : action.USER_TOKEN_FCM_UPDATE,
    payload : tokenFcm
  }),

  updateTwilioVideoToken: token => ({
    type    : action.TWILIO_VIDEO_TOKEN_SET,
    payload : token
  }),

  updateUser: user => ({
    type    : action.USER_UPDATE,
    payload : user
  }),

  getUserField: userId => ({
    type    : action.USER_FIELD_GET,
    payload : userId
  }),

  updateUserField: userField => ({
    type    : action.USER_FIELD_UPDATE,
    payload : userField
  }),

  updateUserSubscription: subscription => ({
    type    : action.USER_SUBSCRIPTION_UPDATE,
    payload : subscription
  }),

  updateUserCreditCard: userCreditCard => ({
    type    : action.USER_CREDIT_CARD_UPDATE,
    payload : userCreditCard
  }),

  updateUserSettings: userSettings => ({
    type    : action.USER_SETTING_UPDATE,
    payload : userSettings
  }),

  updateUserDetail: userDetail => ({
    type    : action.USER_DETAIL_UPDATE,
    payload : userDetail
  }),

  setUserMedia: userMedia => ({
    type    : action.USER_MEDIA_GET,
    payload : { userMedia }
  }),

  setProfilePhoto: mediaProfile => ({
    type    : action.USER_UPDATE_PROFILE_PHOTO,
    payload : { mediaProfile }
  }),

  setUserIsSignedIn: () => ({
    type    : action.USER_SIGN_IN_SET,
  }),

  setNextSignInAttempt: nextSignInAttempt => ({
    type    : action.USER_NEXT_SIGN_IN_ATTEMPT_SET,
    payload : nextSignInAttempt
  }),

  resetNextSignInAttempt: () => ({
    type    : action.USER_NEXT_SIGN_IN_ATTEMPT_RESET,
  }),

  reachMaxSignInAttempt: () => ({
    type    : action.USER_MAX_SIGN_IN_ATTEMPT_REACH
  }),
  
  updateReferralCode: referralCode => ({
    type    : action.REFERRAL_CODE_UPDATE,
    payload : referralCode
  }),

  claimReferralReward: () => ({
    type    : action.REFERRAL_REWARD_CLAIM
  }),

  dismissReferralRewardMsg: () => ({
    type    : action.REFERRAL_REWARD_MSG_DISMISS
  }),

  userSignedIn: () => ({
    type    : action.USER_SIGNED_IN
  })

};

export default action;
