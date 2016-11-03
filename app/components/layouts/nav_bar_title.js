import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Image } from '../base';
import { vr } from '../../styles/units';
import { titleFontStyle } from '../../styles/fonts';
import { getImage } from '../../lib/images';
import { stateHasBackButton } from './nav_utils';

const height = vr(1.5);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: vr(1.5) - 7,
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
    width: Math.round((height / 165) * 200),
  },

  title: {
    ...titleFontStyle,
    fontSize: 20,
    paddingTop: 4,
    paddingLeft: 3,
  },
});

export const NavBarTitle = (props) => {
  const { titleWrapperStyle, titleStyle, navigationState, hideBackImage } = props;
  const hasBackButton = stateHasBackButton(navigationState) && !hideBackImage;

  return (
    <View
      style={[styles.container, titleWrapperStyle, hasBackButton ? styles.withBackButton : null]}
      >
      <View style={styles.titleContainer}>
        <Image
          source={getImage('odrLogo')}
          style={styles.logo}
        />
        <Text style={[styles.title, titleStyle]}>ODResponse</Text>
      </View>
    </View>
  );
};

NavBarTitle.propTypes = {
  hideBackImage: PropTypes.bool,
  navigationState: PropTypes.object.isRequired,
  titleStyle: Text.propTypes.style,
  titleWrapperStyle: View.propTypes.style,
};
