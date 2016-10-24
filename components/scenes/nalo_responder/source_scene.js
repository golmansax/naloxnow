import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
  Button,
} from '../../base';
import { white } from '../../../styles/colors';
import { RequestStatus } from '../../../constants';
import { firebaseApp } from '../../../lib/firebase';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: 60,
    backgroundColor: white,
  },
});

export const NaloResponderSourceScene = ({ source }) => (
  <View style={styles.content}>
    <Text>{source.title}</Text>
    <Text>{source.subtitle}</Text>
    <Button
      onPress={() => {
        const request = {
          source,
          status: RequestStatus.REQUESTED,
        };

        firebaseApp.database().ref('request').set(request).then(() => {
          Actions.naloResponderRequestScene({ request });
        });
      }}
      >
      Request Naloxone
    </Button>
  </View>
);

NaloResponderSourceScene.propTypes = {
  source: PropTypes.object.isRequired,
};
