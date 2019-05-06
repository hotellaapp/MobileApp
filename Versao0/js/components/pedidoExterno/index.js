
import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, ActivityIndicator, ScrollView, Alert, Image } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import Switch from 'react-native-switch-pro'

import significadosHelper from '../../utils/Significados.js'
import { strings } from '../../../locales/i18n';
import styles from '../../styles/Tabs';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme,
  RkModalImg,
  RkImage,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';



export default class PedidoExterno extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,


  });

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true

    }

    this.getButton = this.getButton.bind(this)
  }





  componentDidMount() {
    var idPedido = `https://hotella.herokuapp.com/api/servico/${this.props.navigation.state.params.id}`;

    return fetch(idPedido)
      .then((response) => response.json())
      .then((responseJson) => {


        this.setState({
          isLoading: false,
          preco: responseJson.preco.toString(),
          estadoP: responseJson.estado.toString(),
          texto: 'Nada',
          reqName: 'NoName',
          reqContacto: '123456789'

        }, function () {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  sendRequest = async () => {

    const response = await fetch('https://hotella.herokuapp.com/api/pedidoexterno/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          nome: this.state.reqName,
          idservico: this.props.navigation.state.params.id,
          descricao: this.state.texto,
          contacto: this.state.reqContacto
        })
      ,
    }).catch((error) => {

      console.error(error);
    });;

    if (response.status == 200)
      Alert.alert(
        strings('pedidoExt.Confirm_title'),
        strings('pedidoExt.Confirm_text')

      )
  }


  getTextComent(textoCom) {

    var load = this.state.isLoading;
    var contacto = this.state.reqContacto;
    var nome = this.state.reqName;
    states = {
      isLoading: load,
      reqName: nome,
      reqContacto: contacto,
      texto: textoCom
    };
    this.setState(states);
  }
  getTextContact(textoC) {

    var load = this.state.isLoading;
    var comment = this.state.texto;
    var nome = this.state.reqName;
    states = {
      isLoading: load,
      texto: comment,
      reqName: nome,
      reqContacto: textoC
    };
    this.setState(states);
  }
  getTextName(textoN) {

    var load = this.state.isLoading;
    var comment = this.state.texto;
    var contacto = this.state.reqContacto;
    states = {
      isLoading: load,
      texto: comment,
      reqContacto: contacto,
      reqName: textoN
    };
    this.setState(states);
  }


  getButton() {

    return (
      <RkButton rkType='large' style={{ width: '100%' }}
        onPress={() => Alert.alert(
          strings('pedidoExt.Choice_title'),
          '',
          [
            { text: strings('pedidoExt.Choice_NO'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: strings('pedidoExt.Choice_YES'), onPress: () => this.sendRequest() },
          ],
          { cancelable: false }
        )


        }

      >{strings('pedidoExt.button_title')}
      </RkButton>)

  }


  render() {


    if (this.state.isLoading) {
      return (
        <View style={styles.loadContainer}>
          <ActivityIndicator
            color='#00ffff'
            size="large"
            style={styles.activityIndicator} />
        </View>
      );
    }
    return (

      <View behavior='position'
        style={styles.PediroReq_screen}>
        <ScrollView contentContainerStyle={styles.PediroReq_content}>
          <View style={[styles.PediroReq_row, styles.heading]}>
            <RkTextInput label={strings('pedidoExt.state')} labelStyle={{ color: 'white', fontFamily: 'Roboto-Regular' }}
              value={significadosHelper.giveStateRequest(this.state.estadoP)}
              rkType='right clear'
              editable={false} />
          </View>
          <View style={[styles.PediroReq_row, styles.heading]}>
            <RkTextInput label={strings('pedidoExt.price')} labelStyle={{ color: 'white', fontFamily: 'Roboto-Regular' }}
              value={significadosHelper.givePreco(this.state.preco)}

              rkType='right clear'
              editable={false}
            />
          </View>
          <View style={styles.PediroReq_row} >
          <RkButton rkType='right clear' style={{ backgroundColor: styles.background, width: 70 ,right:10}}>
              <Image
                style={{ width: 70, height: 35 }}
                key={13}
                source={require('../../../images/MBWay.png')} />
            </RkButton>
      
        
            <RkButton style={{ backgroundColor: styles.background, width: 60 ,right:0}}>
              <Image
                style={{ width: 60, height: 40 }}
                key={14}
                source={require('../../../images/Paypal-icon.png')} />
            </RkButton>

            <RkButton rkType='right clear' style={{ backgroundColor: styles.background, width: 60 ,right:-10}}>
              <Image
                style={{ width: 70, height: 35 }}
                key={15}
                source={require('../../../images/Visa.png')} />
            </RkButton>
      
            
          </View>


          <RkText rkType='primary4' style={{ color: 'white', fontFamily: 'Roboto-Regular', fontSize: 20, paddingTop: '10%' }}>{strings('pedidoExt.Name')} 💬</RkText>
          <RkTextInput
            placeholder={strings('pedidoExt.placeholder_Name')}
            onChangeText={this.getTextName.bind(this)}
            rkType='clear'
          />
          <RkText rkType='primary4' style={{ color: 'white', fontFamily: 'Roboto-Regular', fontSize: 20, paddingTop: '10%' }}>{strings('pedidoExt.Contact')} 💬</RkText>
          <RkTextInput
            placeholder={strings('pedidoExt.placeholder_Contact')}
            onChangeText={this.getTextContact.bind(this)}
            rkType='clear'
            props={{ keyboardType: 'phone-pad' }}
          />

          <RkText rkType='primary4' style={{ color: 'white', fontFamily: 'Roboto-Regular', fontSize: 20, paddingTop: '10%' }}>{strings('pedidoExt.comment')} 💬</RkText>
          <RkTextInput
            placeholder={strings('pedidoExt.placeholder')}
            onChangeText={this.getTextComent.bind(this)}
            rkType='clear' multiline={true} numberOfLines={3}
            props={{ keyboardType: 'phone-pad' }}
          />
        </ScrollView>
        <View style={styles.PediroReq_footer} >
          {this.getButton()}

        </View>
      </View>
    );
  }

}

