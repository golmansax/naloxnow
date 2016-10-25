import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  MapView,
  Text,
  View,
  TouchableHighlight,
} from '../../base';
import { white } from '../../../styles/colors';
import { naloxoneSources, responderLocation } from '../../../lib/data';
import { LocationMarkerView } from '../../misc/location_marker_view';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: 60,
    backgroundColor: white,
  },

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

export const NaloResponderHomeScene = () => (
  <View style={styles.content}>
    <MapView
      style={styles.map}
      region={Object.assign({}, responderLocation, {
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })}
      >
      <MapView.Marker coordinate={responderLocation}>
        <LocationMarkerView />
      </MapView.Marker>
    </MapView>
    <View style={styles.list}>
      {naloxoneSources.map((source) => (
        <TouchableHighlight
          key={source.id}
          style={styles.listItem}
          onPress={() => Actions.naloResponderSourceScene({ source })}
          >
          <Text>{source.title}</Text>
        </TouchableHighlight>
      ))}
    </View>
  </View>
);
