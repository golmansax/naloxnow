import Exponent from 'exponent';
import React from 'react';
import { Scene, Router, NavBar } from 'react-native-router-flux';
import { ResponderScene } from './scenes/responder_scene';

const App = () => (
  <Router>
    <Scene key='root' rightTitle='Settings' onRight={() => alert('Hello')}>
      <Scene key='responder' component={ResponderScene} title='Responder' />
    </Scene>
  </Router>
);

Exponent.registerRootComponent(App);
