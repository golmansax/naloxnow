import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../base';
import { RequestAlertLayout } from '../../layouts/request_alert_layout';
import { nnRed } from '../../../styles/colors';
import { vr } from '../../../styles/units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: vr(1),
  },

  title: {
    color: nnRed,
    textAlign: 'center',
  },
});

export const OverdoseToolkitMonitorPatientScene = () => (
  <RequestAlertLayout style={styles.container}>
    <Text title size='large' style={styles.title}>
      Monitor Patient
    </Text>
  </RequestAlertLayout>
);
