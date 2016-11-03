import React from 'react';
import { StyleSheet } from 'react-native';
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

  title: {
    color: nnRed,
  },

  image: {
    width: vr(4),
    height: vr(4),
  },

  button: {
    marginTop: vr(0.5),
  },
});

export const OverdoseToolkitSupportBreathingScene = () => (
  <RequestAlertLayout style={styles.container}>
    <View style={styles.textContainer}>
      <Image source={getImage('breathing')} style={styles.image} />
      <Text size='xLarge' style={styles.title} title>Support Breathing</Text>
      <Text style={styles.text}>
        While waiting for medical responders, it is important that the patient
        is able to breathe.
      </Text>
      <Text style={styles.text}>
        Clear airway
      </Text>
      <Text style={styles.text}>
        Turn the patient onto the side
      </Text>
    </View>
    <View>
      <Button style={styles.button}>
        Skip this step
      </Button>
    </View>
  </RequestAlertLayout>
);