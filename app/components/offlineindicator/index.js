import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import style from './style';
import TextMaxScale from '../../components/textmaxscale/index';


class OfflineIndicator extends PureComponent {

  /////////////////////////////
	// render()
	/////////////////////////////
  render() {
    return(
      <View style={style.offlineContainer}>
        <TextMaxScale style={style.fontColorWhite}>No Internet Connection</TextMaxScale>
      </View>
    )
  }
}

export default OfflineIndicator;
