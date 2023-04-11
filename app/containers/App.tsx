import React, { Component }   from 'react';
import { StatusBar }          from 'react-native';
// import { createAppContainer } from 'react-navigation';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { NativeBaseProvider } from 'native-base';
import { connect }            from 'react-redux';
import VersionNumber          from 'react-native-version-number';

// import AppNavigation          from '../navigation/index';
import OfflineIndicator       from '../components/offlineindicator';
import { store }              from '../..';
import { Colors }             from '../themes';

import appAction              from '../redux/app/action';

const { updateVersionNumber } = appAction;

// const Navigation = createAppContainer(AppNavigation);

const App = (props:any) => {

  const [isConnected, setIsConnected] = React.useState(true) as any

  React.useEffect(()=>{
    const { userSettings, appVersion, isLoggedIn, updateVersionNumber } = props;
    // temporary filter/remove "no rating" from lookup rating
    store.dispatch({ type: 'LOOKUP_FILTER_FIELDS' });

    // temporary add userSettings object in redux
    if (isLoggedIn) {
      if (!userSettings) {
        store.dispatch({ type: 'ADD_USER_SETTINGS_OBJECT' });
      }
    }

    //TODO save to redux and compare version number here
    if (appVersion != VersionNumber.appVersion) {
      // console.log('VersionNumber.appVersion       : ', VersionNumber.appVersion);
      // console.log('VersionNumber.buildVersion     : ', VersionNumber.buildVersion);
      // console.log('VersionNumber.bundleIdentifier : ', VersionNumber.bundleIdentifier);
    }
    
    NetInfo.addEventListener(handleConnectivityChange);
    
    return () => {
      
    }


    
  },[])

  ////////////////////////////
  // componentDidMount()
  ////////////////////////////
  // componentDidMount() {
  //   console.log('App.js componentDidMount()');
    
  //   const { userSettings, appVersion, isLoggedIn, updateVersionNumber } = this.props;

  //   // temporary filter/remove "no rating" from lookup rating
  //   store.dispatch({ type: 'LOOKUP_FILTER_FIELDS' });

  //   // temporary add userSettings object in redux
  //   if (isLoggedIn) {
  //     if (!userSettings) {
  //       store.dispatch({ type: 'ADD_USER_SETTINGS_OBJECT' });
  //     }
  //   }

  //   //TODO save to redux and compare version number here
  //   if (appVersion != VersionNumber.appVersion) {
  //     // console.log('VersionNumber.appVersion       : ', VersionNumber.appVersion);
  //     // console.log('VersionNumber.buildVersion     : ', VersionNumber.buildVersion);
  //     // console.log('VersionNumber.bundleIdentifier : ', VersionNumber.bundleIdentifier);
  //   }
    
  //   NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  // }

  ////////////////////////////
  // componentWillUnmount()
  ////////////////////////////
// 	componentWillUnmount() {
//     console.log('componentWillUnmount()');

//     NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
//  }

  ////////////////////////////
  // handleConnectivityChange()
  ////////////////////////////  
  const handleConnectivityChange = (state: NetInfoState) => {
    console.log(state)
    setIsConnected(state.isConnected)
  };

  ////////////////////////////
  // render()
  ////////////////////////////
 
  return (
    <NativeBaseProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.TRANSPARENT} translucent />
      {
        !isConnected && <OfflineIndicator/>
      }
      {/* <Navigation screenProps={{...this.props, isConnected }} /> */}
    </NativeBaseProvider>
  );
  
}

////////////////////////////
// mapStateToProps()
////////////////////////////
function mapStateToProps(state:any) {
  console.log('App.js:mapStateToProps()');
  console.log('state : ', state);
  return { 
    nav               : state?.nav,
    user              : state?.User?.user,
    userConnection    : state?.Connection?.userConnection,
    appVersion        : state?.app?.appVersion,
    userSettings      : state?.User?.userSettings,
    isLoggedIn        : state?.User?.isLoggedIn
  }
};

export default connect(mapStateToProps, { updateVersionNumber })(App);
