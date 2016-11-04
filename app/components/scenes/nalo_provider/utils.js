import { Platform, Linking } from 'react-native';
import URI from 'urijs';
import { locationToString } from '../../../lib/utils';
import { provider, requestor } from '../../../lib/data';

export async function openDirections() {
  const url = (() => {
    const { OS } = Platform;

    switch (OS) {
      case 'ios':
        return new URI('https://maps.apple.com')
          .search({
            saddr: locationToString(provider.location),
            daddr: locationToString(requestor.location),
          })
          .toString();

      default: throw new Error(`Directions url not specified for OS: ${OS}`);
    }
  })();

  if (!Linking.canOpenURL(url)) {
    throw new Error(`Cannot link to URL: ${url}`);
  }

  return Linking.openURL(url);
}
