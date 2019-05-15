import React, { Component } from 'react';
import { Dimensions, Image, FlatList, Modal, StyleSheet, Animated, Text, View } from 'react-native';
// import { RkStyleSheet, RkText, RkTextInput, RkTheme} from 'react-native-ui-kitten';
// import Orientation from 'react-native-orientation';

//import { Button, Block, Text } from '../components';
import { theme } from '../constants';
import Images from '../assets/images';
import {translation} from '../assets/i18n/index';

//const { width, height } = Dimensions.get('window');


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
      <View style={styles.Login_header}>
        <Text>{translation('login.info')}</Text>
        <Image key={1} source={Images.welcome.hotellaLogo} />
      </View>
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
  Login_screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 200,
    justifyContent: 'space-between',
    backgroundColor: '#3BA2DC'
  }
})