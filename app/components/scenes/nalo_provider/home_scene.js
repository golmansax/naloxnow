import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import {
  MapView,
  View,
  Text,
  Button,
} from '../../base';
import { firebaseDB } from '../../../lib/firebase';
import { RequestStatus } from '../../../lib/constants';
import {
  provider, requestor, midpointLocation,
} from '../../../lib/data';
import { LocationMarkerView } from '../../misc/location_marker_view';
import { DirectionsPolyline } from '../../misc/directions_polyline';
import { vr } from '../../../styles/units';
import { nnRed } from '../../../styles/colors';

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

  request: {
    padding: vr(1),
  },

  button: {
    marginTop: vr(0.5),
  },

  urgentTitle: {
    color: nnRed,
  },
});

function acceptRequest() {
  firebaseDB().ref('request/status').set(RequestStatus.ACCEPTED);
}

function finishRequest() {
  firebaseDB().ref('request/status').set(RequestStatus.NOT_YET_REQUESTED);
}

export class NaloProviderHomeScene extends Component {
  static propTypes = {
    request: PropTypes.object.isRequired,
  };

  static defaultProps = {
    request: {},
  };

  componentWillMount() {
    this.listener = firebaseDB().ref('request/status').on('value', (snapshot) => {
      const newStatus = snapshot.val();
      if (newStatus !== this.props.request.status) {
        Actions.refresh({
          request: Object.assign({}, this.props.request, {
            status: newStatus,
          }),
        });
      }
    });
  }

  componentWillUnmount() {
    firebaseDB().ref('request').off('value', this.listener);
  }

  render() {
    const { request } = this.props;
    const { status } = request;
    const requested = (status === RequestStatus.REQUESTED);
    const accepted = (status === RequestStatus.ACCEPTED);
    const activeRequest = (requested || accepted);

    return (
      <View style={styles.container}>
        <View style={styles.title}><Text>Naloxone delivery mode</Text></View>
        <MapView
          style={styles.map}
          region={Object.assign({}, activeRequest ? midpointLocation : provider.location, {
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          })}
          >
          <MapView.Marker coordinate={provider.location}>
            <LocationMarkerView />
          </MapView.Marker>
          {activeRequest ? (
            <MapView.Marker coordinate={requestor.location} />
          ) : null}
          {activeRequest ? (
            <DirectionsPolyline />
          ) : null}
        </MapView>
        {activeRequest ? (
          <View style={styles.request}>
            <Text bold style={styles.urgentTitle}>URGENT: Naloxone request</Text>
            <Text>{requestor.title}</Text>
            <Text>{provider.time} min away</Text>
            {requested ? (
              <Button size='large' style={styles.button} onPress={acceptRequest} design='urgent'>
                Accept Request - Leave Now
              </Button>
            ) : null}
            {accepted ? (
              <Button style={styles.button} onPress={finishRequest}>
                Naloxone delivered
              </Button>
            ) : null}
          </View>
        ) : null}
      </View>
    );
  }
}
