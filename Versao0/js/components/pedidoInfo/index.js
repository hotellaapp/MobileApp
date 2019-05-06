
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

class PedidoInfo extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,


  });

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }

  }


  componentDidMount() {
    var idPedido = `https://hotella.herokuapp.com/api/servico/${this.props.navigation.state.params.id}`;

    return fetch(idPedido)
      .then((response) => response.json())
      .then((responseJson) => {



        this.setState({
          isLoading: false,
          nome: responseJson.nome.trim(),
          descricao: responseJson.idServico.toString(),
        }, function () {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
          <RkText rkType='primary4' style={{ color: 'white', fontFamily: 'Roboto-Regular', fontSize: 20 }}>{strings('pedidoInfo.InfoTitle')} 💬</RkText>
          <RkTextInput
            value={this.state.nome}
            rkType='clear'
            style={{
              backgroundColor: styles.background,
            }}
            editable={false}
            multiline={true}
            numberOfLines={3}
          />

          <View style={[styles.PediroReq_row, styles.heading]}>
            <RkTextInput label={strings('pedidoInfo.desc')} labelStyle={{ color: 'white', fontFamily: 'Roboto-Regular' }}
              value={this.state.descricao}
              rkType='right clear'
              editable={false} />
          </View>






        </ScrollView>

      </View>
    );

  }

}

export default PedidoInfo;

