import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { View, TouchableHighlight, Text } from '../base';
import {
  sendPushNotificationAsync,
  registerPushTokenAsync,
} from '../../lib/push_notifications';
import { getGlobalState } from '../../lib/global_state';

const menuEntries = [
  { title: 'Find Naloxone', key: 'naloRequestor' },
  { title: 'Provide Naloxone', key: 'naloProvider' },
];

const styles = StyleSheet.create({
  content: {
    top: 60,
  },
  entry: {
    padding: 10,
  },
});

export const DrawerMenu = ({ onNavigate }) => (
  <View style={styles.content}>
    {menuEntries.map((entry) => (
      <TouchableHighlight
        key={entry.key}
        style={styles.entry}
        onPress={() => {
          onNavigate();
          Actions[entry.key]({ open: false });
        }}
        >
        <Text>{entry.title}</Text>
      </TouchableHighlight>
    ))}
    <TouchableHighlight
      style={styles.entry}
      onPress={async function () {
        registerPushTokenAsync(getGlobalState('pushToken').token)
          .then(() => alert('Push notification enabled for this user'))
          .catch((err) => alert(err.message));
      }}
      >
      <Text>Register this user for push notifications</Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={styles.entry}
      onPress={async function () {
        sendPushNotificationAsync('This is a test')
          .then(() => alert('Successfully sent message'))
          .catch((err) => alert(err.message));
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

DrawerMenu.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};
