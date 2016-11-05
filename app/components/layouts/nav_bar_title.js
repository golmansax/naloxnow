import React, { PropTypes, Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Image } from '../base';
import { titleFontStyle } from '../../styles/fonts';
import { getImage } from '../../lib/images';
import { stateHasBackButton } from './nav_utils';
import { RequestAlert } from './request_alert';
import { provider } from '../../lib/data';
import { RequestStatus } from '../../lib/constants';
import { firebaseDB } from '../../lib/firebase';
import { getGlobalState, setGlobalState } from '../../lib/global_state';
import { vr } from '../../styles/units';
import { white } from '../../styles/colors';

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
    marginTop: 3,
    backgroundColor: white,
  },
});

export class NavBarTitle extends Component {
  static propTypes = {
    hideBackImage: PropTypes.bool,
    navigationState: PropTypes.object.isRequired,
    titleStyle: Text.propTypes.style,
    titleWrapperStyle: View.propTypes.style,
  };

  state = {
    showAlert: false,
  };

  componentDidMount() {
    const cachedStatus = getGlobalState('cachedStatus');
    if (cachedStatus) {
      this.state.showAlert = (cachedStatus === RequestStatus.ACCEPTED);
    }

    this.listener = firebaseDB().ref('request/status').on('value', (snapshot) => {
      const newStatus = snapshot.val();
      this.setState({ showAlert: (newStatus === RequestStatus.ACCEPTED) });
      setGlobalState({ cachedStatus: newStatus });
    });
  }

  componentWillUnmount() {
    firebaseDB().ref('request/status').off('value', this.listener);
  }

  render() {
    const { titleWrapperStyle, titleStyle, navigationState, hideBackImage } = this.props;
    const hasBackButton = stateHasBackButton(navigationState) && !hideBackImage;
    const { showAlert } = this.state;

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
        {showAlert ? <RequestAlert style={styles.alert} provider={provider} /> : null}
      </View>
    );
  }
}
