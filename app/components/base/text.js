import React, { Component } from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import { mainFontStyle, boldFontStyle } from '../../styles/fonts';
import { defaultFontSize } from '../../styles/units';
import { superDarkGrey } from '../../styles/colors';

const styles = StyleSheet.create({
  text: {
    ...mainFontStyle,
    fontSize: defaultFontSize,
    color: superDarkGrey,
    lineHeight: 21,
  },

  bold: {
    ...boldFontStyle,
  },
});

export class Text extends Component {
  static propTypes = {
    bold: React.PropTypes.bool.isRequired,
    style: RNText.propTypes.style,
  };

  static defaultProps = {
    bold: false,
  };

  setNativeProps(nativeProps) {
    this.rootRef.setNativeProps(nativeProps);
  }

  render() {
    const { style, bold, ...props } = this.props;
    return (
      <RNText
        ref={(component) => (this.rootRef = component)}
        style={[styles.text, style, bold ? styles.bold : null]}
        {...props}
      />
    );
  }
}
