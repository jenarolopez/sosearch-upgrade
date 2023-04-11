import React, { PureComponent } from 'react';
import { MAX_FONT_SIZE } from '../../../constants/Constants';
import {Text} from 'native-base';


class NBTextMaxScale extends PureComponent {

  render() {
    return (
        <Text maxFontSizeMultiplier={MAX_FONT_SIZE} style={this.props.style}>
          {this.props.children}
        </Text>
    );

  }
}

export default NBTextMaxScale;