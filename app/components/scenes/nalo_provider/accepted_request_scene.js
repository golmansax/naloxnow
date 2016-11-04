import React, { Component } from 'react';
import { View } from '../../base';
import { openDirections } from './utils';

export class NaloProviderAcceptedRequestScene extends Component {
  componentDidMount() {
    openDirections();
  }

  render() {
    return <View />;
  }

}
