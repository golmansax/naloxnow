import React, { PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
  Button,
} from '../../base';
import { RequestStatus } from '../../../lib/constants';
import { firebaseDB } from '../../../lib/firebase';

export const NaloRequestorSourceScene = ({ source }) => (
  <View>
    <Text>{source.title}</Text>
    <Text>{source.subtitle}</Text>
    <Button
      onPress={() => {
        const request = {
          source,
          status: RequestStatus.REQUESTED,
        };

        firebaseDB.ref('request').set(request).then(() => {
          Actions.naloRequestorRequestScene({ request });
        });
      }}
      >
      Request Naloxone
    </Button>
  </View>
);

NaloRequestorSourceScene.propTypes = {
  source: PropTypes.object.isRequired,
};
