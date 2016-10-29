import React, { PropTypes, Component } from 'react';
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
    borderRadius: 4,
    padding: vr(0.75),
  },

  urgentButton: {
    borderWidth: 0,
    backgroundColor: nnRed,
  },

  urgentButtonText: {
    color: white,
  },

  text: {
    ...mainFontStyle,
    fontSize: defaultFontSize,
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
