import { all, put, takeLatest, select } from 'redux-saga/effects';

import action         from './action';

import { callRequest } from '../../request/request';
import { HTTP_STATUS } from '../../constants/Constants';
import { handleHttpError } from '../../utils/helper';


/////////////////////////
// reqGetCallLogs()
/////////////////////////
function* reqGetCallLogs({payload}) {

  try {
    console.log('reqGetCallLogs()');

    const getUser = state => state.User;
    const getCall = state => state.Call;

    const User = yield select(getUser);
    const Call = yield select(getCall);

    const page  = (Call.isCallLogsLoaded && !payload.refreshing) ? Call.callPage.currentPage + 1 : 1 

    const newPayload = {
      userId: User.user.userId,
      params: {
        page,
        offset: 12
      }
    }
    const callResponse = yield callRequest.getCallLogs(newPayload).catch(error => {
      handleHttpError(error, 'redux/call/saga::callRequest.getCallLogs')
    });

    if (callResponse) {
      if (callResponse?.data?.status?.code >= HTTP_STATUS._200) {
        yield put({
          type: action.CALL_GET_SUCCESS,
          payload: {
            data: callResponse.data,
          },
        });
      } else {
        yield put({
          type: action.CALL_GET_ERROR,
          payload: [],
        });
      }
    }



  }catch (error) {
    console.log('reqGetCallLogs error: ', error);
    yield put({
      type    : action.CALL_GET_ERROR,
      payload : []
    });
  }
}


export default function* rootSaga() {
  yield all([takeLatest(action.CALL_GET,  reqGetCallLogs)]);
}
