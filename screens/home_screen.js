import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from 'apsl-react-native-button';
import NavigationBar from 'react-native-navbar';

export class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={{ title: 'Home' }} style={styles.navbar} />
        <View style={styles.content}>
          <Text>Hello!</Text>
          <Button>Find Naloxone now!</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },

  navbar: {
    height: 50,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
