import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  MapView,
  Text,
  View,
  TouchableHighlight,
} from '../../components';
import { white } from '../../styles/colors';
import { naloxoneSources } from '../../data';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: 60,
    backgroundColor: white,
  },

  map: {
    flex: 1,
  },

  list: {
    flex: 1,
  },

  listItem: {
    height: 50,
  },
});

export class NaloResponderSourceListScene extends Component {
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
          <MapView
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
            <TouchableHighlight
              key={source.id}
              style={styles.listItem}
              onPress={() => Actions.naloResponderSourceInfoScene({ source })}
              >
              <Text>{source.title}</Text>
            </TouchableHighlight>
          ))}
        </View>
      </View>
    );
  }
}