import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
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
    flexDirection: 'row',
  },

  text: {
    flex: 1,
    color: white,
    marginLeft: vr(1),
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
        <ActivityIndicator
          animating
          size='large'
          color='white'
        />
        <Text bold style={styles.text}>
          Requesting naloxone delivery from nearby providers...
        </Text>
      </View>
    );
  }
}
