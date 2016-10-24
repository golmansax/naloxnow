import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { View, TouchableHighlight, Text } from '../base';
import { registerForPushNotificationsAsync } from '../../lib/push_notifications';
import { getGlobalState } from '../../lib/global_state';

const menuEntries = [
  { title: 'Find Naloxone', key: 'naloResponder' },
  { title: 'Provide Naloxone', key: 'naloProvider' },
];

const styles = StyleSheet.create({
  content: {
    top: 60,
  },
  entry: {
    padding: 5,
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
        await registerForPushNotificationsAsync();
        alert('Push notification');
      }}
      >
      <Text>Enable push notifications</Text>
    </TouchableHighlight>
    <View style={styles.entry}>
      <Text>User ID: {getGlobalState('user').id}</Text>
    </View>
  </View>
);

DrawerMenu.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};
