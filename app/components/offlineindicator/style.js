import { Dimensions, I18nManager, Platform, StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../themes/';
import { NEXUSS_HEIGHT } from '../../constants/Constants';

const style = StyleSheet.create({
  offlineContainer : {
    alignItems        : 'center',
    backgroundColor   : Colors.RED,
    elevation         : 1,
    flexDirection     : 'row',
    height            : 30,
    justifyContent    : 'center',
    opacity           : .5,
    position          : 'absolute',
    top               : Metrics.HEIGHT <= NEXUSS_HEIGHT ? (Metrics.HEIGHT)* 0.13 : (Metrics.HEIGHT)* 0.03,
    width             : Metrics.WIDTH,
    zIndex            : 1,
  },
  
  fontColorWhite      : {
    color             : Colors.WHITE
  }

});

export default style;