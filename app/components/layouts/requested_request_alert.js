import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../base';
import { vr } from '../../styles/units';
import { nnRed, white } from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    paddingTop: vr(0.5),
    paddingBottom: vr(0.5),
    paddingRight: vr(1),
    paddingLeft: vr(1),
    backgroundColor: nnRed,
  },

  text: {
    color: white,
  },
});

export class RequestedRequestAlert extends Component {
  static propTypes = {
    style: View.propTypes.style,
  };

  setNativeProps(nativeProps) {
    this.rootRef.setNativeProps(nativeProps);
  }

  render() {
    const { style } = this.props;

    return (
      <View style={[styles.container, style]} ref={(ref) => (this.rootRef = ref)}>
        <Text style={styles.text}>
          Naloxone requested...
        </Text>
      </View>
    );
  }
}
