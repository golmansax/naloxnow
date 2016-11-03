import React, { PropTypes } from 'react';
import { Entypo } from '@exponent/vector-icons';
import { vr } from '../../styles/units';
import { white } from '../../styles/colors';
import { stateHasBackButton } from './nav_utils';

export const BackButton = ({ navigationState, hideBackImage }) => {
  const hasBackButton = stateHasBackButton(navigationState) && !hideBackImage;
  if (!hasBackButton) {
    return null;
  }

  return <Entypo name='chevron-left' size={vr(1) + 3} color={white} />;
};

BackButton.propTypes = {
  hideBackImage: PropTypes.bool,
  navigationState: PropTypes.object.isRequired,
};
