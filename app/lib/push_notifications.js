import { Permissions, Notifications } from 'exponent';
import { SERVER_PORT } from 'babel-plugin-dotenv';
import { firebaseDB } from './firebase';
import { checkStatus } from './utils';
import { requestor, provider } from './data';

export async function getPushTokenAsync() {
  const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

  // If user did not grant permissions
  if (status !== 'granted') {
    return { status };
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExponentPushTokenAsync();
  return { token, status };
}

export async function registerPushTokenAsync(token) {
  if (!token) {
    throw new Error('Cannot register empty token');
  }

  return firebaseDB().ref('pushToken').set(token);
}

const SERVER_ROOT = `http://localhost:${SERVER_PORT}`;

export async function sendPushNotificationAsync(message) {
  return fetch(`${SERVER_ROOT}/push?message=${message}`).then(checkStatus);
}

export async function sendDefaultPushNotificationAsync() {
  const message = [
    `URGENT: ${requestor.title} needs naloxone immediately,`,
    `is located ${provider.time} minutes away`,
  ].join(' ');

  return sendPushNotificationAsync(message)
    .then(checkStatus)
    .catch((err) => console.log(err)); // eslint-disable-line no-console
}
