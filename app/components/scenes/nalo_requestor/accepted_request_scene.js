import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Text, Button } from '../../base';
import { RequestAlertLayout } from '../../layouts/request_alert_layout';
import { vr } from '../../../styles/units';
import { nnRed } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: vr(1),
    justifyContent: 'center',
  },

  button: {
    marginTop: vr(0.5),
  },

  disclaimer: {
    textAlign: 'center',
    marginBottom: vr(1),
  },

  red: {
    color: nnRed,
  },
});

function toAdminister() {
  Actions.toolkitAdministerNaloxoneScene();
}

function toBreathing() {
  Actions.toolkitSupportBreathingScene();
}

export const NaloRequestorAcceptedRequestScene = () => (
  <RequestAlertLayout addMinHeight={false} style={styles.container}>
    <Text style={styles.disclaimer} title size='xLarge'>
      Suggested actions while waiting for naloxone
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
  </RequestAlertLayout>
);
