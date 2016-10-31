import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import { Location } from 'exponent';
import { getPushTokenAsync } from '../../lib/push_notifications';
import { getSignedInUserAsync } from '../../lib/auth';
import { setGlobalState } from '../../lib/global_state';
import { firebaseDB } from '../../lib/firebase';
import { RequestStatus } from '../../lib/constants';
import { View, Button } from '../base';
import { vr } from '../../styles/units';

const styles = StyleSheet.create({
  button: {
    margin: vr(0.5),
    marginBottom: 0,
  },
});

async function requestLocationAsync() {
  return Promise.resolve();
  // return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
}

async function storeLoggedInUserAsync() {
  return getSignedInUserAsync().then((user) => setGlobalState('user', user));
}

async function storePushTokenAsync() {
  return getPushTokenAsync().then((token) => setGlobalState('pushToken', token));
}

async function setRequestStatus(status) {
  return firebaseDB().ref('request/status').set(status);
}

function chooseProvider() {
  Promise
    .all([
      requestLocationAsync(),
      storeLoggedInUserAsync(),
      storePushTokenAsync(),
    ])
    .then(() => Actions.naloProvider());
}

function chooseRequestor() {
  Promise
    .all([
      requestLocationAsync(),
      storeLoggedInUserAsync()
        .then(() => setRequestStatus(RequestStatus.NOT_YET_REQUESTED)),
    ])
    .then(() => Actions.naloRequestor());
}

export const ChooseRoleScene = () => (
  <View>
    <Button style={styles.button} onPress={chooseRequestor}>Be a requestor</Button>
    <Button style={styles.button} onPress={chooseProvider}>Be a provider</Button>
  </View>
);
