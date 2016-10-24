import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  View,
  Button,
} from '../../components';
import { white } from '../../styles/colors';
import { RequestStatus } from '../../constants';
import { firebaseApp } from '../../firebase';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: 60,
    backgroundColor: white,
  },
});

export const NaloResponderRequestView = ({ request }) => (
  <View style={styles.content}>
    <Text>REQUEST</Text>
    <Text>{request.source.title}</Text>
  </View>
);

NaloResponderRequestScene.propTypes = {
  request: PropTypes.object.isRequired,
};
