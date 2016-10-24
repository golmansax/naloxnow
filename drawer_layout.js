import React, { PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import { SideMenu } from './sidemenu';

export const DrawerLayout = ({ navigationState, onNavigate }) => {
  const { open, children, key } = navigationState;

  return (
    <Drawer
      open={open}
      onOpen={() => Actions.refresh({ key, open: true })}
      onClose={() => Actions.refresh({ key, open: false })}
      type='static'
      content={<SideMenu />}
      tapToClose
      openDrawerOffset={0.2}
      tweenHandler={Drawer.tweenPresets.parallax}
      >
      <DefaultRenderer navigationState={children[0]} onNavigate={onNavigate} />
    </Drawer>
  );
};

DrawerLayout.propTypes = {
  navigationState: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,
  onNavigate: PropTypes.func.isRequired,
};
