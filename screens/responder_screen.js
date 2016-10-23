import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from 'apsl-react-native-button';
import NavigationBar from 'react-native-navbar';
import { white } from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },

  navbar: {
    height: 50,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const ResponderScreen = () => (
  <View style={styles.container}>
    <NavigationBar title={{ title: 'Home' }} style={styles.navbar} />
    <View style={styles.content}>
      <Text>Hello!</Text>
      <Button>Find Naloxone now!</Button>
    </View>
  </View>
);
