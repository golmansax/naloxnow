import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { View, TouchableHighlight, Text } from '../base';

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
  </View>
);

DrawerMenu.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};
