import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, View, Text } from '../../base';
import { RequestAlertLayout } from '../../layouts/request_alert_layout';
import { nnRed } from '../../../styles/colors';
import { vr } from '../../../styles/units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: vr(1),
    justifyContent: 'space-around',
  },

  text: {
    textAlign: 'center',
  },

  textContainer: {
    alignItems: 'center',
  },

  title: {
    marginBottom: vr(1),
    color: nnRed,
  },

  button: {
    marginTop: vr(0.5),
  },
});

export const OverdoseToolkitAdministerNaloxoneScene = () => (
  <RequestAlertLayout style={styles.container}>
    <View style={styles.textContainer}>
      <Text size='xLarge' style={styles.title} title>Administer naloxone</Text>
      <Text style={styles.text}>
        If the patient is suspected of taking too many opioids, it is best to
        obtain naloxone immediately.
      </Text>
    </View>
    <View>
      <Button style={styles.button}>
        Skip this step
      </Button>
    </View>
  </RequestAlertLayout>
);
