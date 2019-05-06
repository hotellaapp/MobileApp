

import React, { Component } from 'react';
import { Text, View, Image, Button, ListView, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import significadosHelper from '../../utils/Significados.js';
import styles from '../../styles/Tabs';

export default class ServicosExternos extends React.Component {


  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,


  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }




  componentDidMount() {

    var idPedido = `https://hotella.herokuapp.com/api/servico/externos`;
    return fetch(idPedido)
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }





  renderRow(rowData, sectionID) {
   
      if (rowData.estado == 3) {
        var navigateTo = 'PedidoExterno';
      } else {
        var navigateTo = 'PedidoInfo';
      }
console.log('----------------------------sdeu');
      return (
        <ListItem
          roundAvatar
          key={sectionID}
          title={rowData.nome.trim()}
          subtitle={significadosHelper.giveStateRequest(rowData.estado)}
          avatar={{ uri: 'https://image.flaticon.com/icons/png/128/45/45428.png' }}
          avatarOverlayContainerStyle={{ backgroundColor: 'transparent' }}
          onPressRightIcon={() => this.props.navigation.navigate(navigateTo, { name: rowData.nome.trim(), id: rowData.idServico })}
        />
      )
    
    return null;
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
    return (<View style={styles.overlayContainer}>
      <List>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </List>

    </View>);
  }
}

