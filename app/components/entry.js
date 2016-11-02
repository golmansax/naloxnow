import React, { Component, PropTypes } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { StyleSheet, DeviceEventEmitter } from 'react-native';
import { ChooseRoleScene } from './scenes/choose_role_scene';
import { NaloRequestorHomeScene } from './scenes/nalo_requestor/home_scene';
import { NaloRequestorAcceptedRequestScene } from './scenes/nalo_requestor/accepted_request_scene';
import { NaloProviderHomeScene } from './scenes/nalo_provider/home_scene';
import { NaloProviderAcceptedRequestScene } from './scenes/nalo_provider/accepted_request_scene';
import { DrawerLayout } from './layouts/drawer_layout';
import { nnBlue, white, lightGrey } from '../styles/colors';
import { mainFontStyle } from '../styles/fonts';
import { pressedOpacity, vr } from '../styles/units';
import { OverdoseToolkitCall911Scene } from './scenes/overdose_toolkit/call_911_scene';
import {
  OverdoseToolkitObtainNaloxoneScene,
} from './scenes/overdose_toolkit/obtain_naloxone_scene';
import { AppLoading } from './base';
import { completeAppPrerequisites } from '../lib/prerequisites';
import { Tab } from './layouts/tab';

const NAVBAR_HEIGHT = vr(3);
const TAB_HEIGHT = vr(3);
const styles = StyleSheet.create({
  content: {
    flex: 1,
    top: NAVBAR_HEIGHT,
    paddingBottom: NAVBAR_HEIGHT,
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

  navBarHiddenText: {
    color: nnBlue,
  },
});

function handleNotification(notification) {
  console.log(notification); // eslint-disable-line no-console
}

export class Entry extends Component {
  static propTypes = {
    exp: PropTypes.shape({
      notification: PropTypes.object,
    }).isRequired,
  };

  state = {
    isReady: false,
  };

  componentWillMount() {
    // Handle notifications that are received or selected while the app
    // is open
    this.removeListener = DeviceEventEmitter.addListener(
      'Exponent.notification', handleNotification
    );

    // Handle notifications that are received or selected while the app
    // is closed, and selected in order to open the app.
    // `exp` is a special prop that is only available on your app's
    // root component -- the one that is registered with `AppRegistry`
    // as main.
    if (this.props.exp.notification) {
      handleNotification(this.props.exp.notification);
    }

    completeAppPrerequisites().then(() => this.setState({ isReady: true }));
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
      rightButtonTextStyle: [styles.navBarHiddenText],
      sceneStyle: styles.content,
      rightTitle: 'Menu',
      onRight: () => Actions.refresh({ key: 'drawer', open: true }),
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
          <Scene key='drawerContent'>
            <Scene
              key='naloRequestor'
              tabBarStyle={styles.tabBar}
              tabBarIconContainerStyle={styles.tabContainer}
              tabs
              hideNavBar
              pressOpacity={pressedOpacity}
              duration={1}
              >
              <Scene
                {...defaultSceneProps}
                key='chooseRoleScene'
                component={ChooseRoleScene}
                hideTabBar
              />
              <Scene
                key='overdoseToolkit'
                title='Overdose Toolkit'
                icon={Tab}
                >
                <Scene
                  {...tabSceneProps}
                  key='toolkitCall911Scene'
                  component={OverdoseToolkitCall911Scene}
                  renderBackButton={() => false}
                />
                <Scene
                  {...tabSceneProps}
                  key='toolkitObtainNaloxoneScene'
                  component={OverdoseToolkitObtainNaloxoneScene}
                />
              </Scene>
              <Scene
                key='naloxoneNow'
                title='NaloxoneNow'
                icon={Tab}
                >
                <Scene
                  {...tabSceneProps}
                  key='naloRequestorHomeScene'
                  component={NaloRequestorHomeScene}
                />
                <Scene
                  {...tabSceneProps}
                  key='naloRequestorAcceptedRequestScene'
                  component={NaloRequestorAcceptedRequestScene}
                  renderBackButton={() => false}
                  initial
                />
              </Scene>
            </Scene>
            <Scene
              key='naloProvider'
              duration={1}
              >
              <Scene
                {...defaultSceneProps}
                key='naloProviderHomeScene'
                component={NaloProviderHomeScene}
                renderBackButton={() => false}
              />
              <Scene
                {...defaultSceneProps}
                key='naloProviderAcceptedRequestScene'
                component={NaloProviderAcceptedRequestScene}
                duration={1}
              />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}
