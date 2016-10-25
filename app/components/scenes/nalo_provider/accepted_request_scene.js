import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../../base';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: 60,
  },
});

export const NaloProviderAcceptedRequestScene = () => (
  <View style={styles.content}>
    <Text>REQUEST ACCEPTED</Text>
  </View>
);
