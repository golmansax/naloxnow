import {
  sendPushNotificationAsync as sendExponentPushNotificationAsync,
} from 'exponent-server-sdk';
import { firebaseDB } from './firebase';

export async function getPushNotificationTokenAsync() {
  return firebaseDB().ref('pushToken').once('value')
    .then((snapshot) => snapshot.val());
}

export async function sendPushNotificationAsync() {
  const pushToken = await getPushNotificationTokenAsync();
  console.log(`Sending push notification to token: ${pushToken}...`);

  return sendExponentPushNotificationAsync({
    exponentPushToken: pushToken,
    message: "This is a test notification",
    data: {withSome: 'data'},
  });
}
