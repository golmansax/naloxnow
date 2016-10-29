import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import {
  MapView,
  Text,
  View,
  Button,
} from '../../base';
import { LocationMarkerView } from '../../misc/location_marker_view';
import { midpointLocation, providerLocation, requestorLocation } from '../../../lib/data';
import { RequestStatus } from '../../../lib/constants';
import { firebaseDB } from '../../../lib/firebase';
import { SourceInfo } from './source_info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
});

export const NaloRequestorSourceScene = ({ source }) => (
  <View style={styles.container}>
    <SourceInfo source={source} />
    <MapView
      ref={(ref) => (this.mapRef = ref)}
      style={styles.map}
      initialRegion={Object.assign({}, midpointLocation, {
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })}
      >
      <MapView.Marker identifier='requestor' coordinate={requestorLocation}>
        <LocationMarkerView />
      </MapView.Marker>
      <MapView.Marker identifier='provider' coordinate={providerLocation} />
    </MapView>
    <Button
      onPress={() => {
        const request = {
          source,
          status: RequestStatus.REQUESTED,
        };

        firebaseDB.ref('request').set(request).then(() => {
          Actions.naloRequestorRequestScene({ request });
        });
      }}
      >
      Request Naloxone
    </Button>
  </View>
);

NaloRequestorSourceScene.propTypes = {
  source: PropTypes.object.isRequired,
};
