import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, TouchableHighlight, Image } from '../base';
import { vr, pressedOpacity } from '../../styles/units';
import { superLightGrey, nnRed, white, lightGrey } from '../../styles/colors';
import { RequestStatus } from '../../lib/constants';
import { firebaseDB } from '../../lib/firebase';
import { getImage } from '../../lib/images';

const styles = StyleSheet.create({
  content: {
    paddingTop: vr(0.5),
    paddingBottom: vr(0.5),
    paddingRight: vr(1),
    paddingLeft: vr(1),
    flexDirection: 'row',
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
    backgroundColor: white,
  },

  timeText: {
    color: nnRed,
  },

  cancelButton: {
    backgroundColor: superLightGrey,
  },

  portrait: {
    height: vr(2),
    width: vr(2),
    borderRadius: vr(1),
  },

  company: {
    position: 'absolute',
    top: vr(1),
    left: vr(1.5),
  },

  portraitContainer: {
    paddingRight: vr(1.5),
    marginRight: vr(1),
  },
});

export class AcceptedRequestAlert extends Component {
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
      <View style={[styles.container, style]} ref={(ref) => (this.rootRef = ref)}>
        <View style={[styles.content, styles.info]}>
          <View style={styles.portraitContainer}>
            <Image style={[styles.portrait, styles.company]} source={getImage('uber')} />
            <Image style={[styles.portrait, styles.person]} source={getImage('holman')} />
          </View>
          <View>
            <Text style={styles.infoText} bold>Naloxone is on its way</Text>
            <Text style={styles.infoText}>{provider.title}</Text>
            <Text style={styles.infoText}>{provider.subtitle}</Text>
          </View>
        </View>
        <View style={[styles.status]}>
          <View style={styles.time}>
            <Text style={styles.content}>
              Will arrive in:{' '}
              <Text bold style={styles.timeText}>{provider.time} mins</Text>
            </Text>
          </View>
          <TouchableHighlight
            style={styles.cancelButton}
            onPress={() => firebaseDB().ref('request/status').set(RequestStatus.NOT_YET_REQUESTED)}
            activeOpacity={pressedOpacity}
            underlayColor={lightGrey}
            >
            <Text style={styles.content}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
