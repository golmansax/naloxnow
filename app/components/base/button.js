import React, { Component } from 'react';
import APSLButton from 'apsl-react-native-button';
import { Text } from './text';
import { mainFontStyle } from '../../styles/fonts';

export class Button extends Component {
  static propTypes = {
    textStyle: Text.propTypes.style,
  };

  setNativeProps(nativeProps) {
    this.rootRef.setNativeProps(nativeProps);
  }

  render() {
    const { textStyle, ...props } = this.props;
    return (
      <APSLButton
        ref={(component) => (this.rootRef = component)}
        textStyle={[mainFontStyle, textStyle]}
        {...props}
      />
    );
  }
}
