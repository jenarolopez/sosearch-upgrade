import { combineReducers } from 'redux';

import action       from './action';
import Calendar     from './calendar/reducer';
import Connection   from './connection/reducer';
import Lookup       from './lookup/reducer';
import Message      from './message/reducer';
import Notification from './notification/reducer';
import Call         from './call/reducer';
import Search       from './search/reducer';
import Tutorial     from './tutorial/reducer';
import User         from './user/reducer';
import app          from './app/reducer';

const appReducers = combineReducers({
  Calendar,
  Connection,
  Lookup,
  Message,
  Notification,
  Call,
  Search,
  Tutorial,
  User,
  app
});

export default rootReducer = (state, act) => {

  switch (act.type) {

    case action.SIGN_OUT:
      console.log("redux/reducers.js:RESET_APP");

      const { Lookup, Tutorial } = state;
      
      state = { Lookup, Tutorial };

      return appReducers(state, act);
  
    default:
      return appReducers(state, act);
  }
}