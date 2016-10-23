import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Components } from 'exponent';
import { white, red } from '../styles/colors';
import { naloxoneSources } from '../data';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: white,
  },

  map: {
    flex: 1,
    backgroundColor: red,
  },

  list: {
    flex: 1,
  },

  listItem: {
    height: 50,
  },
});

export class ResponderScene extends React.Component {
  state = {
    lat: null,
    lng: null,
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }), (error) => {
      alert(JSON.stringify(error));
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    });
  }

  render() {
    return (
      <View style={styles.content}>
        {this.state.lat === null || this.state.lng === null ? (
          <View style={styles.map} />
        ) : (
          <Components.MapView
            style={styles.map}
            region={{
              latitude: this.state.lat,
              longitude: this.state.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
          />
        )}
        <View style={styles.list}>
          {naloxoneSources.map((source) => (
            <View key={source.id} style={styles.listItem}>
              <Text>{source.title}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
