import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../base';
import { RequestAlertLayout } from '../../layouts/request_alert_layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const NaloRequestorAcceptedRequestScene = () => (
  <RequestAlertLayout style={styles.container}>
    <Text>REQUESTED</Text>
  </RequestAlertLayout>
);
