import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Location } from 'exponent';
import { getPushTokenAsync } from '../../lib/push_notifications';
import { getSignedInUserAsync } from '../../lib/auth';
import { setGlobalState } from '../../lib/global_state';
import { View, Button } from '../base';

async function requestLocationAsync() {
  return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
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
    .then(() => Actions.naloProviderHomeScene());
}

function chooseRequestor() {
  Promise
    .all([
      requestLocationAsync(),
      storeLoggedInUserAsync(),
    ])
    .then(() => Actions.naloRequestor());
}

export const ChooseRoleScene = () => (
  <View>
    <Button onPress={chooseRequestor}>Be a requestor</Button>
    <Button onPress={chooseProvider}>Be a provider</Button>
  </View>
);
