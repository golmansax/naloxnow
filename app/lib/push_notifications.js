import { Permissions, Notifications } from 'exponent';
import { firebaseDB } from './firebase';
import { SERVER_PORT } from 'babel-plugin-dotenv';

export async function registerForPushNotificationsAsync() {
  await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExponentPushTokenAsync();
  return firebaseDB().ref('pushToken').set(token);
}

const SERVER_ROOT = `http://localhost:${SERVER_PORT}`;

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    var err = new Error(res.statusText);
    err.res = res;
    throw err;
  }
}

export async function sendPushNotificationAsync() {
  return fetch(`${SERVER_ROOT}/push`, {
  }).then(checkStatus);
}
