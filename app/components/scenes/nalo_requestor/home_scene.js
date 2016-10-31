import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  MapView,
  Text,
  View,
  TouchableHighlight,
} from '../../base';
import { RequestStatus } from '../../../lib/constants';
import { firebaseDB } from '../../../lib/firebase';
import { deliveryProviders, requestor } from '../../../lib/data';
import { LocationMarkerView } from '../../misc/location_marker_view';
import { vr, pressedOpacity } from '../../../styles/units';
import { white, lightGrey } from '../../../styles/colors';

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

/*
          <TouchableHighlight
            key={source.id}
            style={styles.listItem}
            onPress={() => {
              const request = {
                source,
                status: RequestStatus.NOT_YET_REQUESTED,
              };

              firebaseDB().ref('request').set(request).then(() => {
                Actions.naloRequestorRequestScene({ request });
              });
            }}
            underlayColor={lightGrey}
            activeOpacity={pressedOpacity}
            >
            <ProviderInfo source={source} />
          </TouchableHighlight>
          */

export const NaloRequestorHomeScene = () => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>
        {deliveryProviders.length} naloxone delivery providers nearby
      </Text>
    </View>
    <MapView
      style={styles.map}
      region={Object.assign({}, requestor.location, {
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      })}
      >
      <MapView.Marker coordinate={requestor.location}>
        <LocationMarkerView />
      </MapView.Marker>
      {deliveryProviders.map((provider) => (
        <MapView.Marker key={provider.id} coordinate={provider.location} />
      ))}
    </MapView>
  </View>
);
