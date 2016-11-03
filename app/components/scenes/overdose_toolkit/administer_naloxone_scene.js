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
  },

  textContainer: {
    alignItems: 'center',
  },

  image: {
    width: vr(4),
    height: vr(4),
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
      <Image source={getImage('needle')} style={styles.image} />
      <Text size='xLarge' style={styles.title} title>Administer naloxone</Text>
      <Text style={styles.text}>
        Depending on what naloxone you have...
      </Text>
    </View>
    <View>
      <Button style={styles.button}>
        Skip this step
      </Button>
    </View>
  </RequestAlertLayout>
);
