import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { View, TouchableHighlight, Text } from '../base';
import {
  sendDefaultPushNotificationAsync,
  registerPushTokenAsync,
} from '../../lib/push_notifications';
import { getGlobalState } from '../../lib/global_state';
import {
  completeProviderPrerequisites, completeRequestorPrerequisites,
} from '../../lib/prerequisites';

const menuEntries = [
  {
    title: 'Find Naloxone',
    key: 'naloRequestor',
    prerequisite: completeRequestorPrerequisites,
  },
  {
    title: 'Provide Naloxone',
    key: 'naloProvider',
    prerequisite: completeProviderPrerequisites,
  },
];

const styles = StyleSheet.create({
  content: {
    top: 60,
  },
  entry: {
    padding: 10,
  },
});

export const DrawerMenu = () => (
  <View style={styles.content}>
    {menuEntries.map((entry) => (
      <TouchableHighlight
        key={entry.key}
        style={styles.entry}
        onPress={() => {
          entry.prerequisite().then(() => Actions[entry.key]());
        }}
        >
        <Text>{entry.title}</Text>
      </TouchableHighlight>
    ))}
    <TouchableHighlight
      style={styles.entry}
      onPress={async function () {
        registerPushTokenAsync(getGlobalState('pushToken').token)
          .then(() => Alert.alert('Success', 'Push notification enabled for this user'))
          .catch((err) => Alert.alert('Error', err.message));
      }}
      >
      <Text>Register this user for push notifications</Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={styles.entry}
      onPress={async function () {
        sendDefaultPushNotificationAsync()
          .then(() => Alert.alert('Success', 'Successfully sent message'))
          .catch((err) => Alert.alert('Error', err.message));
      }}
      >
      <Text>Send push notification</Text>
    </TouchableHighlight>
    <View style={styles.entry}>
      <Text>User ID: {getGlobalState('user').uid}</Text>
    </View>
    <View style={styles.entry}>
      <Text>
        Push token: {getGlobalState('pushToken').token} ({getGlobalState('pushToken').status})
      </Text>
    </View>
  </View>
);
