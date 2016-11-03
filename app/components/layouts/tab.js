import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@exponent/vector-icons';
import { Text, View } from '../base';
import { nnBlue, superDarkGrey, transparent } from '../../styles/colors';
import { vr, tabHeight } from '../../styles/units';

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },

  selected: {
    color: nnBlue,
  },

  container: {
    flex: 1,
    height: tabHeight,
    borderTopWidth: 3,
    borderColor: transparent,
    justifyContent: 'center',
  },

  selectedContainer: {
    borderColor: nnBlue,
  },
});

export const Tab = ({ selected, title, iconName }) => (
  <View style={[styles.container, selected ? styles.selectedContainer : null]}>
    <FontAwesome
      style={styles.icon}
      name={iconName}
      size={vr(1.5)}
      color={selected ? nnBlue : superDarkGrey}
    />
    <Text title style={selected ? styles.selected : null}>
      {title}
    </Text>
  </View>
);

Tab.propTypes = {
  iconName: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

Tab.defaultProps = {
  selected: false,
};
