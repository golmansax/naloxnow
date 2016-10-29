import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Button } from '../../base';
import { firebaseDB } from '../../../lib/firebase';
import { RequestStatus } from '../../../lib/constants';

export class NaloProviderHomeScene extends Component {
  static propTypes = {
    request: PropTypes.object.isRequired,
  };

  static defaultProps = {
    request: {},
  };

  componentWillMount() {
    this.listener = firebaseDB().ref('request').on('value', (snapshot) => {
      const newRequest = snapshot.val();
      if (newRequest.status !== this.props.request.status) {
        Actions.refresh({ request: newRequest });
      }
    });
  }

  componentWillUnmount() {
    firebaseDB().database().off(this.listener);
  }

  render() {
    const { request } = this.props;
    const { status, source } = request;

    return (
      <View>
        <Text>Provider</Text>
        {status === RequestStatus.REQUESTED ? (
          <View>
            <Text>REQUEST</Text>
            <Text>{source.title}</Text>
            <Button onPress={this.acceptRequest}>Deliver Naloxone</Button>
          </View>
        ) : null}
      </View>
    );
  }

  acceptRequest = () => {
    firebaseDB().ref('request/status').set(RequestStatus.ACCEPTED);
    Actions.naloProviderAcceptedRequestScene();
  };
}
