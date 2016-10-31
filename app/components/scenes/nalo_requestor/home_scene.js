import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  MapView, Text, View, TouchableHighlight, Button,
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
    borderColor: white,
    borderBottomWidth: 1,
  },

  mapContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  button: {
    margin: vr(0.5),
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
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={Object.assign({}, requestor.location, {
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        })}
        >
        <MapView.Marker coordinate={requestor.location}>
          <LocationMarkerView />
        </MapView.Marker>
        {deliveryProviders.map((provider) => (
          <MapView.Marker key={provider.id} coordinate={provider.location} />
        ))}
      </MapView>
      <Button
        design='urgent'
        style={styles.button}
        onPress={() => {
          /*
          firebaseDB().ref('request/status').set(RequestStatus.REQUESTED);
          sendPushNotificationAsync([
            `URGENT: ${requestor.title} needs naloxone immediately,`,
            `is located ${provider.time} minutes away`,
          ].join(' '));
          */
        }}
        >
        Request Naloxone Now
      </Button>
    </View>
  </View>
);
