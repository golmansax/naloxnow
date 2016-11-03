import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Button } from '../../base';
import {
  completeRequestorPrerequisites,
} from '../../../lib/prerequisites';
import { RequestAlertLayout } from '../../layouts/request_alert_layout';

function naloxoneNow() {
  completeRequestorPrerequisites().then(() => Actions.naloxoneNow());
}

export const OverdoseToolkitObtainNaloxoneScene = () => (
  <RequestAlertLayout>
    <Button onPress={naloxoneNow}>NaloxoneNow</Button>
  </RequestAlertLayout>
);
