import React, { Component } from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import { mainFontStyle } from '../../styles/fonts';
import { defaultFontSize } from '../../styles/units';
import { superDarkGrey } from '../../styles/colors';

const styles = StyleSheet.create({
  text: {
    ...mainFontStyle,
    fontSize: defaultFontSize,
    color: superDarkGrey,
    lineHeight: 21,
  },
});

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
        style={[styles.text, style]}
        {...props}
      />
    );
  }
}
