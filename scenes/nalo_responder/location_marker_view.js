import React from 'react';
import { StyleSheet } from 'react-native';
import Pulse from 'react-native-pulse';
import {
  View,
  Image,
} from '../../components';
import locationIcon from './location_icon.png';

export const LocationMarkerView = () => (
  <View>
    <Pulse color='#bacae2' numPulses={1} top={-35} diameter={100} speed={100} />
    <Image source={locationIcon} />
  </View>
);
