import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import {
  MapView, View, Button, Text,
} from '../../base';
import { LocationMarkerView } from '../../misc/location_marker_view';
import {
  midpointLocation, provider, requestor,
} from '../../../lib/data';
import { RequestStatus } from '../../../lib/constants';
import { firebaseDB } from '../../../lib/firebase';
import { ProviderInfo } from './provider_info';
import { white, superDarkGrey } from '../../../styles/colors';
import { vr, defaultBorderRadius } from '../../../styles/units';
import { sendPushNotificationAsync } from '../../../lib/push_notifications';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mapContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  provider: {
    borderBottomWidth: 1,
    borderColor: white,
  },

  button: {
    margin: vr(0.5),
  },

  requestedModal: {
    flex: 1,
    marginTop: vr(2),
    marginBottom: vr(2),
    marginLeft: vr(1),
    marginRight: vr(1),
    padding: vr(1),
    backgroundColor: white,
    borderRadius: defaultBorderRadius,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: superDarkGrey,
    shadowOpacity: 0.8,
    shadowRadius: defaultBorderRadius,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
});

export const NaloRequestorAcceptedRequestScene = () => (
  <View style={styles.container}>
    <ProviderInfo provider={provider} style={styles.provider} />
    <View style={styles.mapContainer}>
      <MapView
        ref={(ref) => (this.mapRef = ref)}
        style={styles.map}
        initialRegion={Object.assign({}, midpointLocation, {
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        })}
        >
        <MapView.Marker identifier='requestor' coordinate={requestor.location}>
          <LocationMarkerView />
        </MapView.Marker>
        <MapView.Marker identifier='provider' coordinate={provider.location} />
      </MapView>
    </View>
  </View>
);
