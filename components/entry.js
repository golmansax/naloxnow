import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { NaloResponderSourceListScene } from './scenes/nalo_responder/source_list_scene';
import { NaloResponderSourceScene } from './scenes/nalo_responder/source_scene';
import { NaloResponderRequestScene } from './scenes/nalo_responder/request_scene';
import { NaloProviderScene } from './scenes/nalo_provider_scene';
import { DrawerLayout } from './layouts/drawer_layout';

export const Entry = () => (
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
