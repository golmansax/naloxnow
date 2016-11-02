import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, TouchableHighlight } from '../../base';
import { vr } from '../../../styles/units';
import { superLightGrey, nnRed, white } from '../../../styles/colors';

const styles = StyleSheet.create({
  content: {
    paddingTop: vr(0.5),
    paddingBottom: vr(0.5),
    paddingRight: vr(1),
    paddingLeft: vr(1),
  },

  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  info: {
    backgroundColor: nnRed,
  },

  infoText: {
    color: white,
  },

  time: {
    flex: 1,
  },

  timeText: {
    color: nnRed,
  },

  cancelButton: {
    backgroundColor: superLightGrey,
  },
});

export class ProviderInfo extends Component {
  static propTypes = {
    provider: PropTypes.object.isRequired,
    style: View.propTypes.style,
  };

  setNativeProps(nativeProps) {
    this.rootRef.setNativeProps(nativeProps);
  }

  render() {
    const { provider, style } = this.props;

    return (
      <View style={style} ref={(ref) => (this.rootRef = ref)}>
        <View style={[styles.content, styles.info]}>
          <Text style={styles.infoText}>Naloxone is on its way</Text>
          <Text style={styles.infoText}>{provider.title}</Text>
        </View>
        <View style={[styles.status]}>
          <View style={styles.time}>
            <Text style={styles.content}>
              Will arrive in:{' '}
              <Text bold style={styles.timeText}>{provider.time} mins</Text>
            </Text>
          </View>
          <TouchableHighlight style={styles.cancelButton}>
            <Text style={styles.content}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
