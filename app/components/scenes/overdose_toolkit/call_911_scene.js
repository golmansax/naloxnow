import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Button } from '../../base';

function nextStep() {
  Actions.toolkitObtainNaloxoneScene();
}

export const OverdoseToolkitCall911Scene = () => (
  <View>
    <Button>Call 911</Button>
    <Button onPress={nextStep}>Move to next step</Button>
  </View>
);
