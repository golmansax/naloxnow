import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Button } from '../../base';
import {
  completeRequestorPrerequisites,
} from '../../../lib/prerequisites';

function naloxoneNow() {
  completeRequestorPrerequisites().then(() => Actions.naloxoneNow());
}

export const OverdoseToolkitObtainNaloxoneScene = () => (
  <View>
    <Button onPress={naloxoneNow}>NaloxoneNow</Button>
  </View>
);
