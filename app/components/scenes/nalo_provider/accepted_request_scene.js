import React, { Component } from 'react';
import URI from 'urijs';
import { Linking } from 'react-native';
import { View } from '../../base';
import { providerLocation, responderLocation } from '../../../lib/data';
import { locationToString } from '../../../lib/utils';

async function openDirections() {
  const url = new URI('https://maps.apple.com')
    .search({
      saddr: locationToString(providerLocation),
      daddr: locationToString(responderLocation),
    })
    .toString();

  if (!Linking.canOpenURL(url)) {
    throw new Error(`Cannot link to URL: ${url}`);
  }

  return Linking.openURL(url);
}

export class NaloProviderAcceptedRequestScene extends Component {
  componentDidMount() {
    openDirections();
  }

  render() {
    return <View />;
  }

}
