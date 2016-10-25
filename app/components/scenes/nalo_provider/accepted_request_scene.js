import React from 'react';
import { StyleSheet } from 'react-native';
import { View, MapView } from '../../base';
import { responderLocation, providerLocation } from '../../../lib/data';
import { LocationMarkerView } from '../../misc/location_marker_view';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: 60,
  },

  map: {
    flex: 1,
  },
});

export const NaloProviderAcceptedRequestScene = () => (
  <View style={styles.content}>
    <MapView
      style={styles.map}
      region={Object.assign({}, providerLocation, {
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })}
      >
      <MapView.Marker coordinate={providerLocation}>
        <LocationMarkerView />
      </MapView.Marker>
      <MapView.Marker coordinate={responderLocation} />
    </MapView>
  </View>
);
