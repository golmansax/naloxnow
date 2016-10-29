import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import APSLButton from 'apsl-react-native-button';
import { View, Text } from './index';
import { mainFontStyle } from '../../styles/fonts';
import { nnRed, white } from '../../styles/colors';
import { vr, defaultFontSize } from '../../styles/units';

const styles = StyleSheet.create({
  button: {
    marginBottom: null,
    height: null,
    borderWidth: 0,
    borderRadius: 4,
    padding: vr(0.75),
    backgroundColor: nnRed,
  },

  text: {
    ...mainFontStyle,
    color: white,
    fontSize: defaultFontSize,
  },
});

export class Button extends Component {
  static propTypes = {
    style: View.propTypes.style,
    textStyle: Text.propTypes.style,
  };

  setNativeProps(nativeProps) {
    this.rootRef.setNativeProps(nativeProps);
  }

  render() {
    const { textStyle, style, ...props } = this.props;
    return (
      <APSLButton
        style={[styles.button, style]}
        ref={(component) => (this.rootRef = component)}
        textStyle={[styles.text, textStyle]}
        {...props}
      />
    );
  }
}
