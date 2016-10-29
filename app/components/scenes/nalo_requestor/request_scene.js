import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
} from '../../base';
import { firebaseDB } from '../../../lib/firebase';

export class NaloRequestorRequestScene extends Component {
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
        Actions.naloRequestorRequestScene({ request });
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
      <View>
        <Text>REQUEST</Text>
        <Text>{source.title}</Text>
        <Text>{source.subtitle}</Text>
        <Text>{request.status}</Text>
      </View>
    );
  }
}
