import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { firebaseAuth } from '../lib/firebase';
import { AppLoading } from './base';
import { NaloResponderSourceListScene } from './scenes/nalo_responder/source_list_scene';
import { NaloResponderSourceScene } from './scenes/nalo_responder/source_scene';
import { NaloResponderRequestScene } from './scenes/nalo_responder/request_scene';
import { NaloProviderScene } from './scenes/nalo_provider_scene';
import { DrawerLayout } from './layouts/drawer_layout';

export class Entry extends Component {
  state = {
    isReady: false,
  };

  componentWillMount() {
    // Anonymous sign in so we can have access to database
    firebaseAuth().signInAnonymously()
      .then(() => this.setState({ isReady: true }))
      .catch((err) => alert(err.message));
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
              key='naloResponderSourceListScene'
              component={NaloResponderSourceListScene}
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
            <Scene key='naloProvider' component={NaloProviderScene} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
