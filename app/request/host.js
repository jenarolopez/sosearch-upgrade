import { Platform } from 'react-native'

export default host = {
  LOCAL_API : (Platform.OS === 'ios' ? 'http://localhost:9000/v1/' : 'http://10.0.2.2:9000/v1/'),
  DEV_API   : 'https://tapi.sosearch.com/v1/',
  PROD_API  : 'http://api.sosearch.com/v1/'
}