import React, { PropTypes, Component } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { View, Text, Image } from '../base';
import { titleFontStyle } from '../../styles/fonts';
import { getImage } from '../../lib/images';
import { stateHasBackButton } from './nav_utils';
import { AcceptedRequestAlert } from './accepted_request_alert';
import { RequestedRequestAlert } from './requested_request_alert';
import { provider } from '../../lib/data';
import { RequestStatus } from '../../lib/constants';
import { firebaseDB } from '../../lib/firebase';
import { superDarkGrey } from '../../styles/colors';
import { getGlobalState, setGlobalState } from '../../lib/global_state';
import { vr } from '../../styles/units';

const height = vr(1.5);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  withBackButton: {
    paddingLeft: vr(2),
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: vr(1.5) - 7,
    paddingLeft: vr(1),
  },

  logo: {
    height,
    width: Math.round((height / 165) * 200),
  },

  title: {
    ...titleFontStyle,
    fontSize: 20,
    paddingTop: 4,
    paddingLeft: 3,
  },

  alert: {
    marginTop: 5,
    shadowColor: superDarkGrey,
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
});

function statusToAlert(status) {
  switch (status) {
    case RequestStatus.ACCEPTED:
      return <AcceptedRequestAlert style={styles.alert} provider={provider} />;

    case RequestStatus.REQUESTED:
      return <RequestedRequestAlert style={styles.alert} />;

    default: return null;
  }
}

export class NavBarTitle extends Component {
  static propTypes = {
    hideBackImage: PropTypes.bool,
    navigationState: PropTypes.object.isRequired,
    showProviderAlert: PropTypes.bool.isRequired,
    titleStyle: Text.propTypes.style,
    titleWrapperStyle: View.propTypes.style,
  };

  static defaultProps = {
    showProviderAlert: true,
  };

  state = {
    status: null,
  };

  componentDidMount() {
    const cachedStatus = getGlobalState('cachedStatus');
    if (cachedStatus) {
      this.state.status = cachedStatus;
    }

    this.listener = firebaseDB().ref('request/status').on('value', (snapshot) => {
      const newStatus = snapshot.val();
      if (this.props.showProviderAlert &&
          newStatus === RequestStatus.ACCEPTED && newStatus !== this.state.status) {
        Alert.alert(
          'Naloxone request accepted',
          `Naloxone is on its way, and will be delivered in ${provider.time} minutes`,
        );
      }

      this.setState({ status: newStatus });
      setGlobalState('cachedStatus', newStatus);
    });
  }

  componentWillUnmount() {
    firebaseDB().ref('request/status').off('value', this.listener);
  }

  render() {
    const {
      titleWrapperStyle, titleStyle, navigationState, hideBackImage, showProviderAlert,
    } = this.props;
    const hasBackButton = stateHasBackButton(navigationState) && !hideBackImage;

    return (
      <View
        style={[styles.container, titleWrapperStyle]}
        >
        <View style={[styles.titleContainer, hasBackButton ? styles.withBackButton : null]}>
          <Image
            source={getImage('odrLogo')}
            style={styles.logo}
          />
          <Text style={[styles.title, titleStyle]}>ODResponse</Text>
        </View>
        {showProviderAlert && statusToAlert(this.state.status)}
      </View>
    );
  }
}
