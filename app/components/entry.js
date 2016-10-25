import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { DeviceEventEmitter } from 'react-native';
import { firebaseAuth } from '../lib/firebase';
import { getPushTokenAsync } from '../lib/push_notifications';
import { setGlobalState } from '../lib/global_state';
import { AppLoading } from './base';
import { NaloResponderHomeScene } from './scenes/nalo_responder/home_scene';
import { NaloResponderSourceScene } from './scenes/nalo_responder/source_scene';
import { NaloResponderRequestScene } from './scenes/nalo_responder/request_scene';
import { NaloProviderHomeScene } from './scenes/nalo_provider/home_scene';
import { NaloProviderAcceptedRequestScene } from './scenes/nalo_provider/accepted_request_scene';
import { DrawerLayout } from './layouts/drawer_layout';

export class Entry extends Component {
  state = {
    isReady: false,
  };

  componentWillMount() {
    Promise
      .all([
        // Anonymous sign in so we can have access to database
        firebaseAuth().signInAnonymously()
          .then((user) => setGlobalState('user', user)),
        getPushTokenAsync()
          .then((token) => setGlobalState('pushToken', token)),
      ])
      .then(() => this.setState({ isReady: true }))
      .catch((err) => alert(err.message));

    // Handle notifications that are received or selected while the app
    // is open
    this._notificationSubscription = DeviceEventEmitter.addListener(
      'Exponent.notification', this._handleNotification
    );

    // Handle notifications that are received or selected while the app
    // is closed, and selected in order to open the app.
    // `exp` is a special prop that is only available on your app's
    // root component -- the one that is registered with `AppRegistry`
    // as main.
    if (this.props.exp.notification) {
      this._handleNotification(this.props.exp.notification);
    }
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

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
              initial
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

  handleNotification = (notification) => {
    alert('Got notification');
    console.log(notification);
  };
}
