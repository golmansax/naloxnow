import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { NaloResponderSourceListScene } from './scenes/nalo_responder/source_list_scene';
import { NaloResponderSourceInfoScene } from './scenes/nalo_responder/source_info_scene';
import { DrawerLayout } from './drawer_layout';

export const App = () => (
  <Router>
    <Scene key='drawer' component={DrawerLayout} open={false}>
      <Scene key='root' rightTitle='Settings' onRight={() => alert('Hello')}>
        <Scene
          key='naloResponderSourceListScene'
          component={NaloResponderSourceListScene}
          title='Find Naloxone'
        />
        <Scene
          key='naloResponderSourceInfoScene'
          component={NaloResponderSourceInfoScene}
          title='Find Naloxone'
        />
      </Scene>
    </Scene>
  </Router>
);
