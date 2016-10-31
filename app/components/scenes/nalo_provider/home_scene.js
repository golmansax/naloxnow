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
  provider, requestor, naloxoneRequestor, midpointLocation,
} from '../../../lib/data';
import { LocationMarkerView } from '../../misc/location_marker_view';
import { vr } from '../../../styles/units';

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
});

export class NaloProviderHomeScene extends Component {
  static propTypes = {
    request: PropTypes.object.isRequired,
  };

  static defaultProps = {
    request: {},
  };

  componentWillMount() {
    this.listener = firebaseDB().ref('request').on('value', (snapshot) => {
      const newRequest = snapshot.val();
      if (newRequest.status !== this.props.request.status) {
        Actions.refresh({ request: newRequest });
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

    return (
      <View style={styles.container}>
        <View style={styles.title}><Text>Naloxone delivery mode</Text></View>
        <MapView
          style={styles.map}
          region={Object.assign({}, requested ? midpointLocation : provider.location, {
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          })}
          >
          <MapView.Marker coordinate={provider.location}>
            <LocationMarkerView />
          </MapView.Marker>
          {requested ? (
            <MapView.Marker coordinate={requestor.location} />
          ) : null}
        </MapView>
        {requested ? (
          <View style={styles.request}>
            <Text>{naloxoneRequestor.title}</Text>
            <Button style={styles.button} onPress={this.acceptRequest} design='urgent'>
              Deliver naloxone now
            </Button>
          </View>
        ) : null}
      </View>
    );
  }

  acceptRequest = () => {
    firebaseDB().ref('request/status').set(RequestStatus.ACCEPTED);
    Actions.naloProviderAcceptedRequestScene();
  };
}
