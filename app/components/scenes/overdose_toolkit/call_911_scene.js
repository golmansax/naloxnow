import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { View, Text, Button } from '../../base';
import { RequestAlertLayout } from '../../layouts/request_alert_layout';
import { nnRed, white } from '../../../styles/colors';
import { vr } from '../../../styles/units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: vr(1),
  },

  text: {
    textAlign: 'center',
    marginTop: vr(1),
  },

  numberContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  number: {
    backgroundColor: nnRed,
    width: vr(3),
    height: vr(3),
    borderRadius: 2,
    marginLeft: vr(0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: nnRed,
    textAlign: 'center',
  },

  mainTitle: {
    marginTop: vr(1),
  },

  section: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainSection: {
    flex: 1,
  },

  firstNumber: {
    marginLeft: 0,
  },

  numberText: {
    color: white,
    fontSize: vr(2),
    lineHeight: vr(3),
  },

  button: {
    marginTop: vr(1),
  },
});

function nextStep() {
  Actions.toolkitObtainNaloxoneScene();
}

/* Hiding this for now
  <View style={styles.numberContainer}>
    {[9, 1, 1].map((number, index) => (
      <View key={index} style={[styles.number, index === 0 ? styles.firstNumber : null]}>
        <Text title style={styles.numberText}>{number}</Text>
      </View>
    ))}
  </View>
*/

export const OverdoseToolkitCall911Scene = () => (
  <RequestAlertLayout style={styles.container}>
    <View style={[styles.section, styles.mainSection]}>
      <Text title size='large' style={styles.title}>
        If you are in a potential emergency situation:{' '}
      </Text>
      <Text size='xLarge' title bold style={[styles.title, styles.mainTitle]}>
        Call 911 immediately
      </Text>
      <Button style={styles.button} design='urgent' size='large'>
        Call 911
      </Button>
      <Text style={styles.text}>
        Make sure to give an accurate location to first responders.
      </Text>
    </View>
    <View style={styles.section}>
      <Button onPress={nextStep} style={styles.button}>Next step</Button>
    </View>
  </RequestAlertLayout>
);
