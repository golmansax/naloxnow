import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
} from '../../base';
import { white } from '../../../styles/colors';
import { firebaseDB } from '../../../lib/firebase';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: 60,
    backgroundColor: white,
  },
});

export class NaloResponderRequestScene extends Component {
  static propTypes = {
    request: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.listener = firebaseDB().ref('request/status').on('value', (snapshot) => {
      const newStatus = snapshot.val();
      if (newStatus !== this.props.request.status) {
        const request = Object.assign({}, this.props.request, {
          status: newStatus,
        });
        Actions.naloResponderRequestScene({ request });
      }
    });
  }

  componentWillUnmount() {
    firebaseDB().database().off(this.listener);
  }

  render() {
    const { request } = this.props;
    const { source } = request;

    return (
      <View style={styles.content}>
        <Text>REQUEST</Text>
        <Text>{source.title}</Text>
        <Text>{source.subtitle}</Text>
        <Text>{request.status}</Text>
      </View>
    );
  }
}
