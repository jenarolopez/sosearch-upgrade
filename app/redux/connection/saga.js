import { all, put, takeEvery, select, takeLatest } from 'redux-saga/effects';

import moment             from 'moment';

import action             from './action';
import searchAction       from '../search/action';
import notificationAction from '../notification/action';

import { connectionRequest, multipleRequest, nearMeRequest, userRequest } from '../../request/request';
import { CHANNEL, DEFAULT_DISTANCE, HISTORY_FILTER_CHAT, HTTP_STATUS } from '../../constants/Constants';


/////////////////////////
// reqConnectionHistory()
/////////////////////////
function* reqConnectionHistory({ payload }) {
  try {
    console.log('reqConnectionHistory()');
    
    const { userId, connectionUserId } = payload;
    let connectionHistory   = [];
    const getTwilioClient   = state => state.Message.twilioClient;
    const twilioClient      = yield select(getTwilioClient);
    const uniqueName        = (userId > connectionUserId) ? `${CHANNEL + connectionUserId}_${userId}` : `${CHANNEL + userId}_${connectionUserId}`;

    try {
      const userConversation  = yield twilioClient?.getConversationByUniqueName(uniqueName);
      console.log('userConversation:', userConversation);
      const userMessages      = yield userConversation?.getMessages();

      if (userConversation) {
        userMessages.items.forEach(message => {
          console.log('message : ', message);
          const messageObj = {
            _id         : message.state.index,
            text        : message.state.body,
            createdAt   : message.state.timestamp,
            user        : {
                            _id  : parseInt(message.state.author),
                            // name : connectionUserName,
                          }
          };
  
          (messageObj.user._id != userId) &&
          connectionHistory.push({
            detail      : messageObj.text,
            historyType : HISTORY_FILTER_CHAT,
            time        : moment(moment(messageObj.createdAt).format('YYYY-MM-DD HH:mm')).unix()
          });
        });
      }
      
    } catch(error) {
      console.log('getting userConversation error:', error);
    }
    


    

    const resConnectionHistory = yield connectionRequest.getHistory({
      connection_user_id : connectionUserId
    }, userId)
    
    console.log('resConnectionHistory: ', resConnectionHistory);

    if (resConnectionHistory.data?.status?.code == HTTP_STATUS._200) {
      connectionHistory = [...connectionHistory, ...resConnectionHistory?.data?.history]
    }

    sortedConnectionHistory = connectionHistory.sort((a, b) => {
      return b.time - a.time;
    });

    yield put({
      type    : action.CONNECTION_GET_HISTORY_SUCCESS,
      payload : sortedConnectionHistory
    });
  } catch (error) {
    console.log('reqConnectionHistory() error: ', error);

    yield put({
      type    : action.CONNECTION_GET_HISTORY_ERROR,
      payload : []
    });
  }
}


/////////////////////////
// reqConnectionViewProfile()
/////////////////////////
function* reqConnectionViewProfile({ payload }) {
  console.log('reqConnectionViewProfile()');
  try {
    const { connectionUserId, profileViewId, userId } = payload;

    console.log('profileViewId : ', profileViewId);

    if (profileViewId) {
      const response = yield connectionRequest.markAsSeen({
        user_id         : userId,
        profile_view_id : profileViewId
      });
  
      console.log('response : ', response);

        if (response?.data?.code != HTTP_STATUS._200) {
          yield put({
            type    : action.CONNECTION_VIEW_PROFILE_ERROR,
            payload : profileViewId
          });
        }
    }

    const resViewUser = yield connectionRequest.viewUser({
      viewer_user_id : userId
    }, 
    connectionUserId
    );

    console.log(resViewUser);

    const getSearchList   = state => state.Search.searchList;
    const searchList      = yield select(getSearchList);
    
    searchList.map(search => {
      let searchedUser = search.users.find(userConnection => userConnection.user.userId == connectionUserId)
      
      if (searchedUser) {
        if (!searchedUser.isViewed) {
          search.users[search.users.indexOf(searchedUser)]['isViewed'] = true;
          return search;
        }
      } else {
        return search;
      }
    });

    yield put({
      type    : searchAction.SEARCH_UPDATE_SEARCH_LIST,
      payload : searchList
    });

    const unviewedCount = searchList.flatMap(search => search.users).filter(user => !user.isViewed).length
      
    yield put({
      type    : notificationAction.NOTIFICATION_SEARCH_UPDATE,
      payload : unviewedCount
    });

    const resGetMediaGallery = yield userRequest.getMediaGallery({
      user_id : connectionUserId
    });

    console.log(resGetMediaGallery);

      if (resGetMediaGallery?.data?.status?.code == HTTP_STATUS._200) {
        yield put({
          type    : action.CONNECTION_SET_MEDIA_GALLERY,
          payload : resGetMediaGallery.data.media
        });
      }
  } catch (error) {
    console.log('error : ', error);
  }
}

/////////////////////////
// reqConnectionGetShortlist()
/////////////////////////
function* reqConnectionGetShortlist() {
  
  try {
    console.log('reqConnectionGetShortlist()');

    const getUser = state => state.User;
    const User = yield select(getUser);

    const res = yield connectionRequest.getShortlist({
      user_id : User.user.userId
    });

    console.log('res : ', res);

    if (res.data?.status?.code == HTTP_STATUS._200) {
      yield put({
        type    : action.CONNECTION_GET_SHORTLIST_SUCCESS,
        payload : res.data.userConnection
      });

    } else {
      yield put({
        type    : action.CONNECTION_GET_SHORTLIST_ERROR,
        payload : []
      });
    }

  } catch (error) {
    console.log('error');
    console.log(error);

    yield put({
      type    : action.CONNECTION_GET_SHORTLIST_ERROR,
      payload : []
    });
  }
}

/////////////////////////
// reqConnectionGetNearMeList()
/////////////////////////
function* reqConnectionGetNearMeList({params}) {
  
  try {
    console.log('reqConnectionGetNearMeList()');
    
    const getUser = state => state.User;
    const User = yield select(getUser);
    const res = yield nearMeRequest.getNearMeHistory({
      user_id : User.user.userId,
      lat: User.userField.position.lastPosLat,
      lng: User.userField.position.lastPosLng,
      mdistance: DEFAULT_DISTANCE
    });

    console.log('resnearme : ', res);

    if (res.data?.status?.code == HTTP_STATUS._200) {
      yield put({
        type    : action.CONNECTION_GET_NEAR_ME_SUCCESS,
        payload : res.data.userNearMe
      });

    } else {
      yield put({
        type    : action.CONNECTION_GET_NEAR_ME_ERROR,
        payload : []
      });
    }

  } catch (error) {
    console.log('error');
    console.log(error);
    
    yield put({
      type    : action.CONNECTION_GET_NEAR_ME_ERROR,
      payload : []
    });
  }
}

/////////////////////////
// reqConnectionGetRecentViewsList()
/////////////////////////
function* reqConnectionGetRecentViewsList() {
  
  try {
    console.log('reqConnectionGetRecentViewsList()');

    const getUser = state => state.User;
    const User = yield select(getUser);

    const res = yield multipleRequest([
      yield connectionRequest.getWhoLikedMe({
        user_id : User.user.userId,
        page: 1
      }),
      yield connectionRequest.getWhoIViewed({
        user_id : User.user.userId,
        page: 1
      }),
      yield connectionRequest.getWhoViewedMe({
        user_id : User.user.userId,
        page: 1
      })
    ]);

    

    if (res[0].data?.status?.code == HTTP_STATUS._200 && res[1].data?.status?.code == HTTP_STATUS._200 && res[2].data?.status?.code == HTTP_STATUS._200) { 
      let unviewedViewedMeUsers = 0;
      const recentViewsList = {
        likedMe  : res[0]?.data?.status?.code == HTTP_STATUS._200 ? res[0]?.data?.users : [],
        iViewed  : res[1]?.data?.status?.code == HTTP_STATUS._200 ? res[1]?.data?.userConnection : [],
        viewedMe : res[2]?.data?.status?.code == HTTP_STATUS._200 ? res[2]?.data?.userConnection : []
      };

      yield put({
        type    : action.CONNECTION_GET_RECENT_VIEWS_SUCCESS,
        payload : recentViewsList
      });

      recentViewsList.viewedMe.forEach(user => {
        unviewedViewedMeUsers = !user.profileView.isSeen ? (unviewedViewedMeUsers + 1) : unviewedViewedMeUsers
      });

      yield put({
        type    : notificationAction.NOTIFICATION_RECENT_VIEWS_UPDATE,
        payload : unviewedViewedMeUsers
      });

    } else {
      yield put({
        type    : action.CONNECTION_GET_RECENT_VIEWS_ERROR,
        payload : []
      });
    }

  } catch (error) {
    console.log('error');
    console.log(error);
    
    yield put({
      type    : action.CONNECTION_GET_RECENT_VIEWS_ERROR,
      payload : []
    });
  }
}

export default function* rootSaga() {
  yield all([takeEvery(action.CONNECTION_VIEW_PROFILE,     reqConnectionViewProfile)]);
  yield all([takeEvery(action.CONNECTION_GET_HISTORY,      reqConnectionHistory)]);
  yield all([takeEvery(action.CONNECTION_GET_SHORTLIST,    reqConnectionGetShortlist)]);
  yield all([takeEvery(action.CONNECTION_GET_NEAR_ME,      reqConnectionGetNearMeList)]);
  yield all([takeLatest(action.CONNECTION_GET_RECENT_VIEWS, reqConnectionGetRecentViewsList)]);
}
