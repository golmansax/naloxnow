import React, { PropTypes, Component } from 'react';
import { StyleSheet } from 'react-native';
import APSLButton from 'apsl-react-native-button';
import { View, Text } from './index';
import { mainFontStyle } from '../../styles/fonts';
import { nnRed, white, superLightGrey, superDarkGrey } from '../../styles/colors';
import { vr, defaultFontSize, defaultBorderRadius } from '../../styles/units';

const styles = StyleSheet.create({
  button: {
    marginBottom: null,
    height: null,
    borderRadius: defaultBorderRadius,
    padding: vr(0.75),
  },

  text: {
    ...mainFontStyle,
    fontSize: defaultFontSize,
      color: superDarkGrey,
  },

  plainButton: {
    backgroundColor: superLightGrey,
  },

  urgentButton: {
    borderWidth: 0,
    backgroundColor: nnRed,
  },

  urgentButtonText: {
    color: white,
  },
});

export class Button extends Component {
  static propTypes = {
    design: PropTypes.oneOf(['plain', 'urgent']).isRequired,
    style: View.propTypes.style,
    textStyle: Text.propTypes.style,
  };

  static defaultProps = {
    design: 'plain',
  };

  setNativeProps(nativeProps) {
    this.rootRef.setNativeProps(nativeProps);
  }

  render() {
    const { textStyle, style, design, ...props } = this.props;
    return (
      <APSLButton
        style={[styles.button, styles[`${design}Button`], style]}
        ref={(component) => (this.rootRef = component)}
        textStyle={[styles.text, styles[`${design}ButtonText`], textStyle]}
        {...props}
      />
    );
  }
}
