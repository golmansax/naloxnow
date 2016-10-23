import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from 'apsl-react-native-button';
import { white, red } from '../styles/colors';
import { naloxoneSources } from '../data';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: white,
  },

  map: {
    flex: 1,
    backgroundColor: red,
  },

  list: {
    flex: 1,
  },

  listItem: {
    height: 50,
  },
});

export const ResponderScene = () => (
  <View style={styles.content}>
    <View style={styles.map}></View>
    <View style={styles.list}>
      {naloxoneSources.map((source) => (
        <View key={source.id} style={styles.listItem}>
          <Text>{source.title}</Text>
        </View>
      ))}
    </View>
  </View>
);
