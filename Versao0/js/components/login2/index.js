import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Alert,
  View,
  Image,
  Keyboard
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkButton,
  RkTextInput,
  RkTheme
} from 'react-native-ui-kitten';
import { GradientButton } from '../../components/';
import { scale, scaleModerate, scaleVertical } from '../../utils/scale';

import { strings } from '../../../locales/i18n';

hotellaLogo = require('../../../images/hotellaLogo.png');

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
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
        if (validade.status != "Codigo invalido") { //mudar quando a BD tiveer dados
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
    return (
      RkTheme.setType('RkButton', 'hotella', {
        backgroundColor: '#3BA2DB',
        width: '98%',
        }),
        RkTheme.setType('RkText','white',{
          text:{
            color:'white',
          }
        }),
      <View behavior='position'
        style={styles.screen}
        onStartShouldSetResponder={(e) => true}
        onResponderRelease={(e) => Keyboard.dismiss()}>
        <View style={styles.header}>
          <Image source={hotellaLogo} style={styles.image} />
        </View>
        <View style={styles.content}>
          <RkTextInput rkType='rounded' placeholder={strings('login.placeholder')}
            onChangeText={(name) => this.setState({ name })} />
          <RkText rkType='secondary5 center white'>
            {strings('login.info')}
          </RkText>
          <RkButton rkType='rounded large hotella' style={styles.save}
            onPress={() => this.checkLog(this.state.name)}> {strings('login.unlock_button')} </RkButton>
          <RkButton rkType='rounded large hotella' style={styles.save}
            //onPress={() => Alert.alert(this.state.name)} />
            onPress={() => this.props.navigation.navigate('Hotels')}> {strings('login.hotel_button')}</RkButton>
        </View >
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

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: scaleVertical(24),
    justifyContent: 'space-between',
    backgroundColor: '#282828'
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#282828'
  },
  save: {
    marginVertical: 20,
  },
  image: {
    marginVertical: scaleVertical(17),
    height: scaleVertical(200),
    resizeMode: 'contain'
  },
  content: {
    alignItems: 'center'
  }
}));


export default LoginSwag;
