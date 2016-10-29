import React, { Component, PropTypes } from 'react';
import { Text, View } from '../../base';
import { StyleSheet } from 'react-native';
import { vr } from '../../../styles/units';
import { superLightGrey } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    padding: vr(1),
    backgroundColor: superLightGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export class SourceInfo extends Component {
  static propTypes = {
    source: PropTypes.object.isRequired,
  };

  setNativeProps(nativeProps) {
    this.rootRef.setNativeProps(nativeProps);
  }

  render() {
    const { source } = this.props;

    return (
      <View style={styles.container} ref={(ref) => (this.rootRef = ref)}>
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
