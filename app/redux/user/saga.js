import { all, put, takeEvery } from 'redux-saga/effects';
import { userRequest } from '../../request/request'
import action from './action';

/////////////////////////
// reqUserGetDetails()
/////////////////////////
function* reqUserGetDetails({ payload }) {

  try {
    console.log('reqUserGetDetails()', payload);

    const res = yield userRequest.getDetail({
      user_id : payload.userId
    });    

    console.log('reqUserGetDetails response: ', res);
  
    if (res) {
      yield put({
        type    : action.USER_FIELD_UPDATE,
        payload : res.data.userDetail.userField
      });
      yield put({
        type    : action.USER_SUBSCRIPTION_UPDATE,
        payload : res.data.userDetail.userSubscription
      });
      yield put({
        type    : action.USER_SETTING_UPDATE,
        payload : res.data.userDetail.userSetting
      });
    } else {
      yield put({
        type    : action.USER_FIELD_GET_ERROR,
        payload : -1
      });
    }
  } catch (error) {
    console.log('reqUserGetDetails error() ', error);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(action.USER_SIGNIN,      reqUserGetDetails)]);
}
