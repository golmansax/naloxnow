import { Permissions, Notifications } from 'exponent';
import { firebaseApp } from './firebase';

export async function registerForPushNotificationsAsync() {
  let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
  console.log('status', status);

  // Stop here if the user did not grant permissions
  /*
  if (status !== 'granted') {
    return;
  }
  */

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExponentPushTokenAsync();
  alert(token);
  return firebaseApp.database().ref('pushToken').set(token);
}
