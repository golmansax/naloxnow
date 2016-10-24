import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
} from '../components';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: 60,
  },
});

export const NaloProviderScene = () => (
  <Text style={styles.content}>Provider</Text>
);
