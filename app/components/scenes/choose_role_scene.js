import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Text, View, Button } from '../base';
import { vr } from '../../styles/units';
import { lightGrey, superDarkGrey, white } from '../../styles/colors';
import {
  completeProviderPrerequisites, completeRequestorPrerequisites,
} from '../../lib/prerequisites';

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
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: lightGrey,
    borderBottomWidth: 1,
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
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>
        Please choose one of the options:
      </Text>
    </View>
    <View style={styles.option}>
      <Button style={styles.button} onPress={chooseToolkit}>
        Take me through the Overdose Toolkit
      </Button>
    </View>
    <View style={[styles.option, styles.lastOption]}>
      <Button style={styles.button} onPress={chooseNaloRequestor}>
        I know what I'm doing: Request naloxone
      </Button>
    </View>
  </View>
);
