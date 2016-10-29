import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import {
  MapView,
  View,
  Button,
  Text,
} from '../../base';
import { LocationMarkerView } from '../../misc/location_marker_view';
import { midpointLocation, providerLocation, requestorLocation } from '../../../lib/data';
import { RequestStatus } from '../../../lib/constants';
import { firebaseDB } from '../../../lib/firebase';
import { SourceInfo } from './source_info';
import { white, superDarkGrey } from '../../../styles/colors';
import { vr, defaultBorderRadius } from '../../../styles/units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mapContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  source: {
    borderBottomWidth: 1,
    borderColor: white,
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

export class NaloRequestorRequestScene extends Component {
  static propTypes = {
    request: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.listener = firebaseDB().ref('request/status').on('value', (snapshot) => {
      const newStatus = snapshot.val();
      if (newStatus !== this.props.request.status) {
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
    const { source, status } = request;

    return (
      <View style={styles.container}>
        <SourceInfo source={source} style={styles.source} />
        <View style={styles.mapContainer}>
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
          {status === RequestStatus.REQUESTED ? (
            <View style={styles.requestedModal}>
              <Text>Requesting naloxone...</Text>
              <Button>Cancel</Button>
            </View>
          ) : (
            <Button
              design='urgent'
              style={styles.button}
              onPress={() => firebaseDB().ref('request/status').set(RequestStatus.REQUESTED)}
              >
              Request Naloxone Now
            </Button>
          )}
        </View>
      </View>
    );
  }
}
