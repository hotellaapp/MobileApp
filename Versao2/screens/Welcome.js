import React, { Component } from 'react';
import { Dimensions, Image, FlatList, Modal, StyleSheet, Text, Animated } from 'react-native';

// import { Button, Block, Text } from '../components';
import { theme } from '../constants';

const { width, height } = Dimensions.get('window');

class Welcome extends Component {
  static navigationOptions = {
    header: null,
  }

  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
  }
  
  render() {
    const { navigation } = this.props;

    return (
      <Text style={styles.welcome}>Welcome to React Native!</Text>
    )
  }
}

export default Welcome;

const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
})