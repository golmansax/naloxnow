import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, View, Text, Image } from '../../base';
import { RequestAlertLayout } from '../../layouts/request_alert_layout';
import { nnRed } from '../../../styles/colors';
import { vr } from '../../../styles/units';
import { getImage } from '../../../lib/images';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: vr(1),
    justifyContent: 'space-around',
  },

  text: {
    textAlign: 'center',
    marginTop: vr(1),
  },

  textContainer: {
    alignItems: 'center',
  },

  image: {
    width: vr(4),
    height: vr(4),
  },

  title: {
    color: nnRed,
  },

  button: {
    marginTop: vr(0.5),
  },
});

function nextStep() {
  Actions.toolkitMonitorPatientScene();
}

export const OverdoseToolkitAdministerNaloxoneScene = () => (
  <RequestAlertLayout style={styles.container}>
    <View style={styles.textContainer}>
      <Image source={getImage('needle')} style={styles.image} />
      <Text size='xLarge' style={styles.title} title>Administer naloxone</Text>
      <Text style={styles.text}>
        If you have the naloxone auto-injector, place and apply on the upper leg.
      </Text>
      <Text style={styles.text}>
        If you have the naloxone nasal spray, assemble nasal atomizer and
        deliver half the dose to each nostril.
      </Text>
    </View>
    <View>
      <Button style={styles.button} onPress={nextStep}>
        Next step
      </Button>
    </View>
  </RequestAlertLayout>
);
