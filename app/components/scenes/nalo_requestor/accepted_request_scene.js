import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Text, Button, View } from '../../base';
import { RequestAlertLayout } from '../../layouts/request_alert_layout';
import { vr } from '../../../styles/units';
import { nnRed } from '../../../styles/colors';
import { provider } from '../../../lib/data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: vr(1),
    justifyContent: 'space-around',
  },

  button: {
    marginTop: vr(0.5),
  },

  banner: {
    textAlign: 'center',
    marginBottom: vr(1),
  },

  disclaimer: {
    textAlign: 'center',
    marginBottom: vr(1),
  },

  red: {
    color: nnRed,
  },
});

function toToolkit() {
  Actions.toolkitSupportBreathingScene();
}

export const NaloRequestorAcceptedRequestScene = () => (
  <RequestAlertLayout style={styles.container}>
    <View>
      <Text title size='large' style={styles.banner}>
        Your naloxone is on its way and will arrive in{' '}
        <Text style={styles.red} size='large' title>{provider.time} mins</Text>.
      </Text>
      <Text style={styles.disclaimer}>
        While you are waiting for the naloxone, if you are nearby a patient,
        you should proceed to support breathing.
      </Text>
      <Button onPress={toToolkit}>
        How to support breathing
      </Button>
    </View>
  </RequestAlertLayout>
);
