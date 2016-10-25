import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getPushTokenAsync } from '../../lib/push_notifications';
import { getSignedInUserAsync } from '../../lib/auth';
import { setGlobalState } from '../../lib/global_state';
import { View, Button } from '../base';

const styles = StyleSheet.create({
  content: {
    top: 60,
  },
});

async function requestLocationAsync() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    });
  });
}

async function storeLoggedInUserAsync() {
  return getSignedInUserAsync().then((user) => setGlobalState('user', user));
}

async function storePushTokenAsync() {
  return getPushTokenAsync().then((token) => setGlobalState('pushToken', token));
}

function chooseProvider() {
  Promise
    .all([
      requestLocationAsync(),
      storeLoggedInUserAsync(),
      storePushTokenAsync(),
    ])
    .then(() => Actions.naloProviderHomeScene())
}

function chooseResponder() {
  Promise
    .all([
      requestLocationAsync(),
      storeLoggedInUserAsync(),
    ])
    .then(() => Actions.naloResponderHomeScene())
}

export const ChooseRoleScene = () => (
  <View style={styles.content}>
    <Button onPress={chooseResponder}>Be a responder</Button>
    <Button onPress={chooseProvider}>Be a provider</Button>
  </View>
);
