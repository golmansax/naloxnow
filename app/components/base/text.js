import React, { Component } from 'react';
import { Text as RNText } from 'react-native';
import { mainFontStyle } from '../../styles/fonts';

export class Text extends Component {
  static propTypes = {
    style: RNText.propTypes.style,
  };

  setNativeProps(nativeProps) {
    this.rootRef.setNativeProps(nativeProps);
  }

  render() {
    const { style, ...props } = this.props;
    return (
      <RNText
        ref={(component) => (this.rootRef = component)}
        style={[mainFontStyle, style]}
        {...props}
      />
    );
  }
}
