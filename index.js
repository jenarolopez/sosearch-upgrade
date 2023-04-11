/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import React from 'react';

import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga';
import Flatted from 'flatted';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import App from './app/containers/App';

import rootReducer from './app/redux/reducers'
import rootSaga from './app/redux/sagas';
import { name as appName } from './app.json';

const sagaMiddleware                 = createSagaMiddleware();
const middlewares                    = [ sagaMiddleware ];
const selectivelyPersistMessageReducer = createTransform(
  (inboundState, key) => {
    if (key === 'Message') {
      return Object.assign({}, inboundState, { twilioClient: null })
    } else {
      return inboundState;
    }
  }
);

const transformCircularObject = createTransform(
  (inboundState, key) => {
    if (key === 'Message') {
      return Flatted.stringify(inboundState)
    } else {
      return inboundState;
    }
  },
  (outboundState, key) => {
    if (key === 'Message') {
      return Flatted.parse(outboundState)
    } else {
      return outboundState;
    }
  }
)

const persistConfig = {
  key       : 'root',
  storage   : AsyncStorage,
  whitelist : ['User', 'Tutorial', 'Notification', 'Search', 'Connection', 'Calendar', 'Message', 'Lookup', 'app', 'Call'],
  transforms: [selectivelyPersistMessageReducer, transformCircularObject]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middlewares))
);

export const persistor = persistStore(
  store
);

sagaMiddleware.run(rootSaga);

const AppSOS = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      {/* <App /> */}
    </PersistGate>
  </Provider>
)

AppRegistry.registerComponent(appName, () => AppSOS)
