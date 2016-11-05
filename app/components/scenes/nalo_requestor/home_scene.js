import React, { Component, PropTypes } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  MapView, Text, View, Button,
} from '../../base';
import { RequestStatus } from '../../../lib/constants';
import { firebaseDB } from '../../../lib/firebase';
import { deliveryProviders, provider, requestor } from '../../../lib/data';
import { sendDefaultPushNotificationAsync } from '../../../lib/push_notifications';
import { LocationMarkerView } from '../../misc/location_marker_view';
import { ProviderMarkerView } from '../../misc/provider_marker_view';
import { vr, defaultBorderRadius } from '../../../styles/units';
import { nnRed, white, superDarkGrey } from '../../../styles/colors';
import { RequestAlertLayout } from '../../layouts/request_alert_layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  requestingText: {
    color: nnRed,
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
    margin: vr(1),
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
    justifyContent: 'center',
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
          `Naloxone is on its way, and will be delivered in ${provider.time} minutes`,
          [{ text: 'OK', onPress: () => Actions.naloRequestorAcceptedRequestScene() }]
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
      <RequestAlertLayout style={styles.container}>
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
            {deliveryProviders.map((deliveryProvider) => (
              <MapView.Marker key={deliveryProvider.id} coordinate={deliveryProvider.location}>
                <ProviderMarkerView provider={deliveryProvider} />
              </MapView.Marker>
            ))}
          </MapView>
          {status === RequestStatus.NOT_YET_REQUESTED ? (
            <Button
              size='large'
              design='urgent'
              style={styles.button}
              onPress={() => {
                firebaseDB().ref('request/status').set(RequestStatus.REQUESTED);
                sendDefaultPushNotificationAsync()
                  .catch((err) => console.log(err)); // eslint-disable-line no-console
              }}
              >
              Request Naloxone Now
            </Button>
          ) : (
            <View style={styles.requestedModal}>
              <Text style={styles.requestingText} size='large' title>
                Requesting naloxone...
              </Text>
            </View>
          )}
        </View>
      </RequestAlertLayout>
    );
  }
}
