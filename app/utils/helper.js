import moment                from 'moment';
import { Linking, Platform } from 'react-native';
import { Toast }             from 'native-base';
import RNHeicConverter       from 'react-native-heic-converter';

import { FORMAT_HEIC, TOAST_DURATION } from '../constants/Constants';
import { userRequest } from '../request/request';
const isIOS = Platform.OS === 'ios';


/////////////////////////////
// getAddress()
/////////////////////////////
export const getAddress = (address) => { 
  const { city, state, country } = address;

  const fullAddress = [];
  const zipCode     = (address.zipCode != null && address.zipCode !== '') ? address.zipCode : '';
  
  city 		!= null && city 		!== '' && fullAddress.push(city);
  state 	!= null && state 		!== '' && fullAddress.push(state);
  country != null && country 	!== '' && fullAddress.push(country);

  return fullAddress.length > 0 && `${fullAddress.join(', ')}`;
}

/////////////////////////////
// getStateCountry()
/////////////////////////////
export const getStateCountry = (address) => { 
  const { country, state } = address;
  let userAddress = '';

  if (state && (state != null || country != null)) {
    let address = [];

    state   != null && address.push(state);
    country != null && address.push(country);

    userAddress = address.join(', ');
  }

  return userAddress;
}

/////////////////////////////
// getDistance()
/////////////////////////////
export const getDistance = (distance) => {

  const meter = Math.round(distance);
  
  return (meter > 1) ? meter + " miles" : meter + " mile";
}

/////////////////////////////
// getTimeDiff()
/////////////////////////////
export const getTimeDiff = (unixTimestamp) => {
  let start = moment.unix(Date.now()/1000); //get unix timestamp in seconds
  let end   = moment.unix(unixTimestamp);
  var diff = Math.ceil(moment.duration(start.diff(end)).asDays());

  if (diff < 7) {
    return moment.unix(unixTimestamp).fromNow();
  } else {
    return moment.unix(unixTimestamp).format('MM/DD/YYYY');

  }
}

/////////////////////////////
// createRandomCharacters()
/////////////////////////////
export const createRandomCharacters = (length) => {

  let result             = '';
  const characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/////////////////////////////
// createPhotoAxiosRequest()
/////////////////////////////
export const createPhotoAxiosRequest = async (photo, userId) => {
  console.log('createPhotoAxiosRequest: ', photo);
  const image         = photo;
  const fileExtension = image.filename ? image.filename.split(".")[1] : '';
  const isHEIC        = fileExtension === FORMAT_HEIC;

  let uri = isHEIC ? image.path : image.localIdentifier;
  if (!image.localIdentifier) uri = image.path;
  console.log('first uri: ', uri);

  if (isIOS && !isHEIC && image.localIdentifier) {
    const regex         = /(.{36})\//i;
    const formattedUri  = uri.match(regex);

    console.log('formattedUri: ', formattedUri);

    uri = `assets-library://asset/asset.${fileExtension}?id=${formattedUri[1]}&ext=${fileExtension}`;
  }

  console.log('image: ', image);
  console.log('fileExtension: ', fileExtension);
  console.log('uri: ', uri);

  const data = new FormData();
  data.append("user_id", userId);
  data.append("image", {
    name  : createRandomCharacters(30),
    uri   : uri,
    type  : 'image/jpeg',
  });

  return userRequest.uploadPhoto(data);
};

/////////////////////////////
// newCreatePhotoAxiosRequest()
/////////////////////////////
export const newCreatePhotoAxiosRequest = async (imageUri, userId, isPrimary = false) => {
  console.log('newCreatePhotoAxiosRequest()');
  console.log('newCreatePhotoAxiosRequest: ', imageUri);

  const data = new FormData();

  if (isIOS) {
    const fileExtension = imageUri ? imageUri.split(".")[1] : '';
    console.log('fileExtension: ', fileExtension);
  
    const isHEIC  = fileExtension === FORMAT_HEIC;
  
    console.log('fileExtension: ', fileExtension);
    let imagePath = imageUri.slice(7);
    console.log('imagePath: ', imagePath);
  
    imageUri = imagePath;
  } 

  data.append("user_id", userId);
  data.append("is_primary", isPrimary);
  data.append("image", {
    name  : createRandomCharacters(30),
    uri   : imageUri,
    type  : 'image/jpeg',
  });

  return userRequest.uploadPhoto(data);
};

/////////////////////////////
// getFormattedDateTime()
/////////////////////////////
export const getFormattedDateTime = (paramDateTime, paramRawFormat, paramFormat) => {
  let dateTime = paramDateTime;

  if (paramRawFormat == 'unix') {
    dateTime = moment.unix(dateTime);
    
    moment
  }
  
  return moment(dateTime).format(paramFormat);
}

/////////////////////////////
// formatDateTime()
/////////////////////////////
export const formatDateTime = (unix) => {

  return moment.unix(unix).calendar(null, {
    sameDay : '[Today at] h:mm A',
    lastDay : 'dddd MMMM D, YYYY [at] h:mm A',
    lastWeek : 'dddd MMMM D, YYYY [at] h:mm A',
    sameElse : 'MMMM D, YYYY [at] h:mm A'
  });
}

////////////////////////////
// formatMobileNumber()
////////////////////////////
export const formatMobileNumber = (mobileNumber) => {
  console.log('formatMobileNumber()');
  console.log('mobileNumber : ', mobileNumber);

  const rawMobileNumber = mobileNumber.replace(/[^\d]/g,"");
  let formattedNumber   = '';
  const hypenIndex      = {
                            3 : '-',
                            6 : '-'
                          };

  for (x=0; x<rawMobileNumber.length; x++) {
    formattedNumber += (hypenIndex[x] || '') + rawMobileNumber[x];
  }
  
  return formattedNumber;
}

////////////////////////////
// getCountryCodes()
////////////////////////////
export const getCountryCodes = () => {

  const countryCodes = [
    {
      value : 'US',
      label : 'US +1'
    }, 
    {
      value : 'PH',
      label : 'PH +63'
    }
  ]

  return countryCodes;
}

////////////////////////////
// getInvitationLocation()
////////////////////////////
export const getInvitationLocation = (eventPlace, street, city, state, zipCode) => {
  let eventVenue = [];

  eventPlace != null && eventPlace != '' && eventVenue.push(eventPlace);
  street 		 != null && street 		 != '' && eventVenue.push(street);
  city 			 != null && city 			 != '' &&	eventVenue.push(city);
  state 		 != null && state 		 != '' && eventVenue.push(state);
  zipCode 	 != null && zipCode 	 != '' && eventVenue.push(zipCode);

  return eventVenue.join(', ')
}

////////////////////////////
// isArrayEquals()
////////////////////////////
export const isArrayEquals = (a, b) => {

  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

////////////////////////////
// isObjectEmpty()
////////////////////////////
export const isObjectEmpty = (object) => {
  // checks object values
  // returns false if all values are null, undefined or empty array
  // return original object if one property has value

  let temp = Object.values(object).map(val => {

    if (val) {
      if (Array.isArray(val)) {
        return (val.length !== 0) ? val : null
      } else {
        return val
      }
//      return val;

    } else {
      return null
    }

  })

  let isObjectEmpty = Object.values(temp).every(el => el === undefined || el === null)

  return (isObjectEmpty) ? null : object

}

////////////////////////////
// getAge()
////////////////////////////
export const getAge = (dateString) => {
  const today     = new Date();
  const birthDate = new Date(dateString);
  let age         = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

////////////////////////////
// openAppSettings()
////////////////////////////
export const openAppSettings = () => {
  Linking.openURL('app-settings:');
};

/////////////////////////////
// convertHEICtoJPEG()
/////////////////////////////
export const convertHEICtoJPEG = async (path) => {
  const response = await RNHeicConverter.convert({
    path
  });

  return response.path;
}
/////////////////////////////
// formatNumber()
/////////////////////////////
export const formatNumber = (number) =>{
  return number.toLocaleString('en-US', {maximumFractionDigits:0});
  //return 1000 to 1,000
}


/////////////////////////////
// handleHttpError()
/////////////////////////////
export const handleHttpError = (error, request) =>{
  console.log('handleHttpError()');
  console.log(`${request} error: ${error}`);
  Toast.show({
    text      : 'Sorry, an error occurred. Please try again later.',
    type      : 'danger',
    duration  : TOAST_DURATION
  });
}

