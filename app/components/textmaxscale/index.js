import React, { PureComponent } from 'react';
import { Text} from 'react-native';
import { MAX_FONT_SIZE } from '../../constants/Constants';

class TextMaxScale extends PureComponent {

  render() {
    return (
        <Text maxFontSizeMultiplier={MAX_FONT_SIZE} style={this.props.style} onPress={this.props.onPress} 
        numberOfLines={this.props.numberOfLines} ellipsizeMode={this.props.ellipsizeMode} uppercase={this.props.uppercase}>
          {this.props.children}
        </Text>
    );

  }
}

export default TextMaxScale;
