import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Image } from '../base';
import { vr } from '../../styles/units';
import { titleFontStyle } from '../../styles/fonts';

function stateHasBackButton(state) {
  return !(state.index === 0 && (!state.parentIndex || state.parentIndex === 0));
}

const height = vr(1);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: vr(1.5) - 5,
    paddingLeft: vr(1),
  },

  withBackButton: {
    paddingLeft: vr(2),
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    height,
    width: height * 130 / 56,
  },

  title: {
    ...titleFontStyle,
    fontSize: 20,
    paddingTop: 6,
  },
});

export const NavBarTitle = (props) => {
  const { title, titleWrapperStyle, titleStyle, navigationState } = props;
  const hasBackButton = stateHasBackButton(navigationState);

  return (
    <View style={[styles.container, titleWrapperStyle, hasBackButton ? styles.withBackButton : null]}>
      <View style={styles.titleContainer}>
        <Image
          source={require('../../assets/images/odrlogo_whitetransparent.png')}
          style={styles.logo}
        />
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
    </View>
  );
};
