import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { View, Button } from '../base';
import { vr } from '../../styles/units';
import {
  completeProviderPrerequisites, completeRequestorPrerequisites,
} from '../../lib/prerequisites';

const styles = StyleSheet.create({
  button: {
    margin: vr(0.5),
    marginBottom: 0,
  },
});

function chooseProvider() {
  completeProviderPrerequisites().then(() => Actions.naloProvider());
}

function chooseRequestor() {
  completeRequestorPrerequisites().then(() => Actions.naloRequestor());
}

export const ChooseRoleScene = () => (
  <View>
    <Button style={styles.button} onPress={chooseRequestor}>Be a requestor</Button>
    <Button style={styles.button} onPress={chooseProvider}>Be a provider</Button>
  </View>
);
