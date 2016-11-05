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

  contentWithSmallAlert: {
    marginTop: vr(2),
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

function statusToStyle(status) {
  switch (status) {
    case RequestStatus.ACCEPTED:
      return styles.contentWithAlert;

    case RequestStatus.REQUESTED:
      return styles.contentWithSmallAlert;

    default: return null;
  }
}

export class RequestAlertLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    style: View.propTypes.style,
  };

  state = {
    alertStyle: null,
  };

  componentDidMount() {
    const cachedStatus = getGlobalState('cachedStatus');
    if (cachedStatus) {
      this.state.alertStyle = statusToStyle(cachedStatus);
    }

    this.listener = firebaseDB().ref('request/status').on('value', (snapshot) => {
      const newStatus = snapshot.val();
      this.setState({
        alertStyle: statusToStyle(newStatus),
      });
      setGlobalState({ cachedStatus: newStatus });
    });
  }

  componentWillUnmount() {
    firebaseDB().ref('request/status').off('value', this.listener);
  }

  render() {
    const { style, children } = this.props;
    const { alertStyle } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={[styles.content, alertStyle]}
          contentContainerStyle={[styles.contentContainer, style]}
          >
          {children}
        </ScrollView>
      </View>
    );
  }
}
