// import { Location } from 'exponent';
import { getPushTokenAsync } from './push_notifications';
import { getSignedInUserAsync } from './auth';
import { setGlobalState } from './global_state';
import { firebaseDB } from './firebase';
import { RequestStatus } from './constants';

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

export async function completeProviderPrerequisites() {
  return Promise.all([
    requestLocationAsync(),
    storeLoggedInUserAsync(),
    storePushTokenAsync(),
  ]);
}

export async function completeRequestorPrerequisites() {
  return Promise.all([
    requestLocationAsync(),
    storeLoggedInUserAsync()
      .then(() => setRequestStatus(RequestStatus.NOT_YET_REQUESTED)),
  ]);
}
