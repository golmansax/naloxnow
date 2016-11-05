import React, { PropTypes, Component } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { View } from '../base';
import { RequestStatus } from '../../lib/constants';
import { firebaseDB } from '../../lib/firebase';
import { getGlobalState, setGlobalState } from '../../lib/global_state';
import { vr, navbarHeight, tabHeight } from '../../styles/units';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  contentWithAlert: {
    marginTop: vr(6),
  },

  alert: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  contentContainer: {
    minHeight: height - navbarHeight - tabHeight,
  },
});

export class RequestAlertLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    style: View.propTypes.style,
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
    const { style, children } = this.props;
    const { showAlert } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={[styles.content, showAlert ? styles.contentWithAlert : null]}
          contentContainerStyle={[styles.contentContainer, style]}
          >
          {children}
        </ScrollView>
      </View>
    );
  }
}
