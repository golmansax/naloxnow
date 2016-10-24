import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { NaloResponderSourceListScene } from './scenes/nalo_responder/source_list_scene';
import { NaloResponderSourceInfoScene } from './scenes/nalo_responder/source_info_scene';

export const App = () => (
  <Router>
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
  </Router>
);
