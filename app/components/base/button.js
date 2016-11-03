import React, { PropTypes, Component } from 'react';
import { StyleSheet } from 'react-native';
import APSLButton from 'apsl-react-native-button';
import { View, Text } from './index';
import { nnRed, white, superLightGrey, superDarkGrey } from '../../styles/colors';
import { vr, defaultFontSize, largeFontSize, defaultBorderRadius } from '../../styles/units';
import { mainFontStyle } from '../../styles/fonts';

const styles = StyleSheet.create({
  button: {
    marginBottom: null,
    height: null,
    borderRadius: defaultBorderRadius,
    padding: vr(0.75),
  },

  text: {
    ...mainFontStyle,
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

  defaultButtonText: {
    fontSize: defaultFontSize,
  },

  largeButtonText: {
    fontSize: largeFontSize,
  },
});

export class Button extends Component {
  static propTypes = {
    design: PropTypes.oneOf(['plain', 'urgent']).isRequired,
    size: PropTypes.oneOf(['default', 'large']).isRequired,
    style: View.propTypes.style,
    textStyle: Text.propTypes.style,
  };

  static defaultProps = {
    design: 'plain',
    size: 'default',
  };

  setNativeProps(nativeProps) {
    this.rootRef.setNativeProps(nativeProps);
  }

  render() {
    const { textStyle, style, size, design, ...props } = this.props;
    return (
      <APSLButton
        style={[styles.button, styles[`${design}Button`], style]}
        ref={(component) => (this.rootRef = component)}
        textStyle={[
          styles.text,
          styles[`${design}ButtonText`],
          styles[`${size}ButtonText`],
          textStyle,
        ]}
        {...props}
      />
    );
  }
}
