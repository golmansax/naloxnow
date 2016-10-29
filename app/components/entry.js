import React, { Component, PropTypes } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Font } from 'exponent';
import { StyleSheet, DeviceEventEmitter } from 'react-native';
import { ChooseRoleScene } from './scenes/choose_role_scene';
import { NaloRequestorHomeScene } from './scenes/nalo_requestor/home_scene';
import { NaloRequestorSourceScene } from './scenes/nalo_requestor/source_scene';
import { NaloRequestorRequestScene } from './scenes/nalo_requestor/request_scene';
import { NaloProviderHomeScene } from './scenes/nalo_provider/home_scene';
import { NaloProviderAcceptedRequestScene } from './scenes/nalo_provider/accepted_request_scene';
import { DrawerLayout } from './layouts/drawer_layout';
import { nnBlue, white } from '../styles/colors';
import { vr } from '../styles/units';
import { mainFontStyle } from '../styles/fonts';
import { AppLoading } from './base';

const NAVBAR_HEIGHT = vr(4);
const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: NAVBAR_HEIGHT,
  },

  navBar: {
    backgroundColor: nnBlue,
    height: NAVBAR_HEIGHT,
  },

  navBarText: {
    ...mainFontStyle,
    color: white,
  },
});

export class Entry extends Component {
  static propTypes = {
    exp: PropTypes.shape({
      notification: PropTypes.object,
    }).isRequired,
  };

  state = {
    isReady: false,
  };

  async componentWillMount() {
    // Handle notifications that are received or selected while the app
    // is open
    this.removeListener = DeviceEventEmitter.addListener(
      'Exponent.notification', this.handleNotification
    );

    // Handle notifications that are received or selected while the app
    // is closed, and selected in order to open the app.
    // `exp` is a special prop that is only available on your app's
    // root component -- the one that is registered with `AppRegistry`
    // as main.
    if (this.props.exp.notification) {
      this.handleNotification(this.props.exp.notification);
    }

    await Font.loadAsync({
      // eslint-disable-next-line global-require
      'noto-sans': require('../assets/fonts/NotoSans-Regular.ttf'),
    });

    this.setState({ isReady: true });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    const defaultProps = {
      drawerImage: null,
      navigationBarStyle: styles.navBar,
      title: 'NaloxoneNow',
      titleStyle: styles.navBarText,
      rightButtonTextStyle: styles.navBarText,
      sceneStyle: styles.content,
    };

    return (
      <Router>
        <Scene
          key='drawer'
          component={DrawerLayout}
          open={false}
          >
          <Scene
            key='root'
            rightTitle='Menu'
            onRight={() => Actions.refresh({ key: 'drawer', open: true })}
            >
            <Scene
              {...defaultProps}
              key='chooseRoleScene'
              component={ChooseRoleScene}
            />
            <Scene
              {...defaultProps}
              key='naloRequestorHomeScene'
              component={NaloRequestorHomeScene}
              renderBackButton={() => false}
            />
            <Scene
              {...defaultProps}
              key='naloRequestorSourceScene'
              component={NaloRequestorSourceScene}
            />
            <Scene
              {...defaultProps}
              key='naloRequestorRequestScene'
              component={NaloRequestorRequestScene}
            />
            <Scene
              {...defaultProps}
              key='naloProviderHomeScene'
              component={NaloProviderHomeScene}
            />
            <Scene
              {...defaultProps}
              key='naloProviderAcceptedRequestScene'
              component={NaloProviderAcceptedRequestScene}
              duration={1}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }

  handleNotification = (notification) => alert(`Got notification: ${notification.message}`);
}
