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
import { vr, pressedOpacity } from '../../../styles/units';
import { white, lightGrey } from '../../../styles/colors';
import { SourceInfo } from './source_info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    paddingTop: vr(0.25),
    paddingBottom: vr(0.25),
    paddingRight: vr(1),
    paddingLeft: vr(1),
  },

  map: {
    flex: 1,
  },

  listItem: {
    borderColor: white,
    borderBottomWidth: 1,
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
          underlayColor={lightGrey}
          activeOpacity={pressedOpacity}
          >
          <SourceInfo source={source} />
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
