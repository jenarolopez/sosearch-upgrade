import { all }          from 'redux-saga/effects';
import calendarSaga     from './calendar/saga';
import connectionSaga   from './connection/saga';
import lookupSaga       from './lookup/saga';
import messageSaga      from './message/saga';
import notificationSaga from './notification/saga';
import callSaga         from './call/saga';
import searchSaga       from './search/saga';
import userSaga         from './user/saga';

export default function* rootSaga(getState) {
  yield all([
    calendarSaga(),
    connectionSaga(),
    lookupSaga(),
    messageSaga(),
    notificationSaga(),
    callSaga(),
    searchSaga(),
    userSaga()
  ]);
}
