import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Components } from 'exponent';
import Button from 'apsl-react-native-button';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello!</Text>
        <Button>Press me</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bebebe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Exponent.registerRootComponent(App);
