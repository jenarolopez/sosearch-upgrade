import { Platform } from 'react-native'


// temporary heroku endpoint
export default host = {
  LOCAL_API : (Platform.OS === 'ios' ? 'https://billing-api-app.herokuapp.com/v1/' : 'https://billing-api-app.herokuapp.com/v1/'),
  DEV_API   : 'https://tapi.sosearch.com/v1/',
  PROD_API  : 'http://api.sosearch.com/v1/'
}