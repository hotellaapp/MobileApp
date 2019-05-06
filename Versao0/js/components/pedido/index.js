
import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, ActivityIndicator, ScrollView, Alert, Image } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

import significadosHelper from '../../utils/Significados.js'
import { strings } from '../../../locales/i18n';
import styles from '../../styles/Tabs';
import { scale, scaleModerate, scaleVertical } from '../../utils/scale';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';

class Pedido extends React.Component {

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
    var idPedido = `https://hotella.herokuapp.com/api/pedido/${this.props.navigation.state.params.id}`;

    return fetch(idPedido)
      .then((response) => response.json())
      .then((responseJson) => {



        this.setState({
          isLoading: false,
          preco: responseJson.preco.toString(),
          estadoP: responseJson.estado.toString(),
          descricao: responseJson.descricao.toString(),
          data: responseJson.dataInicio.toString()
        }, function () {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }



  getButton() {
    if (this.state.estadoP == 2) {
      return (
        <RkButton rkType='success large' style={{ width: '100%' }}
          onPress={() => this.props.navigation.navigate('Aval', { name: strings('aval.name'), id: this.props.navigation.state.params.id })}
        >{strings('aval_Button.ok')}
        </RkButton>)
    }
    if (this.state.estadoP == 3) {
      return (
        <RkButton rkType='primary large' style={{ width: '100%' }}
          activeOpacity={0}
        >{strings('aval_Button.done')}
        </RkButton>)
    }
    return (
      RkTheme.setType('RkButton', 'smallLeter', {
        fontSize: 18,
      }),
      <RkButton rkType='warning large smallLeter' style={{ width: '100%' }}
        disabled={true}
      >{strings('aval_Button.no')}
      </RkButton>);
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
          <RkText rkType='primary4' style={{ color: 'white', fontFamily: 'Roboto-Regular', fontSize: 20 }}>{strings('pedidoReq.comment')} 💬</RkText>
          <RkTextInput
            value={this.state.descricao}
            rkType='clear'
            style={{
              backgroundColor: styles.background,
            }}
            editable={false}
            multiline={true}
            numberOfLines={3}
          />
          <View style={[styles.PediroReq_row, styles.heading]}>
            <RkTextInput label={strings('pedido_Details.price')} labelStyle={{ color: 'white', fontFamily: 'Roboto-Regular' }}
              value={significadosHelper.givePreco(this.state.preco)}
              rkType='right clear'
              editable={false} />
          </View>

          <View style={[styles.PediroReq_row, styles.heading]}>
            <RkTextInput label={strings('pedido_Details.date')} labelStyle={{ color: 'white', fontFamily: 'Roboto-Regular' }}
              value={this.state.data}
              rkType='right clear'
              editable={false} />
          </View>

          <View style={[styles.PediroReq_row, styles.heading]}>
            <RkTextInput label={strings('pedido_Details.state')} labelStyle={{ color: 'white', fontFamily: 'Roboto-Regular' }}
              value={significadosHelper.giveState(this.state.estadoP)}
              rkType='right clear'
              editable={false} />
          </View>


        </ScrollView>
        <View style={styles.PediroReq_footer} >
          {this.getButton()}
        </View>
      </View>
    );

  }

}

export default Pedido;

