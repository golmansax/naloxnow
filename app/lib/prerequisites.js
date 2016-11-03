// import { Location } from 'exponent';
import { Asset, Font } from 'exponent';
import { getPushTokenAsync } from './push_notifications';
import { getSignedInUserAsync } from './auth';
import { setGlobalState } from './global_state';
import { images } from './images';

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

async function loadImagesAsync() {
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
    storeLoggedInUserAsync(),
  ]);
}

export async function completeAppPrerequisites() {
  return Promise.all([
    Font.loadAsync({
      /* eslint-disable global-require */
      // 'noto-sans': require('../assets/fonts/NotoSans-Regular.ttf'),
      // 'noto-sans-bold': require('../assets/fonts/NotoSans-Bold.ttf'),
      // 'museo-slab-300': require('../assets/fonts/museo-slab-300.ttf'),
      'museo-slab-500': require('../assets/fonts/museo-slab-500.ttf'),
      // 'museo-sans-300': require('../assets/fonts/museo-sans-300.ttf'),
      'museo-sans-500': require('../assets/fonts/museo-sans-500.ttf'),
      'museo-sans-700': require('../assets/fonts/museo-sans-700.ttf'),
      /* eslint-enable global-require */
    }),
    loadImagesAsync(),
    storeLoggedInUserAsync(),
  ]);
}
