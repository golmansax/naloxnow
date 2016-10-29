import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  MapView,
  Text,
  View,
  TouchableHighlight,
} from '../../base';
import { naloxoneSources, requestorLocation } from '../../../lib/data';
import { LocationMarkerView } from '../../misc/location_marker_view';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  list: {
    flex: 1,
  },

  listItem: {
    height: 50,
  },
});

export const NaloRequestorHomeScene = () => (
  <View>
    <View><Text>Nearest naloxone carriers</Text></View>
    <View style={styles.list}>
      {naloxoneSources.map((source) => (
        <TouchableHighlight
          key={source.id}
          style={styles.listItem}
          onPress={() => Actions.naloRequestorSourceScene({ source })}
          >
          <Text>{source.title}</Text>
        </TouchableHighlight>
      ))}
    </View>
    <MapView
      style={styles.map}
      region={Object.assign({}, requestorLocation, {
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })}
      >
      <MapView.Marker coordinate={requestorLocation}>
        <LocationMarkerView />
      </MapView.Marker>
    </MapView>
  </View>
);
