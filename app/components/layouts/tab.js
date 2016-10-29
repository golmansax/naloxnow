import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../base';
import { nnBlue } from '../../styles/colors';

const styles = StyleSheet.create({
  selected: {
    color: nnBlue,
  },
});

export const Tab = ({ selected, title }) => (
  <Text style={selected ? styles.selected : null}>
    {title}
  </Text>
);

Tab.propTypes = {
  selected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

Tab.defaultProps = {
  selected: false,
};
