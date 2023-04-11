const action = {

  CONNECTION_SET_USER_CONNECTION              : "CONNECTION_SET_USER_CONNECTION",
  CONNECTION_SET_USER_CONNECTION_LIST         : "CONNECTION_SET_USER_CONNECTION_LIST",
  CONNECTION_GET_USER_CONNECTION_LIST         : "CONNECTION_GET_USER_CONNECTION_LIST",

  CONNECTION_VIEW_PROFILE                     : "CONNECTION_VIEW_PROFILE",
  CONNECTION_VIEW_PROFILE_ERROR               : "CONNECTION_VIEW_PROFILE_ERROR",

  CONNECTION_GET_HISTORY                      : "CONNECTION_GET_HISTORY",
  CONNECTION_GET_HISTORY_SUCCESS              : "CONNECTION_GET_HISTORY_SUCCESS",
  CONNECTION_GET_HISTORY_ERROR                : "CONNECTION_GET_HISTORY_ERROR",

  CONNECTION_GET_SHORTLIST                    : "CONNECTION_GET_SHORTLIST",
  CONNECTION_GET_SHORTLIST_SUCCESS            : "CONNECTION_GET_SHORTLIST_SUCCESS",
  CONNECTION_GET_SHORTLIST_ERROR              : "CONNECTION_GET_SHORTLIST_ERROR",

  CONNECTION_UPDATE_SHORTLIST                 : "CONNECTION_UPDATE_SHORTLIST",

  CONNECTION_GET_NEAR_ME                      : "CONNECTION_GET_NEAR_ME",
  CONNECTION_GET_NEAR_ME_SUCCESS              : "CONNECTION_GET_NEAR_ME_SUCCESS",
  CONNECTION_GET_NEAR_ME_ERROR                : "CONNECTION_GET_NEAR_ME_ERROR",

  CONNECTION_GET_RECENT_VIEWS                 : "CONNECTION_GET_RECENT_VIEWS",
  CONNECTION_GET_RECENT_VIEWS_SUCCESS         : "CONNECTION_GET_RECENT_VIEWS_SUCCESS",
  CONNECTION_GET_RECENT_VIEWS_ERROR           : "CONNECTION_GET_RECENT_VIEWS_ERROR",
  
  CONNECTION_SET_MEDIA_GALLERY                : "CONNECTION_SET_MEDIA_GALLERY",

  CONNECTION_REMOVE_USER_CONNECTION           : "CONNECTION_REMOVE_USER_CONNECTION",

  CONNECTION_REMOVE_NEAR_ME                   : "CONNECTION_REMOVE_NEAR_ME",

  CONNECTION_SET_CALL_ACTIVITY                : "CONNECTION_SET_CALL_ACTIVITY",

  CONNECTION_CHAT_REQUEST_UPDATE              : "CONNECTION_CHAT_REQUEST_UPDATE",
  CONNECTION_PHONE_REQUEST_UPDATE             : "CONNECTION_PHONE_REQUEST_UPDATE",
  CONNECTION_VIDEO_REQUEST_UPDATE             : "CONNECTION_VIDEO_REQUEST_UPDATE",

  CONNECTION_DISABLED                         : "CONNECTION_DISABLED",

  setUserConnection: connection => ({
    type    : action.CONNECTION_SET_USER_CONNECTION,
    payload : connection
  }),

  setUserConnectionList: userConnection => ({
    type    : action.CONNECTION_SET_USER_CONNECTION_LIST,
    payload : userConnection
  }),

  viewProfile: connection => ({
    type    : action.CONNECTION_VIEW_PROFILE,
    payload : connection
  }),

  getHistory: (connection) => ({
    type    : action.CONNECTION_GET_HISTORY,
    payload : connection
  }),
  
  getShortlist: () => ({
    type    : action.CONNECTION_GET_SHORTLIST
  }),

  updateShortlist: shortlist => ({
    type    : action.CONNECTION_UPDATE_SHORTLIST,
    payload : shortlist
  }),

  getNearMeHistory: () => ({
    type    : action.CONNECTION_GET_NEAR_ME
  }),

  getRecentViews: page => ({
    type    : action.CONNECTION_GET_RECENT_VIEWS,
    payload : page,
  }),

  removeUserConnection: userConnection => ({
    type    : action.CONNECTION_REMOVE_USER_CONNECTION,
    payload : userConnection
  }),

  setUserMediaGallery: mediaGallery => ({
    type    : action.CONNECTION_SET_MEDIA_GALLERY,
    payload : mediaGallery
  }),

  removeNearMe: nearMeId => ({
    type    : action.CONNECTION_REMOVE_NEAR_ME,
    payload : nearMeId
  }),

  setCallActivity: (call) => ({
    type    : action.CONNECTION_SET_CALL_ACTIVITY,
    payload : call
  }),

  updateChatRequest: notifData => ({
    type    : action.CONNECTION_CHAT_REQUEST_UPDATE,
    payload : notifData
  }),

  updatePhoneRequest: notifData => ({
    type    : action.CONNECTION_PHONE_REQUEST_UPDATE,
    payload : notifData
  }),

  updateVideoRequest: notifData => ({
    type    : action.CONNECTION_VIDEO_REQUEST_UPDATE,
    payload : notifData
  }),

  setDisabledConnection: notifData => ({
    type    : action.CONNECTION_DISABLED,
    payload : notifData
  })

};

export default action;
