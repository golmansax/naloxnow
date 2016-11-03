// import { Location } from 'exponent';
import { Asset, Font } from 'exponent';
import { getPushTokenAsync } from './push_notifications';
import { getSignedInUserAsync } from './auth';
import { setGlobalState } from './global_state';
import { firebaseDB } from './firebase';
import { RequestStatus } from './constants';

const cache = new Map();

async function requestLocationAsync() {
  return Promise.resolve();
  // return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
}

async function storeLoggedInUserAsync() {
  const cachedPromise = cache.get('loggedInUser');
  if (cachedPromise) {
    return cachedPromise;
  }

  const promise = getSignedInUserAsync().then((user) => setGlobalState('user', user));
  cache.set('loggedInUser', promise);

  return promise;
}

async function storePushTokenAsync() {
  return getPushTokenAsync().then((token) => setGlobalState('pushToken', token));
}

async function setRequestStatus(status) {
  return firebaseDB().ref('request/status').set(status);
}

async function loadImagesAsync() {
  const images = [
    require('../assets/images/odrlogo_whitetransparent.png'),
  ];

  return Promise.all(images.map((image) => Asset.fromModule(image).downloadAsync()));
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

export async function completeAppPrerequisites() {
  return Promise.all([
    Font.loadAsync({
      /* eslint-disable global-require */
      'noto-sans': require('../assets/fonts/NotoSans-Regular.ttf'),
      'noto-sans-bold': require('../assets/fonts/NotoSans-Bold.ttf'),
      'museo-slab': require('../assets/fonts/museo-slab-500.ttf'),
      /* eslint-enable global-require */
    }),
    loadImagesAsync(),
    storeLoggedInUserAsync(),
  ]);
}
