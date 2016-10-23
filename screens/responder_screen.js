import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from 'apsl-react-native-button';
import { white } from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const ResponderScreen = () => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Text>Hello!</Text>
      <Button>Find Naloxone now!</Button>
    </View>
  </View>
);
