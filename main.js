import Exponent from 'exponent';
import React from 'react';
import TabNavigator from 'react-native-tab-navigator';
import { FontAwesome } from '@exponent/vector-icons';
import { HomeScreen } from './screens/home_screen';
import { SecondScreen } from './screens/second_screen';

class App extends React.Component {
  state = {
    selectedTab: 'home',
  };

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title='Home'
          renderIcon={() => (
            <FontAwesome name='blind' size={32} color='green' />
          )}
          onPress={() => this.setState({ selectedTab: 'home' })}
          >
          <HomeScreen />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title='Profile'
          renderIcon={() => (
            <FontAwesome name='blind' size={32} color='green' />
          )}
          onPress={() => this.setState({ selectedTab: 'profile' })}
          >
          <SecondScreen />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

Exponent.registerRootComponent(App);
