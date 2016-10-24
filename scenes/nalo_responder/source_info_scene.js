import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import {
  MapView,
  Text,
  View,
  TouchableHighlight,
  Button,
} from '../../components';
import { white, red } from '../../styles/colors';
import { naloxoneSources } from '../../data';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: 60,
    backgroundColor: white,
  },
});

export const NaloResponderSourceInfoScene = ({ source }) => {
  console.log(source);
  return (
    <View style={styles.content}>
      <Text>{source.title}</Text>
      <Text>{source.subtitle}</Text>
      <Button>Request Naloxone</Button>
    </View>
  );
};

NaloResponderSourceInfoScene.propTypes = {
  source: PropTypes.object.isRequired,
};
