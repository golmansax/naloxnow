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
    justifyContent: 'space-around',
    padding: vr(1),
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
    marginBottom: vr(1),
    color: nnRed,
  },

  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: vr(0.5),
  },
});

function nextStep() {
  Actions.toolkitObtainNaloxoneScene();
}

export const OverdoseToolkitCall911Scene = () => (
  <RequestAlertLayout style={styles.container}>
    <View style={styles.numberContainer}>
      {[9, 1, 1].map((number, index) => (
        <View key={index} style={[styles.number, index === 0 ? styles.firstNumber : null]}>
          <Text title style={styles.numberText}>{number}</Text>
        </View>
      ))}
    </View>
    <View style={styles.section}>
      <Text size='xLarge' style={styles.title}>Call 911</Text>
      <Text>Make sure to give an accurate location to first responders</Text>
    </View>
    <View style={styles.section}>
      <Button design='urgent' size='large'>Call 911</Button>
      <Button onPress={nextStep} style={styles.button}>Move to next step</Button>
    </View>
  </RequestAlertLayout>
);
