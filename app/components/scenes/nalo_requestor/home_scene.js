import React, { Component, PropTypes } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  MapView, Text, View, TouchableHighlight, Button,
} from '../../base';
import { RequestStatus } from '../../../lib/constants';
import { firebaseDB } from '../../../lib/firebase';
import { deliveryProviders, provider, requestor } from '../../../lib/data';
import { sendDefaultPushNotificationAsync } from '../../../lib/push_notifications';
import { LocationMarkerView } from '../../misc/location_marker_view';
import { vr, pressedOpacity, defaultBorderRadius } from '../../../styles/units';
import { white, lightGrey, superDarkGrey } from '../../../styles/colors';

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

export class NaloRequestorHomeScene extends Component {
  static propTypes = {
    request: PropTypes.object.isRequired,
  };

  static defaultProps = {
    request: {
      status: RequestStatus.NOT_YET_REQUESTED,
    },
  };

  componentDidMount() {
    this.listener = firebaseDB().ref('request/status').on('value', (snapshot) => {
      const newStatus = snapshot.val();
      if (newStatus === RequestStatus.ACCEPTED) {
        Alert.alert(
          'Naloxone request accepted',
          `Naloxone is on its way, and will be delieverd in ${provider.time} minutes`,
          [
            { text: 'OK', onPress: () => Actions.naloRequestorAcceptedRequestScene() }
          ]
        );
      } else if (newStatus !== this.props.request.status) {
        const request = Object.assign({}, this.props.request, {
          status: newStatus,
        });
        Actions.refresh({ request });
      }
    });
  }

  componentWillUnmount() {
    firebaseDB().ref('request/status').off('value', this.listener);
  }

  render() {
    const { request } = this.props;
    const { status } = request;

    return (
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
          {status === RequestStatus.NOT_YET_REQUESTED ? (
            <Button
              design='urgent'
              style={styles.button}
              onPress={() => {
                firebaseDB().ref('request/status').set(RequestStatus.REQUESTED);
                sendDefaultPushNotificationAsync();
              }}
              >
              Request Naloxone Now
            </Button>
          ) : (
            <View style={styles.requestedModal}>
              <Text>Requesting naloxone...</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
