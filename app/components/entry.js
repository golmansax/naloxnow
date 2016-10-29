import React, { Component, PropTypes } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Font } from 'exponent';
import { StyleSheet, DeviceEventEmitter } from 'react-native';
import { ChooseRoleScene } from './scenes/choose_role_scene';
import { NaloRequestorHomeScene } from './scenes/nalo_requestor/home_scene';
import { NaloRequestorRequestScene } from './scenes/nalo_requestor/request_scene';
import { NaloProviderHomeScene } from './scenes/nalo_provider/home_scene';
import { NaloProviderAcceptedRequestScene } from './scenes/nalo_provider/accepted_request_scene';
import { DrawerLayout } from './layouts/drawer_layout';
import { nnBlue, white, lightGrey } from '../styles/colors';
import { mainFontStyle } from '../styles/fonts';
import { pressedOpacity, vr } from '../styles/units';
import { Test } from './test';
import { AppLoading } from './base';
import { Tab } from './layouts/tab';

const NAVBAR_HEIGHT = vr(3);
const TAB_HEIGHT = vr(3);
const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: NAVBAR_HEIGHT,
  },

  tabContent: {
    paddingBottom: NAVBAR_HEIGHT + TAB_HEIGHT,
  },

  navBar: {
    backgroundColor: nnBlue,
    height: NAVBAR_HEIGHT,
  },

  tabBar: {
    backgroundColor: lightGrey,
    height: TAB_HEIGHT,
    borderTopWidth: 1,
    borderColor: white,
  },

  tabContainer: {
    borderColor: white,
    borderRightWidth: 1,
  },

  navBarContent: {
    color: white,
  },

  navBarText: {
    ...mainFontStyle,
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

    const defaultSceneProps = {
      drawerImage: null,
      navigationBarStyle: styles.navBar,
      title: 'NaloxoneNow',
      titleStyle: [styles.navBarContent, styles.navBarText],
      rightButtonTextStyle: [styles.navBarContent, styles.navBarText],
      sceneStyle: styles.content,
    };

    const tabSceneProps = {
      ...defaultSceneProps,
      sceneStyle: [styles.content, styles.tabContent],
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
              {...defaultSceneProps}
              key='chooseRoleScene'
              component={ChooseRoleScene}
            />
            <Scene
              key='naloRequestor'
              tabBarStyle={styles.tabBar}
              tabBarIconContainerStyle={styles.tabContainer}
              tabs
              hideNavBar
              pressOpacity={pressedOpacity}
              >
              <Scene
                key='overdoseToolkit'
                title='Overdose Toolkit'
                icon={Tab}
                >
                <Scene key='toolkitStep1' component={Test} />
              </Scene>
              <Scene
                key='naloxoneNow'
                title='NaloxoneNow'
                icon={Tab}
                initial
                >
                <Scene
                  {...tabSceneProps}
                  initial
                  key='naloRequestorHomeScene'
                  component={NaloRequestorHomeScene}
                  rnderBackButton={() => false}
                />
                <Scene
                  {...tabSceneProps}
                  key='naloRequestorRequestScene'
                  component={NaloRequestorRequestScene}
                />
                <Scene
                  {...tabSceneProps}
                  key='naloProviderHomeScene'
                  component={NaloProviderHomeScene}
                />
                <Scene
                  {...tabSceneProps}
                  key='naloProviderAcceptedRequestScene'
                  component={NaloProviderAcceptedRequestScene}
                  duration={1}
                />
              </Scene>
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }

  handleNotification = (notification) => alert(`Got notification: ${notification.message}`);
}
