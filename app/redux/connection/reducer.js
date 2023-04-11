import action from "./action";
import { STATUS_RECEIVED, STATUS_ACTIVE, STATUS_INACTIVE, PHONE_CALL_REQUEST_SENT, VIDEO_CALL_REQUEST_SENT, MESSAGE_REQUEST_SENT, VIDEO_CALL_DISABLED, PHONE_CALL_DISABLED, MESSAGE_DISABLED } from "../../constants/Constants";

const initState = {
  userConnectionList   : [],
  userConnection       : {},
  shortlist            : [],
  nearMeList           : [],
  recentViewsList      : {
    likedMe  : [],
    iViewed  : [],
    viewedMe : [],
    page: { likedMePage    : 1,
            iViewedPage    : 1,
            viewedMePage   : 1
          }
  },
  isLoading               : false,
  isHistoryLoading        : false,
  isShortlistLoaded       : false,
  isShortlistLoading      : false,
  isShortlistNetworkError : false,
  isNearMeLoading         : false,
  isRecentViewsLoading    : false,
  isPhoneCallActive       : false,
  isVideoCallActive       : false,
  isNearMeLoaded          : false
};   

export default function connectionReducer(state = initState, act) {

  switch (act.type) {

    case action.CONNECTION_SET_USER_CONNECTION:
      console.log("redux/connection/reducer.js:CONNECTION_SET_USER_CONNECTION");
      const wasUserViewed = state.recentViewsList.iViewed.find(userConnection => userConnection.user.userId === act.payload.user.userId);

      return {
        ...state,
        userConnection     : (Object.keys(act.payload).length > 0 && state.userConnection.user) ? (state.userConnection.user.userId == act.payload.user.userId) ?
                             {
                                ...state.userConnection,
                                ...act.payload
                             } : act.payload 
                             : act.payload,
        userConnectionList : Object.keys(act.payload).length > 0 ? state.userConnectionList.map(
                              (userConnection) => {
                                return (userConnection.user.userId != act.payload.user.userId) ? userConnection : act.payload
                             }) : state.userConnectionList,
        recentViewsList    : {
                              ...state.recentViewsList,
                              iViewed : wasUserViewed ? state.recentViewsList.iViewed : [...state.recentViewsList.iViewed, act.payload]
                             }
      }

    case action.CONNECTION_GET_USER_CONNECTION_LIST:
      console.log("redux/connection/reducer.js:CONNECTION_GET_USER_CONNECTION_LIST");
      return {
        ...state,
        userConnectionList : act.payload,
        isLoading          : true
      }

    case action.CONNECTION_SET_USER_CONNECTION_LIST:
      console.log("redux/connection/reducer.js:CONNECTION_SET_USER_CONNECTION_LIST");
      return {
        ...state,
        userConnectionList : act.payload,
        isLoading          : false
      }

    case action.CONNECTION_VIEW_PROFILE:
      console.log("redux/connection/reducer.js:CONNECTION_VIEW_PROFILE");

      let updatedRecentViewsList = state.recentViewsList;

      if (act.payload.profileViewId) {
        updatedRecentViewsList = {
          ...updatedRecentViewsList,
          viewedMe : updatedRecentViewsList.viewedMe.map((userConnection) => {
            if (userConnection.profileView.profileViewId === act.payload.profileViewId) {
              userConnection.profileView['isSeen'] = true;
              return userConnection;
            } else {
              return userConnection;
            }
           })
        }
      }

      return {
        ...state,
        isHistoryLoading   : true,
        recentViewsList    : updatedRecentViewsList
      }

    case action.CONNECTION_VIEW_PROFILE_ERROR:
      console.log("redux/connection/reducer.js:CONNECTION_VIEW_PROFILE_ERROR");

      return {
        ...state,
        isHistoryLoading   : true,
        recentViewsList    : {
          ...state.recentViewsList,
          viewedMe : updatedRecentViewsList.viewedMe.map((userConnection) => {
            if (userConnection.profileView.profileViewId === act.payload.profileViewId) {
              userConnection.profileView['isSeen'] = false;
              return userConnection;
            } else {
              return userConnection;
            }
           })
        }
      }

    case action.CONNECTION_GET_SHORTLIST:
      console.log("redux/connection/reducer.js:CONNECTION_GET_SHORTLIST");
      return {
        ...state,
        isShortlistLoading : true,
        isShortlistNetworkError : false,
      }

    case action.CONNECTION_GET_SHORTLIST_SUCCESS:
      console.log("redux/connection/reducer.js:CONNECTION_GET_SHORTLIST_SUCCESS");
      return {
        ...state,
        shortlist               : act.payload,
        isShortlistLoaded       : true,
        isShortlistLoading      : false,
        isShortlistNetworkError : false,
      }

    case action.CONNECTION_GET_SHORTLIST_ERROR:
      console.log("redux/connection/reducer.js:CONNECTION_GET_SHORTLIST_ERROR");
      return {
        ...state,
        shortlist               : [],
        isShortlistLoading      : false,
        isShortlistNetworkError : true
      }

    case action.CONNECTION_UPDATE_SHORTLIST:
      console.log("redux/connection/reducer.js:CONNECTION_UPDATE_SHORTLIST");
      return {
        ...state,
        shortlist : act.payload,
      }

    case action.CONNECTION_GET_NEAR_ME:
      console.log("redux/connection/reducer.js:CONNECTION_GET_NEAR_ME");
      return {
        ...state,
        isNearMeLoading     : true,
        isNearMeRefreshing  : true
      }

    case action.CONNECTION_GET_NEAR_ME_SUCCESS:
      console.log("redux/connection/reducer.js:CONNECTION_GET_NEAR_ME_SUCCESS");
      const filteredNearMeList = state.nearMeList.filter(userNearMe => !act.payload.some(filtered => filtered.user.userId === userNearMe.user.userId));

      return {
        ...state,
        nearMeList          : [...filteredNearMeList, ...act.payload],
        isNearMeLoading     : false,
        isNearMeRefreshing  : false,
        isNearMeLoaded      : true
      }

    case action.CONNECTION_GET_NEAR_ME_ERROR:
      console.log("redux/connection/reducer.js:CONNECTION_GET_NEAR_ME_ERROR");
      return {
        ...state,
        nearMeList          : state.nearMeList,
        isNearMeLoading     : false,
        isNearMeRefreshing  : false
      }
      
    case action.CONNECTION_REMOVE_NEAR_ME:
      console.log("redux/connection/reducer.js:CONNECTION_REMOVE_NEAR_ME");
      return {
        ...state,
        nearMeList          : state.nearMeList.filter(userNearMe => userNearMe.nearMe.nearMeId != act.payload),
      }
    
    case action.CONNECTION_GET_RECENT_VIEWS:
      console.log("redux/connection/reducer.js:CONNECTION_GET_RECENT_VIEWS");
      return {
        ...state,
        isRecentViewsLoading: true
      }

    case action.CONNECTION_GET_RECENT_VIEWS_SUCCESS:
      console.log("redux/connection/reducer.js:CONNECTION_GET_RECENT_VIEWS_SUCCESS");
      if(state?.recentViewsList?.page?.length != 0){
        return {
          ...state,
          recentViewsList: {
            ...state.recentViewsList,
            likedMe  :   act?.payload?.hasPayload ? [ ...state.recentViewsList?.likedMe,  ...act.payload?.likedMe  ] : act.payload?.likedMe ,
            iViewed  :   act?.payload?.hasPayload ? [ ...state.recentViewsList?.iViewed,  ...act.payload?.iViewed  ] : act.payload?.iViewed , 
            viewedMe :   act?.payload?.hasPayload ? [ ...state.recentViewsList?.viewedMe, ...act.payload?.viewedMe ] : act.payload?.viewedMe,
            page     :    { ...act.payload?.page } 
          },
          isRecentViewsLoading : false,
          isRecentViewsLoaded  : true,
        }
  
      }
     
    case action.CONNECTION_GET_RECENT_VIEWS_ERROR:
      console.log("redux/connection/reducer.js:CONNECTION_GET_RECENT_VIEWS_ERROR");
      return {
        ...state,
        isRecentViewsLoading: false
      }

    case action.CONNECTION_SET_MEDIA_GALLERY:
      console.log("redux/connection/reducer.js:CONNECTION_SET_MEDIA_GALLERY");
      return {
        ...state,
        userConnection     : {
          ...state.userConnection,
          mediaGallery : act.payload
        },
        isLoading          : false
      }  

    case action.CONNECTION_REMOVE_USER_CONNECTION:
      console.log("redux/connection/reducer.js:CONNECTION_REMOVE_USER_CONNECTION");
      console.log('act.payload : ', act.payload);

      const newRecentViewsList = {
        iViewed   : state.recentViewsList.iViewed.filter(userConnection => userConnection.connectionUserId != act.payload),
        likedMe   : state.recentViewsList.likedMe.filter(user => user.userConnection.connectionUserId != act.payload),
        viewedMe  : state.recentViewsList.viewedMe.filter(userConnection => userConnection.connectionUserId != act.payload),
      };

      return {
        ...state,
        recentViewsList : newRecentViewsList,
        shortlist       : state.shortlist.filter(userConnection => userConnection.connectionUserId != act.payload),
        nearMeList      : state.shortlist.filter(userConnection => userConnection.connectionUserId != act.payload)
      }  

    case action.CONNECTION_GET_HISTORY:
      console.log("redux/connection/reducer.js:CONNECTION_GET_HISTORY");
      return {
        ...state,
        isHistoryLoading   : true
      }  

    case action.CONNECTION_GET_HISTORY_SUCCESS:
      console.log("redux/connection/reducer.js:CONNECTION_GET_HISTORY_SUCCESS");
      return {
        ...state,
        userConnection     : {
          ...state.userConnection,
          connectionHistory : act.payload
        },
        isHistoryLoading   : false
      }  

    case action.CONNECTION_GET_HISTORY_ERROR:
      console.log("redux/connection/reducer.js:CONNECTION_GET_HISTORY_ERROR");
      return {
        ...state,
        isHistoryLoading   : false
      }  

    case action.CONNECTION_SET_CALL_ACTIVITY:
      console.log("redux/connection/reducer.js:CONNECTION_SET_CALL_ACTIVITY");
      return {
        ...state,
        isPhoneCallActive  : act.payload.callType === 'phone' ? act.payload.isCallActive : state.isPhoneCallActive,
        isVideoCallActive  : act.payload.callType === 'video' ? act.payload.isCallActive : state.isVideoCallActive
      }

    case action.CONNECTION_CHAT_REQUEST_UPDATE: {
      console.log("redux/message/reducer.js:CONNECTION_CHAT_REQUEST_UPDATE");
      const { notifType, senderId } = act.payload;
      if (Object.keys(state.userConnection).length === 0) return;
      if (state.userConnection.connectionUserId != senderId) return;
      return {
        ...state,
        userConnection : {
          ...state.userConnection,
          message : notifType === MESSAGE_REQUEST_SENT ? STATUS_RECEIVED : STATUS_ACTIVE
        }
      }
    }

    case action.CONNECTION_PHONE_REQUEST_UPDATE: {
      console.log("redux/message/reducer.js:CONNECTION_PHONE_REQUEST_UPDATE");
      const { notifType, senderId } = act.payload;
      if (Object.keys(state.userConnection).length === 0) return;
      if (state.userConnection.connectionUserId != senderId) return;
      return {
        ...state,
        userConnection : {
          ...state.userConnection,
          phoneCall : notifType === PHONE_CALL_REQUEST_SENT ? STATUS_RECEIVED : STATUS_ACTIVE
        }
      }
    }

    case action.CONNECTION_VIDEO_REQUEST_UPDATE: {
      console.log("redux/message/reducer.js:CONNECTION_VIDEO_REQUEST_UPDATE");
      const { notifType, senderId } = act.payload;
      if (Object.keys(state.userConnection).length === 0) return;
      if (state.userConnection.connectionUserId != senderId) return;
      return {
        ...state,
        userConnection : {
          ...state.userConnection,
          videoCall : notifType === VIDEO_CALL_REQUEST_SENT ? STATUS_RECEIVED : STATUS_ACTIVE
        }
      }
    }

    case action.CONNECTION_DISABLED: {
      console.log("redux/message/reducer.js:CONNECTION_DISABLED");
      const { notifType, senderId } = act.payload;
      if (Object.keys(state.userConnection).length === 0) return;
      if (state.userConnection.connectionUserId != senderId) return;
      let newUserConnection = {
        ...state.userConnection
      }

      switch (notifType) {
        case VIDEO_CALL_DISABLED:
        newUserConnection.videoCall = STATUS_INACTIVE
          break;
        
        case PHONE_CALL_DISABLED:
        newUserConnection.videoCall = STATUS_INACTIVE
        newUserConnection.phoneCall = STATUS_INACTIVE
          break;

        case MESSAGE_DISABLED:
        newUserConnection.videoCall = STATUS_INACTIVE
        newUserConnection.phoneCall = STATUS_INACTIVE
        newUserConnection.message   = STATUS_INACTIVE
          break;
      
        default:
          break;
      }

      return {
        ...state,
        userConnection : {
          ...newUserConnection,
        }
      }
    }

    default:
      return state
  }
}
