import {
  sendPushNotificationAsync as sendExponentPushNotificationAsync,
} from 'exponent-server-sdk';
import { firebaseDB } from './firebase';

export async function getPushNotificationTokenAsync() {
  return firebaseDB().ref('pushToken').once('value')
    .then((snapshot) => snapshot.val());
}

export async function sendPushNotificationAsync(message) {
  const pushToken = await getPushNotificationTokenAsync();

  return sendExponentPushNotificationAsync({
    exponentPushToken: pushToken,
    message,
    data: { withSome: 'data' },
  });
}
