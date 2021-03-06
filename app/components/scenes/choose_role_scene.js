import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FontAwesome } from '@exponent/vector-icons';
import { Text, View, TouchableHighlight } from '../base';
import { vr, xLargeFontSize } from '../../styles/units';
import { nnBlue, lightGrey, superDarkGrey, white } from '../../styles/colors';
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
    marginBottom: vr(1),
    color: nnBlue,
  },

  optionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
        <FontAwesome
          name='info-circle'
          size={vr(3)}
          color={nnBlue}
        />
        <Text title style={styles.optionTitle}>
          Overdose Toolkit
        </Text>
        <Text>

          Help! Someone is suspected of overdosing.
        </Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight style={[styles.option, styles.lastOption]} onPress={chooseNaloRequestor}>
      <View style={styles.optionContent}>
        <FontAwesome
          name='flag-o'
          size={vr(3)}
          color={nnBlue}
        />
        <Text title style={styles.optionTitle}>
          NaloxoneNow
        </Text>
        <Text>
          See if anyone can deliver naloxone to you
        </Text>
      </View>
    </TouchableHighlight>
  </RequestAlertLayout>
);
