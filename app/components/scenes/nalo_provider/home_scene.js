import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../base';
import { firebaseDB } from '../../../lib/firebase';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: 60,
  },
});

export const NaloProviderHomeScene = () => (
  <Text style={styles.content}>Provider</Text>
);
