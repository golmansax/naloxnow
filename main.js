import Exponent from 'exponent';
import React from 'react';
import { Scene, Router, NavBar } from 'react-native-router-flux';
import { ResponderScreen } from './screens/responder_screen';
import { SecondScreen } from './screens/second_screen';

const App = () => (
  <Router>
    <Scene key='root' rightTitle='Settings' onRight={() => alert('Hello')}>
      <Scene key='responder' component={ResponderScreen} title='Responder' />
    </Scene>
  </Router>
);

Exponent.registerRootComponent(App);
