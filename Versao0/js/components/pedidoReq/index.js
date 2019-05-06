
import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, ActivityIndicator, Alert, Image, Keyboard, ScrollView } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

import significadosHelper from '../../utils/Significados.js'
import { strings } from '../../../locales/i18n';
import { FontIcons, FontAwesome } from '../../../assets/icons';
import styles from '../../styles/Tabs';
import { scale, scaleModerate, scaleVertical } from '../../utils/scale';
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
//import styles from '../../styles/Tabs';
avatar = { uri: 'https://m.danmurphys.com.au/media/DM/Product/308x385/91241_0_9999_med_v1_m56577569855162866.png' };

export default class PedidoReq extends React.Component {

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
          texto: 'Sem Descrição',
          unidades: 1

        }, function () {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  sendRequest = async () => {



    const response = await fetch('https://hotella.herokuapp.com/api/pedido/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          nrreserva: this.props.navigation.state.params.idCliente,
          idservico: this.props.navigation.state.params.id,
          descricao: this.state.texto,
          quantidade: this.state.unidades
        })
      ,
    }).catch((error) => {
      console.error(error);
    });;

    if (response.status == 200) {
      Alert.alert(
        strings('pedidoReq.Confirm_title'),
        strings('pedidoReq.Confirm_text')

      )
      this.props.navigation.goBack();
    }


  }


  getTextComent(texto) {

    var load = this.state.isLoading;
    var uni = this.state.unidades;
    states = {
      isLoading: load,
      texto: texto,
      unidades: uni
    };
    this.setState(states);
  }

  getTextUnits(textouni) {

    var load = this.state.isLoading;
    var texto = this.state.texto;
    states = {
      isLoading: load,
      texto: texto,
      unidades: parseInt(textouni)
    };
    this.setState(states);
  }

  getButton() {
    if (this.state.estadoP == 1) {
      return (
        <RkButton rkType='large' style={{ width: '100%' }}
          onPress={() => Alert.alert(
            strings('pedidoReq.Choice_title'),
            '',
            [
              { text: strings('pedidoReq.Choice_NO'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: strings('pedidoReq.Choice_YES'), onPress: () => this.sendRequest() },
            ],
            { cancelable: false }
          )


          }

        >{strings('request_Button.0')}
        </RkButton>)
    }
    return (<RkButton rkType='large' style={{ width: '100%' }}
      disabled={true}
    >{strings('request_Button.1')}
    </RkButton>);
  }


  render() {

    var pagamento = this.props.navigation.state.params.uni;

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
            <RkTextInput label={strings('pedidoReq.state')} labelStyle={{ color: 'white', fontFamily: 'Roboto-Regular' }}
              value={significadosHelper.giveStateRequest(this.state.estadoP)}
              rkType='right clear'
              editable={false} />
          </View>
          <View style={[styles.PediroReq_row, styles.heading]}>
            <RkTextInput label={strings('pedidoReq.price')} labelStyle={{ color: 'white', fontFamily: 'Roboto-Regular' }}
              value={significadosHelper.givePreco(this.state.preco)}
              rkType='right clear'
              editable={false} />
          </View>

          <RkText rkType='primary4' style={{ color: 'white', fontFamily: 'Roboto-Regular', fontSize: 20, paddingTop: '10%' }}> {significadosHelper.giveUnidades(pagamento)}</RkText>
          <RkTextInput placeholder={significadosHelper.giveHowMuch()} style={{ color: 'white', fontFamily: 'Roboto-Regular' }}
            onChangeText={this.getTextUnits.bind(this)}
            rkType='clear'
          />

          <RkText rkType='primary4' style={{ color: 'white', fontFamily: 'Roboto-Regular', fontSize: 20 }}>{strings('pedidoReq.comment')} 💬</RkText>
          <RkTextInput
            placeholder={strings('pedidoReq.placeholder')}
            onChangeText={this.getTextComent.bind(this)}
            rkType='clear' multiline={true} numberOfLines={3}
          />


        </ScrollView>
        <View style={styles.PediroReq_footer} >
          {this.getButton()}
        </View>
      </View>
    );


  }

}



