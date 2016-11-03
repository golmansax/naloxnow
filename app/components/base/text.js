import React, { Component } from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import { mainFontStyle, boldFontStyle, titleFontStyle } from '../../styles/fonts';
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

  title: {
    ...titleFontStyle,
  },
});

export class Text extends Component {
  static propTypes = {
    bold: React.PropTypes.bool.isRequired,
    style: RNText.propTypes.style,
    title: React.PropTypes.bool.isRequired,
  };

  static defaultProps = {
    bold: false,
    title: false,
  };

  setNativeProps(nativeProps) {
    this.rootRef.setNativeProps(nativeProps);
  }

  render() {
    const { style, bold, title, ...props } = this.props;
    return (
      <RNText
        ref={(component) => (this.rootRef = component)}
        style={[
          styles.text,
          bold ? styles.bold : null,
          title ? styles.title : null,
          style,
        ]}
        {...props}
      />
    );
  }
}
