import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../base';
import { vr } from '../../../styles/units';
import { superLightGrey } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    paddingTop: vr(0.5),
    paddingBottom: vr(0.5),
    paddingRight: vr(1),
    paddingLeft: vr(1),
    backgroundColor: superLightGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export class SourceInfo extends Component {
  static propTypes = {
    source: PropTypes.object.isRequired,
    style: View.propTypes.style,
  };

  setNativeProps(nativeProps) {
    this.rootRef.setNativeProps(nativeProps);
  }

  render() {
    const { source, style } = this.props;

    return (
      <View style={[styles.container, style]} ref={(ref) => (this.rootRef = ref)}>
        <View>
          <Text>{source.title}</Text>
          <Text>{source.subtitle}</Text>
        </View>
        <View>
          <Text>{source.time} mins</Text>
        </View>
      </View>
    );
  }
}
