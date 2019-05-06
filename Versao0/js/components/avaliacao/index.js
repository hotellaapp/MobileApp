import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Rating, FormLabel, FormInput } from 'react-native-elements';
import { strings } from '../../../locales/i18n';
import styles from '../../styles/Tabs';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';
//import styles from '../../styles/Tabs';
class Avaliacao extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,


  });

  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      text: ' '
    };


  }




  ratingCompleted(rating) {


    var texto = this.state.text;
    states = {
      rating: rating,
      text: texto
    };
    this.setState(states);


  }


  getTextAvaliacao(texto) {

    var rat = this.state.rating;
    states = {
      text: texto,
      rating: rat
    };
    this.setState(states);
  }

  sendAvaliacao = async (idPedido) => {

    const response = await fetch('https://hotella.herokuapp.com/api/avaliacao/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          idpedido: idPedido,
          texto: this.state.text,
          classificacao: this.state.rating
        }
      ),
    }).catch((error) => {

      console.error(error);
    });;

    if (response.status == 200) {
      Alert.alert(
        strings('aval.Confirm_title'),
        strings('aval.Confirm_text')
      )
      this.props.navigation.goBack();

    }


  }


  render() {
    var idPedido = this.props.navigation.state.params.id;

    const STAR_IMAGE = require('../../../images/star.png')

    return (
      <View behavior='position'
        style={styles.PediroReq_screen}>
        <View>
          <RkText RkType='header' style={{ fontFamily: 'Roboto-Regular', fontSize: 32, textAlign: 'center' }}> {strings('aval.text')} </RkText>
        </View>
        <ScrollView contentContainerStyle={styles.PediroReq_content}>
          <View style={styles.PediroReq_content}>
            <RkText rkType='primary4' style={{ color: 'white', fontFamily: 'Roboto-Regular', fontSize: 20, paddingVertical: '10%' }}>{strings('pedidoReq.comment')} 💬</RkText>
            <RkTextInput
              value={this.state.descricao}
              rkType='clear'
              style={{
                backgroundColor: 'white',
              }}
              multiline={true}
              numberOfLines={3}
              onChangeText={this.getTextAvaliacao.bind(this)}
            />
          </  View>

          <Rating
            showRating
            type="custom"
            fractions={0}
            startingValue={0}
            imageSize={32}
            key={11}
            ratingImage={STAR_IMAGE}
            ratingCount={10}
            ratingBackgroundColor='#00ffff'
            ratingColor='yellow'
            onFinishRating={this.ratingCompleted.bind(this)}
            style={{ paddingVertical: 10 }}
          />

        </ScrollView>
        <View style={styles.PediroReq_footer} >
          <RkButton rkType='primary large' style={{ width: '100%' }} onPress={() => this.sendAvaliacao(idPedido)}>{strings('aval.button')}</RkButton>
        </View>
      </View >
    );
  }
}


export default Avaliacao;