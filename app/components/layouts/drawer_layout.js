import React, { PropTypes, Component } from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import { DrawerMenu } from './drawer_menu';

export class DrawerLayout extends Component {
  render() {
    const { navigationState, onNavigate } = this.props;
    const { open, children, key } = navigationState;

    return (
      <Drawer
        ref={(ref) => (this.drawer = ref)}
        open={open}
        onOpen={() => Actions.refresh({ key, open: true })}
        onClose={() => Actions.refresh({ key, open: false })}
        content={<DrawerMenu onNavigate={this.closeDrawer} />}
        tapToClose
        openDrawerOffset={0.2}
        tweenHandler={Drawer.tweenPresets.parallax}
        >
        <DefaultRenderer navigationState={children[0]} onNavigate={onNavigate} />
      </Drawer>
    );
  }

  closeDrawer = () => this.drawer.close();
}

DrawerLayout.propTypes = {
  navigationState: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,
  onNavigate: PropTypes.func.isRequired,
};
