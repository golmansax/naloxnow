import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from 'apsl-react-native-button';
import { grey } from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const SecondScreen = () => (
  <View style={styles.container}>
    <Text>I&rsquo;m the second screen</Text>
    <Button>Find Naloxone now!</Button>
  </View>
);
