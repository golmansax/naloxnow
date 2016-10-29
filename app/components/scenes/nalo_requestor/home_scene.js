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
import { vr } from '../../../styles/units';
import { white, superLightGrey } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    paddingTop: vr(.5),
    paddingBottom: vr(.5),
    paddingRight: vr(1),
    paddingLeft: vr(1),
  },

  map: {
    flex: 1,
  },

  listItem: {
    padding: vr(1),
    backgroundColor: superLightGrey,
    borderColor: white,
    borderBottomWidth: 1,
  },

  listItemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const NaloRequestorHomeScene = () => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>Nearest naloxone carriers</Text>
    </View>
    <View>
      {naloxoneSources.map((source) => (
        <TouchableHighlight
          key={source.id}
          style={styles.listItem}
          onPress={() => Actions.naloRequestorSourceScene({ source })}
          >
          <View style={styles.listItemContent}>
            <View>
              <Text>{source.title}</Text>
              <Text>{source.subtitle}</Text>
            </View>
            <View>
              <Text>{source.time} mins</Text>
            </View>
          </View>
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
