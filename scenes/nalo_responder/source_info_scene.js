import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  View,
  Button,
} from '../../components';
import { white } from '../../styles/colors';
import { firebaseApp } from '../../firebase';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: 60,
    backgroundColor: white,
  },
});

export const NaloResponderSourceInfoScene = ({ source }) => (
  <View style={styles.content}>
    <Text>{source.title}</Text>
    <Text>{source.subtitle}</Text>
    <Button onPress={() => firebaseApp.database().ref('requestedSource').set(source)}>
      Request Naloxone
    </Button>
  </View>
);

NaloResponderSourceInfoScene.propTypes = {
  source: PropTypes.object.isRequired,
};
