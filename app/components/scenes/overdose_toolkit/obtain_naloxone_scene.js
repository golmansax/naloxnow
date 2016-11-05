import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, View, Text } from '../../base';
import {
  completeRequestorPrerequisites,
} from '../../../lib/prerequisites';
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

function naloxoneNow() {
  completeRequestorPrerequisites().then(() => Actions.naloxoneNow());
}

export const OverdoseToolkitObtainNaloxoneScene = () => (
  <RequestAlertLayout style={styles.container}>
    <View style={styles.textContainer}>
      <Text size='xLarge' style={styles.title} title>Obtain naloxone</Text>
      <Text style={styles.text}>
        If the patient is exhibiting shallow breathing, small pupils, or
        suspected of taking opiods, obtain naloxone immediately.
      </Text>
    </View>
    <View>
      <Button onPress={naloxoneNow} design='urgent' size='large'>
        Help me find naloxone
      </Button>
      <Button onPress={() => Actions.toolkitAdministerNaloxoneScene()} style={styles.button}>
        I already have naloxone
      </Button>
      <Button onPress={() => Actions.toolkitSupportBreathingScene()} style={styles.button}>
        I don&rsquo;t need naloxone
      </Button>
    </View>
  </RequestAlertLayout>
);
