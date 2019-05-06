import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Alert,
  View,
  Image,
  Keyboard,
  AsyncStorage
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkTextInput,
  RkTheme
} from 'react-native-ui-kitten';
import { GradientButton } from '../../components/';
import { scale, scaleModerate, scaleVertical } from '../../utils/scale';
import Orientation from 'react-native-orientation';
import { strings } from '../../../locales/i18n';
import styles from '../../styles/Tabs';
hotellaLogo = require('../../../images/Logo_wBackgorund.png');

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this._orientationDidChange = this._orientationDidChange.bind(this)
  }
  componentWillMount() {

    this.state = {
      name: '',
      orientation: 0
    };

  }
  componentDidMount() {

    Orientation.addOrientationListener(this._orientationDidChange);
  }


  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {

      var temp = nome = this.state.name;
      states = {
        name: temp,
        orientation: 1
      };
      this.setState(states);
    } else {
      var temp = nome = this.state.name;
      states = {
        name: temp,
        orientation: 0
      };
      this.setState(states);
    }
  }


  checkLog = async (name) => {
    
    
    if (name == '') {
      Alert.alert("Campo de código vazio!!");
    }
    else {
      const response = await fetch('https://hotella.herokuapp.com/api/client/login', {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Content-type': 'text/plain'
        },
        body: name
      });
      const validade = JSON.parse(response._bodyText);
      if (validade.status != "Cliente não encontrado") {
        if (validade.status != "Codigo invalido") { 
          id = validade.status.trim();
          this.props.navigation.navigate('Tab', { idCliente: id });
        }
        else {
          Alert.alert("Código Inválido!");
        }
      }
      else {
        Alert.alert("Código Errado!");
      }
    }
  }


  render() {

    if (this.state.orientation == 1) {

      return (
        <View
          style={styles.Login_screenHorizontal}
          onStartShouldSetResponder={(e) => true}
          onResponderRelease={(e) => Keyboard.dismiss()}>

          <View style={styles.Login_header}>
            <Image source={hotellaLogo} style={styles.Login_Horizontalimage} />
          </View>
          <View style={styles.Login_Horizontalcontent} >
            <RkTextInput rkType='rounded' placeholder={strings('login.placeholder')}
              onChangeText={(name) => this.setState({ name })} />
            <RkText rkType='secondary5 center'>
              {strings('login.info')}
            </RkText>

            <GradientButton rkType='large' text={strings('login.unlock_button')}
              onPress={() => this.checkLog(this.state.name)} />
            <GradientButton rkType='large' text={strings('login.hotel_button')}
              //onPress={() => Alert.alert(this.state.name)} />
              onPress={() => this.props.navigation.navigate('Hotels')} />



          </View>
        </View>


      )


    }

    return (
      <View behavior='position'
        style={styles.Login_screen}
        onStartShouldSetResponder={(e) => true}
        onResponderRelease={(e) => Keyboard.dismiss()}>
        <View style={styles.Login_header}>
          <Image key={1} source={hotellaLogo} style={styles.Login_image} />
        </View>
        <View style={styles.Login_content}>
          <RkTextInput rkType='rounded' placeholder={strings('login.placeholder')}
            onChangeText={(name) => this.setState({ name })} />
          <RkText rkType='secondary5 center'>
            {strings('login.info')}
          </RkText>
        </View>
        <GradientButton style={styles.Login_save} rkType='large' text={strings('login.unlock_button')}
          onPress={() => this.checkLog(this.state.name)} />
        <GradientButton rkType='large' text={strings('login.hotel_button')}
          //onPress={() => Alert.alert(this.state.name)} />
          onPress={() => this.props.navigation.navigate('Hotels')} />
      </View>
    )


  }
}

const LoginSwag = reduxForm(
  {
    form: 'test',
  },
  (dispatch) => ({
    setUser: name => dispatch(setUser(name)),
  })
)(Login);
LoginSwag.navigationOptions = {
  header: null,
};




export default LoginSwag;