import action from "./action";

const initState = {
  nav                       : 'Home',
  isSignedIn                : false,
  isLoading                 : false,
  isLoggedIn                : false,
  isMaxSignInAttemptReached : false,
  nextSignInAttempt         : 0,
  tokenFcm                  : '',
  user                      : {},
  userField                 : {
                                position           : {
                                                      isLocationOn : 0
                                                     }
                              },
  userSubscription          : {},
  notification              : {
                                notificationChannel: {
                                                       channelType : '',
                                                       deviceToken : ''
                                                     }
                              },
  userSettings              : {

                                isGeneralSoundOn          : 1,
                                isGeneralAlertOn          : 1,
                                isReachabilityStatusOn    : 1,
                                isChatAlertOn             : 1,
                                isChatSoundOn             : 1,
                                isVoiceCallAlertOn        : 1,
                                isVoiceCallSoundOn        : 1,
                                isVideoCallAlertOn        : 1,
                                isVideoCallSoundOn        : 1,
                                isNotifAlertOn            : 1,
                                isNotifSoundOn            : 1,
                                chatSoundName             : 'iphone.mp3',
                                videoCallSoundName        : 'iphone.mp3',
                                voiceCallSoundName        : 'iphone.mp3',
                                notifSoundName            : 'iphone.mp3',
                                whoAdded                  : 0,
                                whenAdded                 : 0,
                                whoUpdated                : 0,
                                whenUpdated               : 0
                              },
  rewards                   : {
                                referralCode       : '',
                                isClaimed          : false,
                                isMessageDismissed : false
                              },
  media                     : [],
  twilioVideoToken          : null
};

export default function userReducer(state = initState, act) {

  switch (act.type) {

    case action.ADD_USER_SETTINGS_OBJECT: {
      console.log("redux/user/reducer.js:ADD_USER_SETTINGS_OBJECT");
      console.log("state: ", state);
      let userSettings        = initState.userSettings;
      userSettings.whoAdded   = (state?.user?.userId) ? state?.user?.userId : 0;
      userSettings.whoUpdated = (state?.user?.userId) ? state?.user?.userId : 0;
      return {
        ...state,
        userSettings
      }
    }

    case action.USER_SIGNIN:
      console.log("redux/user/reducer.js:SIGNIN_SUBMIT");
      return {
        ...state,
        isSignedIn                   : true,
        user                         : act.payload
      }
    
    case action.USER_TOKEN_UPDATE:
      console.log("redux/user/reducer.js:USER_TOKEN_UPDATE");
      return {
        ...state,
        token                        : act.payload,
      } 

    case action.USER_TOKEN_FCM_UPDATE:
      console.log("redux/user/reducer.js:USER_TOKEN_UPDATE");
      return {
        ...state,
        tokenFcm                     : act.payload,
      } 

    case action.TWILIO_VIDEO_TOKEN_SET:
      console.log("redux/user/reducer.js:TWILIO_VIDEO_TOKEN_SET");
      return {
        ...state,
        twilioVideoToken             : act.payload,
      } 

    case action.USER_UPDATE:
      console.log("redux/user/reducer.js:USER_UPDATE");
      return {
        ...state,
        user                         : act.payload,
      }

    case action.USER_FIELD_UPDATE:
      console.log("redux/user/reducer.js:USER_FIELD_UPDATE");
      return {
        ...state,
        userField                    : act.payload,
        isLoggedIn                   : true,
      }

    case action.USER_UPDATE_PROFILE_PHOTO:
      console.log("redux/user/reducer.js:USER_UPDATE_PROFILE_PHOTO");
      return {
        ...state,
        user: {
          ...state.user,
          ...act.payload
        }
      }

    case action.USER_MEDIA_GET:
      console.log("redux/user/reducer.js:USER_MEDIA_GET");
      return {
        ...state,
        userMedia : act.payload.userMedia,
      }



    case action.USER_SIGN_IN_SET:
      console.log("redux/user/reducer.js:USER_SIGN_IN_SET");
      return {
        ...state,
        isSignedIn                   : true
      }

    case action.USER_CREDIT_CARD_UPDATE:
      console.log("redux/user/reducer.js:USER_CREDIT_CARD_UPDATE");
      return {
        ...state,
        userCreditCard               : act.payload,
      }

    case action.USER_SETTING_UPDATE:
      console.log("redux/user/reducer.js:USER_SETTING_UPDATE");
      return {
        ...state,
        userSettings                  : act.payload,
      }

    case action.USER_SUBSCRIPTION_UPDATE:
      console.log("redux/user/reducer.js:USER_SUBSCRIPTION_UPDATE");
      return {
        ...state,
        userSubscription             : act.payload,
      }

    case action.USER_DETAIL_UPDATE:
      console.log("redux/user/reducer.js:USER_DETAIL_UPDATE");
      return {
        ...state,
        state                        : act.payload 
      }

    case action.USER_NOTIF_SAVE_CHANNEL:
      console.log("redux/user/reducer.js:USER_NOTIF_SAVE_CHANNEL");
      return {
        ...state,
        notification                 : {
                                         notificationList    : {...state.notification.notificationList},
                                         notificationChannel : act.payload 
                                       }
      }

    case action.USER_NEXT_SIGN_IN_ATTEMPT_SET:
      console.log("redux/user/reducer.js:USER_NEXT_SIGN_IN_ATTEMPT_SET");
      return {
        ...state,
        nextSignInAttempt            : act.payload
      }

    case action.USER_NEXT_SIGN_IN_ATTEMPT_RESET:
      console.log("redux/user/reducer.js:USER_NEXT_SIGN_IN_ATTEMPT_RESET");
      return {
        ...state,
        nextSignInAttempt            : 0
      }

    case action.USER_MAX_SIGN_IN_ATTEMPT_REACH:
      console.log("redux/user/reducer.js:USER_MAX_SIGN_IN_ATTEMPT_REACH");
      return {
        ...state,
        isMaxSignInAttemptReached    : !state.isMaxSignInAttemptReached
      }

    case action.REFERRAL_CODE_UPDATE:
      console.log("redux/user/reducer.js:REFERRAL_CODE_UPDATE");
      return {
        ...state,
        rewards : {
          ...state.rewards,  
          referralCode               : act.payload
        }
      }

    case action.REFERRAL_REWARD_CLAIM:
      console.log("redux/user/reducer.js:REFERRAL_REWARD_CLAIM");
      return {
        ...state,
        rewards : {
          ...state.rewards,  
          isClaimed                  : true
        }
      }

    case action.REFERRAL_REWARD_MSG_DISMISS:
      console.log("redux/user/reducer.js:REFERRAL_REWARD_MSG_DISMISS");
      return {
        ...state,
        rewards : {
          ...state.rewards,  
          isMessageDismissed         : true
        }
      }

    case action.USER_SIGNED_IN:
      console.log("redux/user/reducer.js:SIGNED_IN");
      return{
        ...state,
        isSignedIn                   : true,
      }

    default:
      return state
  }
}
