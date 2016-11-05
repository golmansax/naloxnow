import React from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import { Text, Button, View } from '../../base';
import { RequestAlertLayout } from '../../layouts/request_alert_layout';
import { vr } from '../../../styles/units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: vr(1),
  },

  button: {
    marginTop: vr(0.5),
  },

  title: {
    textAlign: 'center',
    marginBottom: vr(1),
  },
});

function toAdminister() {
  Actions.toolkitAdministerNaloxoneScene();
}

function toBreathing() {
  Actions.toolkitSupportBreathingScene();
}

export const OverdoseToolkitMonitorPatientScene = () => (
  <RequestAlertLayout style={styles.container}>
    <View>
      <Text title size='xLarge' style={styles.title}>
        Continue to monitor patient until help arrives
      </Text>
    </View>
    <View>
      <Text style={styles.title}>
        Suggested actions
      </Text>
      <Button design='urgent'>
        Call 911
      </Button>
      <Button onPress={toBreathing} style={styles.button}>
        How to support breathing
      </Button>
      <Button onPress={toAdminister} style={styles.button}>
        How to administer naloxone
      </Button>
    </View>
  </RequestAlertLayout>
);
