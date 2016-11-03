import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableHighlight } from '../base';
import { vr, xLargeFontSize } from '../../styles/units';
import { lightGrey, superDarkGrey, white } from '../../styles/colors';
import {
  completeRequestorPrerequisites,
} from '../../lib/prerequisites';
import { RequestAlertLayout } from '../layouts/request_alert_layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    paddingTop: vr(0.25),
    paddingBottom: vr(0.25),
    paddingRight: vr(1),
    paddingLeft: vr(1),
    backgroundColor: superDarkGrey,
    color: white,
  },

  option: {
    flex: 1,
    borderColor: lightGrey,
    borderBottomWidth: 1,
  },

  optionTitle: {
    fontSize: xLargeFontSize,
  },

  optionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  lastOption: {
    borderBottomWidth: 0,
  },

  button: {
    margin: vr(0.5),
    marginBottom: 0,
  },
});

function chooseToolkit() {
  Actions.overdoseToolkit();
}

function chooseNaloRequestor() {
  completeRequestorPrerequisites().then(() => Actions.naloxoneNow());
}

export const ChooseRoleScene = () => (
  <RequestAlertLayout style={styles.container}>
    <View>
      <Text style={styles.title}>
        Please choose one of the options:
      </Text>
    </View>
    <TouchableHighlight style={styles.option} onPress={chooseToolkit}>
      <View style={styles.optionContent}>
        <Text title style={styles.optionTitle}>
          Overdose Toolkit
        </Text>
        <Text>
          Help! Someone is suspected of overdosing.
        </Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight style={[styles.option, styles.lastOption]} onPres={chooseNaloRequestor}>
      <View style={styles.optionContent}>
        <Text title style={styles.optionTitle}>
          NaloxoneNow
        </Text>
        <Text>Find naloxone</Text>
      </View>
    </TouchableHighlight>
  </RequestAlertLayout>
);
