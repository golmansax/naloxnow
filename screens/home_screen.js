import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from 'apsl-react-native-button';

export class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello!</Text>
        <Button>Find Naloxone now!</Button>
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
