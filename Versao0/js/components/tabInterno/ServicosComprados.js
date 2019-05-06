import React, { Component } from 'react';
import { Text, View, Image, Button, ListView, StyleSheet, Dimensions, ActivityIndicator, RefreshControl,ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import significadosHelper from '../../utils/Significados';
import { strings } from '../../../locales/i18n';
import styles from '../../styles/Tabs';
export default class ServicosComprados extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    this.fetchDatasource = this.fetchDatasource.bind(this);
    this.fetchProperName = this.fetchProperName.bind(this);
  }


  static navigationOptions = {
    tabBarLabel: strings('user_Menu.Requests'),
    tabBarIcon: ({ tintColor }) => (
      <Image
        key={9}
        source={require('../../../assets/icons/question.png')}
        style={[styles.icon]}
      />
    )
  }

  componentWillMount() {
    this.fetchDatasource();
  }

  getImages(state) {
    if (state == 0) return z0_IMAGE = require('../../../images/createdReq-0.png')
    if (state == 1) return z1_IMAGE = require('../../../images/createdReq-1.png')
    if (state == 2) return z2_IMAGE = require('../../../images/createdReq-2.png')
    if (state == 3) return z3_IMAGE = require('../../../images/createdReq-3.png')

  }


  fetchProperName = async (servico) => {

    var idPedido = `https://hotella.herokuapp.com/api/servico/nome/${servico}`;

    const response = await fetch(idPedido, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },

    }).catch((error) => {

      console.error(error);
    });;

    if (response.status == 200) {
      let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      var vars = this.state.data;
      response._bodyText.trim();
      for (i in vars) {
        if (vars[i].idservico == servico)
          vars[i].Name = response._bodyText.trim();
      }
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(vars),
        data: vars
      });
    }


  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={sectionID}
        title={rowData.Name}
        subtitle={significadosHelper.giveState(rowData.estado)}
        avatar={this.getImages(rowData.estado)}
        avatarOverlayContainerStyle={{ backgroundColor: 'transparent' }}
        onPressRightIcon={() => this.props.navigation.navigate('Pedido', { name: rowData.Name, id: rowData.idPedido })}
      />
    )
  }
  
  fetchDatasource() {
    var idPedido = `https://hotella.herokuapp.com/api/client/pedidos=${this.props.navigation.state.params.idCliente}`;
    fetch(idPedido)
      .then((response) => response.json())
      .then((responseJson) => {
        var count=0
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        for (i in responseJson) {
          var propername = this.fetchProperName(responseJson[i].idservico);
          responseJson[i].Name = 'Loading';
          count ++
        }
        if (count > 0)
        this.setState({
          isLoading: false,
          refreshing: false,
          dataSource: ds.cloneWithRows(responseJson),
          data: responseJson
        }, function () {
          // do something with new state
        });



      })
      .catch((error) => {
        console.error(error);
      });
  }


  _onRefresh() {
    this.setState({ isLoading: true });
    this.fetchDatasource();

  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.overlayContainer}>
        <ScrollView
        refreshControl={
            <RefreshControl
              refreshing= {false}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          >
          <ActivityIndicator
            color='#00ffff'
            size="large"
            style={styles.activityIndicator} />
        </ScrollView>
        </View>
      );
    }
    return (<View style={styles.overlayContainer}>
      <List>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
      </List>

    </View>);
  }
}



