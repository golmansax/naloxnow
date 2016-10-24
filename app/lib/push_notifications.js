import { Permissions, Notifications } from 'exponent';
import { firebaseApp } from './firebase';

export async function registerForPushNotificationsAsync() {
  await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExponentPushTokenAsync();
  return firebaseApp.database().ref('pushToken').set(token);
}
