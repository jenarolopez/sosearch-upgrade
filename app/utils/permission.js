import { PermissionsAndroid, Platform } from 'react-native';
import { Toast }		from 'native-base';
import { TOAST_DURATION } from '../constants/Constants';

/////////////////////////////
// getCameraPermission()
/////////////////////////////
export const getCameraPermission = async () => {
  console.log('getCameraPermission()');

  if (Platform.OS === 'ios') return true;

  const permission    = PermissionsAndroid.PERMISSIONS.CAMERA;
  const hasPermission = await PermissionsAndroid.check(permission);

  if (hasPermission) return true;

  const status = await PermissionsAndroid.request(permission, {
    title: 'Microphone Permission',
    message: 'App needs access to your camera ' + 'so you can see other users.',
  });

  if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    Toast.show({
      text      : 'Camera permission denied by user..',
      duration  : TOAST_DURATION,
      type      : 'danger'
    });
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    Toast.show({
      text      : 'Camera permission revoked by user.',
      duration  : TOAST_DURATION,
      type      : 'danger'
    });
  }

  return false;
}

/////////////////////////////
// getLocationPermission()
/////////////////////////////
export const getLocationPermission = async () => {
  console.log('getLocationPermission()');

  if (Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)) {
    return true;
  }
  
  const permission    = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
  const hasPermission = await PermissionsAndroid.check(permission);

  if (hasPermission) return true;

  const status = await PermissionsAndroid.request(permission, {
    title: 'Location Permission',
    message: 'App needs access to your location to see users near you.',
  });

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    Toast.show({
      text      : 'Location granted by user.',
      duration  : TOAST_DURATION,
      type      : 'success'
    });
    return true;
  }
  if (status === PermissionsAndroid.RESULTS.DENIED) {
    Toast.show({
      text      : 'Location permission denied by user.',
      duration  : TOAST_DURATION,
      type      : 'danger'
    });
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    Toast.show({
      text      : 'Location permission revoked by user.',
      duration  : TOAST_DURATION,
      type      : 'danger'
    });
  }

  return false;
}

/////////////////////////////
// getMicrophonePermission()
/////////////////////////////
export const getMicrophonePermission = async () => {
  console.log('getMicrophonePermission()');

  if (Platform.OS === 'ios') return true;

  const permission    = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
  const hasPermission = await PermissionsAndroid.check(permission);

  if (hasPermission) return true;

  const status = await PermissionsAndroid.request(permission, {
    title: 'Microphone Permission',
    message: 'App needs access to your microphone ' + 'so you can talk with other users.',
  });

  if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    Toast.show({
      text      : 'Microphone permission denied by user.',
      duration  : TOAST_DURATION,
      type      : 'danger'
    });
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    Toast.show({
      text      : 'Microphone permission revoked by user.',
      duration  : TOAST_DURATION,
      type      : 'danger'
    });
  }

  return false;
}