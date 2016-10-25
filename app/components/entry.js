import React, { Component, PropTypes } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { DeviceEventEmitter } from 'react-native';
import { ChooseRoleScene } from './scenes/choose_role_scene';
import { NaloResponderHomeScene } from './scenes/nalo_responder/home_scene';
import { NaloResponderSourceScene } from './scenes/nalo_responder/source_scene';
import { NaloResponderRequestScene } from './scenes/nalo_responder/request_scene';
import { NaloProviderHomeScene } from './scenes/nalo_provider/home_scene';
import { NaloProviderAcceptedRequestScene } from './scenes/nalo_provider/accepted_request_scene';
import { DrawerLayout } from './layouts/drawer_layout';

export class Entry extends Component {
  static propTypes = {
    exp: PropTypes.shape({
      notification: PropTypes.object,
    }).isRequired,
  };

  state = {
    isReady: true,
  };

  componentWillMount() {
    // Handle notifications that are received or selected while the app
    // is open
    this.removeListener = DeviceEventEmitter.addListener(
      'Exponent.notification', this.handleNotification
    );

    // Handle notifications that are received or selected while the app
    // is closed, and selected in order to open the app.
    // `exp` is a special prop that is only available on your app's
    // root component -- the one that is registered with `AppRegistry`
    // as main.
    if (this.props.exp.notification) {
      this.handleNotification(this.props.exp.notification);
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <Router>
        <Scene
          key='drawer'
          component={DrawerLayout}
          open={false}
          >
          <Scene
            key='root'
            rightTitle='Menu'
            onRight={() => Actions.refresh({ key: 'drawer', open: true })}
            >
            <Scene
              key='chooseRoleScene'
              component={ChooseRoleScene}
              title='Choose Role'
            />
            <Scene
              key='naloResponderHomeScene'
              component={NaloResponderHomeScene}
              title='Find Naloxone'
            />
            <Scene
              key='naloResponderSourceScene'
              component={NaloResponderSourceScene}
              title='Find Naloxone'
            />
            <Scene
              key='naloResponderRequestScene'
              component={NaloResponderRequestScene}
              title='Find Naloxone'
            />
            <Scene
              key='naloProviderHomeScene'
              component={NaloProviderHomeScene}
              title='Deliver Naloxone'
            />
            <Scene
              key='naloProviderAcceptedRequestScene'
              component={NaloProviderAcceptedRequestScene}
              title='Deliver Naloxone'
            />
          </Scene>
        </Scene>
      </Router>
    );
  }

  handleNotification = (notification) => alert('Got notification');
}
