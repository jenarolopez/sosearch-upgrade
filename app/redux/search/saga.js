import { all, takeEvery, put, call, select } from 'redux-saga/effects';

import action             from './action';
import connectionAction   from '../connection/action';
import notificationAction from '../notification/action';
import { searchRequest }  from '../../request/request';
import { handleHttpError } from '../../utils/helper';

import { 
  // LOOK_UP_INCOME_LEVEL,
  // UPD_MODE_SEARCH_INCOME_LEVEL,
  MY_IDEAL,
  HTTP_STATUS
}   from '../../constants/Constants';


/////////////////////////
// reqSearchGetMyIdeal()
/////////////////////////
function* reqSearchGetMyIdeal() {
  try {
    console.log('reqSearchGetMyIdeal()');

    const getUserId = state => state.User.user.userId
    const userId = yield select(getUserId)
    const response = yield searchRequest.getSearches({
      user_id: userId
    });
    console.log('searchRequest.getSearches response : ', response);

    if (response) {
      const searches  = response.data.searches;
      const search    = searches.find(search => search.searchName.toUpperCase() === MY_IDEAL);
      const unviewedCount = response.data.searches.flatMap(search => search.users).filter(user => !user.isViewed).length
      
      yield put({
        type    : notificationAction.NOTIFICATION_SEARCH_UPDATE,
        payload : unviewedCount
      });
      
      yield put({
        type    : action.SEARCH_GET_MY_IDEAL_SUCCESS,
        payload : {
          search  : search,
          searches: searches
        }
      });
    }
  } catch (error) {
    console.log('error : ', error);

    yield put({
      type    : action.SEARCH_GET_MY_IDEAL_ERROR
    });
  }
}


/////////////////////////
// reqSearchGetAll()
/////////////////////////
function* reqSearchGetAll() {  
  try {
    console.log('reqSearchGetAll()');

    const getUserId = state => state.User.user.userId
    const userId = yield select(getUserId);

    const response = yield searchRequest.getSearches({
      user_id: userId
    });
    console.log('searchRequest.getSearches response : ', response);

    if (response) {
      const unviewedCount = response.data.searches.flatMap(search => search.users).filter(user => !user.isViewed).length;
      
      yield put({
        type    : notificationAction.NOTIFICATION_SEARCH_UPDATE,
        payload : unviewedCount
      });
      
      yield put({
        type    : action.SEARCH_GET_ALL_SUCCESS,
        payload : response.data.searches
      });
    }
  } catch (error) {
    console.log('searchRequest.getSearches error : ', error);

    yield put({
      type    : action.SEARCH_GET_ALL_ERROR,
      payload : []
    });
  }
}


/////////////////////////
// reqSearchAdd()
/////////////////////////
function* reqSearchAdd({ payload }) {
  try {
    console.log('reqSearchAdd()');

    const response = yield searchRequest.addSearch(payload);
    console.log('addSearch response : ', response);
 
      if (response?.data?.status?.code != HTTP_STATUS._200) {
        let { status } = response?.data;
        throw new Error(`${status?.code} ${status?.description}`);
      } 
      
      yield put({
        type    : action.SEARCH_ADD_SUCCESS,
        payload : response.data.search
      });

      const getSearchCount = state => state.Notification.badgeCount.search
      const searchCount = yield select(getSearchCount);
      const unviewedCount = searchCount + response.data.search.users.filter(user => !user.isViewed).length;
    
      yield put({
        type    : notificationAction.NOTIFICATION_SEARCH_UPDATE,
        payload : unviewedCount
      });
   
  } catch (error) {
    yield put({
      type    : action.SEARCH_ADD_ERROR
    });
    handleHttpError(error, 'redux/search/saga::searchRequest.reqSearchAdd()')
  }
}


/////////////////////////
// reqSearchUpdateCriteria()
/////////////////////////
function* reqSearchUpdateCriteria({ payload }) {
  const { searchId, criteriaType, code } = payload;
  try {
    console.log('reqSearchUpdateCriteria()');
    console.log('searchId     : '+ searchId);
    console.log('criteriaType : '+ criteriaType);
    console.log('code         : '+ code);

    const getUser = state => state.User
    const User = yield select(getUser)

    const response = 
      //(criteriaType 
      // == LOOK_UP_INCOME_LEVEL
      // ) 
      //? 
      // yield searchRequest.updateSearch({
      //   user_id       : User.user.userId,
      //   income_level  : code,
      //   upd_mode      : UPD_MODE_SEARCH_INCOME_LEVEL
      // },
      //   searchId
      // ) 
      // : 
      yield searchRequest.addSearchCriteria({
        user_id : User.user.userId,
        code    : code
      },
        searchId,
        criteriaType
      );
    console.log('reqSearchUpdateCriteria response : ', response);

    if (response?.data?.status?.code != HTTP_STATUS._200) {
      let { status } = response?.data;
      throw new Error(`${status?.code} ${status?.description}`);
    } 

    yield put({
      type    : action.SEARCH_UPDATE,
      payload : response.data.search
    });

  } catch (error) { handleHttpError(error, 'redux/search/saga::searchRequest.addSearchCriteria()') }
}


/////////////////////////
// reqSearchDelete()
/////////////////////////
function* reqSearchDelete({ payload }) {
  try {
    console.log('reqSearchDelete()');
    console.log('searchId : '+ payload);

    const getUser = state => state.User
    const User = yield select(getUser)

    const response = yield searchRequest.deleteSearch({ who_updated : User.user.userId }, payload);
    console.log('deleteSearch response : ', response);

    if (response?.data?.code != HTTP_STATUS._200) {
      yield put({ type : action.SEARCH_DELETE_ERROR });
      let { status } = response?.data;
      throw new Error(`${status?.code} ${status?.description}`);
    } 

    yield put({
      type    : action.SEARCH_DELETE_SUCCESS,
      payload : payload
    });
    
  } catch (error) {
    yield put({ type : action.SEARCH_DELETE_ERROR });
    handleHttpError(error, 'redux/search/saga::searchRequest.deleteSearch()');
  }
}


export default function* rootSaga() {
  yield all([takeEvery(action.SEARCH_GET_MY_IDEAL, reqSearchGetMyIdeal)]);
  yield all([takeEvery(action.SEARCH_GET_ALL, reqSearchGetAll)]);
  yield all([takeEvery(action.SEARCH_ADD, reqSearchAdd)]);
  yield all([takeEvery(action.SEARCH_UPDATE_CRITERIA, reqSearchUpdateCriteria)]);
  yield all([takeEvery(action.SEARCH_DELETE, reqSearchDelete)]);
}
