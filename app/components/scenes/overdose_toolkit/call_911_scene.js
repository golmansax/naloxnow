import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Button } from '../../base';
import { RequestAlertLayout } from '../../layouts/request_alert_layout';

function nextStep() {
  Actions.toolkitObtainNaloxoneScene();
}

export const OverdoseToolkitCall911Scene = () => (
  <RequestAlertLayout>
    <Button>Call 911</Button>
    <Button onPress={nextStep}>Move to next step</Button>
  </RequestAlertLayout>
);
