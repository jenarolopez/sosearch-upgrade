import { all, put, takeEvery, select, takeLatest } from 'redux-saga/effects';

import action         from './action';
import actionCalendar from '../calendar/action';
import actionMessage  from '../message/action';

import { calendarRequest, notificationRequest } from '../../request/request';
import { UPD_MODE_CALENDAR_IS_SEEN, HTTP_STATUS } from '../../constants/Constants';
import { handleHttpError } from '../../utils/helper';

/////////////////////////
// reqNotificationUnseenCount()
/////////////////////////
function* reqNotificationUnseenCount({payload}) {
  try {
    const userId = payload;
    console.log('reqNotificationUnseenCount()');

    const unseenNotifCountRequest = yield notificationRequest.getUnseenNotification(userId).catch(error=>{
      handleHttpError(error, 'redux/notification/saga::notificationRequest.getUnseenNotification')
    });
    console.log('unseenNotifCountRequest: ', unseenNotifCountRequest);

    if (unseenNotifCountRequest?.data?.status?.code == HTTP_STATUS._200) {
      yield put({
        type    : action.NOTIFICATION_UPDATE,
        payload : unseenNotifCountRequest?.data?.notificationCount?.count
      });
    }
  }catch(err){
    console.log('reqNotificationUnseenCount err: ', err);
  }
}




/////////////////////////
// reqNotificationGet()
/////////////////////////
function* reqNotificationGet({payload}) {

  try {
    console.log('reqNotificationGet()');
    const getUser = state => state.User;
    const getNotification = state => state.Notification;
    const User = yield select(getUser);
    const Notification = yield select(getNotification);
    const page  = Notification.isNotificationLoaded && !payload.refreshing ? Notification.notificationPage.currentPage + 1 : 1 
    const response = yield notificationRequest.get(User.user.userId, page).catch(error => {
      handleHttpError(error, 'redux/notification/saga::notificationRequest.get')
    });

    console.log('response reqNotificationGet : ', response);
    let notificationCount = 0
    try{
      const notificationCountResponse = yield notificationRequest.getUnseenNotification(User.user.userId)
      console.log('notificationCountResponse response: ', notificationCountResponse);
      const { data: {notificationCount : { count } } } = notificationCountResponse
      notificationCount = count
    }catch(error){
      handleHttpError(error, 'redux/notification/saga::notificationRequest.getUnseenNotification')
    }

    if (response) {

      if (response?.data?.status?.code >= HTTP_STATUS._200) {

        yield put({
            type    : action.NOTIFICATION_GET_SUCCESS,
            payload :{ 
              data: response.data,
              notificationCount
            }
        })
      } else {
          yield put({
            type    : action.NOTIFICATION_GET_ERROR,
            payload : [],
          });
        }
    } 
  }catch (error) {
    console.log('reqNotificationGet error: ', error);
    yield put({
      type    : action.NOTIFICATION_GET_ERROR,
      payload : []
    });
  }
}

/////////////////////////
// reqNotificationSeen()
/////////////////////////
function* reqNotificationSeen({ payload }) {
  const notifId = payload;

  try {
    console.log('reqNotificationSeen()');
    console.log('notifId : ', notifId);

    const getUser = state => state.User;
    const User = yield select(getUser);

    const response = yield notificationRequest.seenNotification({
      user_id  : User.user.userId,
      notif_id : notifId
    })
    console.log('notificationRequest.seenNotification response: ', response);

    try {
      if(response?.data?.status?.code != HTTP_STATUS._200){
        let { status } = response?.data;
				throw new Error(`${status?.code} ${status?.description}`);
      }
      yield put({
        type    : action.NOTIFICATION_SEEN_SUCCESS,
        payload : response.data.notification
      });
    } catch (error) {
      handleHttpError(error, 'redux/notification/saga::notificationRequest.seenNotification')
    }

  } catch (error) {
    console.log('error: ', error);
  }
}

/////////////////////////
// reqCalendarSeenEvent()
/////////////////////////
function* reqCalendarSeenEvent({ payload }) {
  console.log('reqCalendarSeenEvent()');
  
  const { calendarId, participantInfo } = payload;

  try {
    console.log('calendarId      : ', calendarId);
    console.log('participantInfo : ', participantInfo);

    const res = yield calendarRequest.updateCalendarEvent({
      calendar_id   : calendarId,
      user_id 			: participantInfo.userId,
      upd_mode			: UPD_MODE_CALENDAR_IS_SEEN,
      update_value	: '1',
    });

    console.log('calendarRequest.updateCalendarEvent response: ', res);
    
    if (res?.data?.status?.code != HTTP_STATUS._200) {
      let { status } = res?.data;
      throw new Error(`${status?.code} ${status?.description}`);
    } 

    yield put({
      type    : actionCalendar.CALENDAR_UPDATE_RECEIVER,
      payload : {
        eventReceiverCalendar : res.data.calendar,
        participantInfo
      }
    });  
    yield put({
      type    : action.NOTIFICATION_CALENDAR_SEEN_SUCCESS
    });  
    
  } catch (error) {
    console.log('reqCalendarSeenEvent calendarRequest.updateCalendarEvent: ', error);
  }
}

/////////////////////////
// reqChatSeen()
/////////////////////////
function* reqChatSeen({ payload }) {
  console.log('reqChatSeen()');
  
  const { conversationName } = payload;

  try {
    console.log('conversationName : ', conversationName);
    
    yield put({
      type    : actionMessage.CONVERSATION_SEEN_UPDATE,
      payload : conversationName
    });  
    yield put({
      type    : action.NOTIFICATION_CHAT_SEEN_SUCCESS
    });  
  } catch (error) {
    console.log('error: ', error);
  }
}

/////////////////////////
// reqMarkAllRead()
/////////////////////////
function* reqMarkAllRead({ payload }) {
  console.log('reqMarkAllRead()');
  
  const { userId } = payload;

  try {
    console.log('userId : ', userId);

    const res = yield notificationRequest.markAllNotificationRead({user_id : userId})
      .catch(error => handleHttpError(error, 'redux/notification/saga::notificationRequest.markAllNotificationRead'));

    console.log('notificationRequest.markAllNotificationRead response: ', res);

    try {
      if(res?.data?.status?.code != HTTP_STATUS._200){
        let { status } = res?.data;
				throw new Error(`${status?.code} ${status?.description}`);
      }
      yield put({
        type    : action.NOTIFICATION_MARK_ALL_SUCCESS
      });
    } catch (error) {
      yield put({
        type    : action.NOTIFICATION_GET_ERROR,
        payload : []
      });
      handleHttpError(error, 'redux/notification/saga::notificationRequest.markAllNotificationRead')
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(action.NOTIFICATION_UNSEEN_COUNT,  reqNotificationUnseenCount)]);
  yield all([takeLatest(action.NOTIFICATION_GET,           reqNotificationGet)]);
  yield all([takeEvery(action.NOTIFICATION_SEEN,           reqNotificationSeen)]);
  yield all([takeEvery(action.NOTIFICATION_CALENDAR_SEEN,  reqCalendarSeenEvent)]);
  yield all([takeEvery(action.NOTIFICATION_CHAT_SEEN,      reqChatSeen)]);
  yield all([takeEvery(action.NOTIFICATION_MARK_ALL_READ,  reqMarkAllRead)]);
}
