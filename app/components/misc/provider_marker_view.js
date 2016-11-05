import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { View, Image } from '../base';
import { locationPulseRed } from '../../styles/colors';
import { getImage } from '../../lib/images';

const height = 20;
const styles = StyleSheet.create({
  image: {
    height,
    width: Math.round((height / 165) * 200),
  },

  circle: {
    backgroundColor: locationPulseRed,
    opacity: 0.5,
    top: -0.5 * height,
    left: -0.5 * height,
    position: 'absolute',
    width: height * 2,
    height: height * 2,
    borderRadius: height,
  },
});

function getProviderRotation(provider) {
  if (provider.location.rotation) {
    return provider.location.rotation;
  }

  return '0deg';
}

export const ProviderMarkerView = ({ provider }) => (
  <View style={{ transform: [{ rotate: getProviderRotation(provider) }] }}>
    <View style={styles.circle} />
    <Image
      source={getImage('odrLogo')}
      style={styles.image}
    />
  </View>
);

ProviderMarkerView.propTypes = {
  provider: PropTypes.object.isRequired,
};
