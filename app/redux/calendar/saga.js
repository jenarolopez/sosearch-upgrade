import { all, put, takeEvery, select } from 'redux-saga/effects';

import action              from './action';
import notificationAction  from '../notification/action';
import { calendarRequest } from '../../request/request';
import { HTTP_STATUS }     from '../../constants/Constants';

/////////////////////////
// reqCalendarGetEvents()
/////////////////////////
function* reqCalendarGetEvents({ payload }) {
  const { connection_user_id, date_start, date_end } = payload;
  const getCalendar = state => state.Calendar;
  const Calendar    = yield select(getCalendar);
  
  try {
    console.log('reqCalendarGetEvents()');

    const getUser   = state => state.User;
    const User      = yield select(getUser);
    
    const res = yield calendarRequest.getCalendarEvents({
      connection_user_id  : connection_user_id,
      date_start          : date_start,
      date_end            : date_end
    }, User.user.userId)

    console.log('reqCalendarGetEvents response : ', res);

    if (res?.data?.status?.code == HTTP_STATUS._200) {
      let unseenCalendarEventCount = 0;
      const dateNow = new Date()

      res?.data?.events?.map((item) => {
        const { userId, isSeen } = item?.eventReceiver;
        const meetupDate = new Date(item?.meetup.dateStart * 1000);
          if ((userId === User.user.userId) && (!Boolean(isSeen)) && (meetupDate < dateNow)) {
            unseenCalendarEventCount = unseenCalendarEventCount + 1
          }
      });
      
      yield put({
        type    : notificationAction.NOTIFICATION_CALENDAR_UPDATE,
        payload : unseenCalendarEventCount
      });

      yield put({
        type    : action.CALENDAR_GET_EVENTS_SUCCESS,
        payload : res?.data?.events
      });
    } else {
      if (Calendar.eventList.length == 0) {
        yield put({
          type    : action.CALENDAR_GET_EVENTS_ERROR,
          payload : []
        });
      }
    }
  } catch (error) {
    if (Calendar.eventList.length == 0) {
      yield put({
        type    : action.CALENDAR_GET_EVENTS_ERROR,
        payload : []
      });
    }
  }
}

export default function* rootSaga() {
  yield all([takeEvery(action.CALENDAR_GET_EVENTS,  reqCalendarGetEvents)]);
}
