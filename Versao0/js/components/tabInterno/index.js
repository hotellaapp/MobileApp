import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';
import { connect } from "react-redux";
import { DrawerNavigator, NavigationActions, TabNavigator } from "react-navigation";
import { Grid, Row } from "react-native-easy-grid";

import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";

import Servicos from './Servicos';
import ServicosComprados from './ServicosComprados';
import Home from './Home';
import PontosTuristicos from './PontosTuristicos';
import { RkText, RkTheme, RkTabView } from 'react-native-ui-kitten';

class Tab extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    }
  }
}

const MainScreenNavigator = TabNavigator({
  tab1: { screen: Home },
  tab2: { screen: Servicos },
  tab3: { screen: ServicosComprados },
  tab4: { screen: PontosTuristicos } //EM IOS NAO FUNCIONA (FALTA INCLUIR GOOGLE MAPS EM IOS)
},
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: 'darkblue',
      inactiveTintColor: 'white',
      showIcon: true,
      showLabel: true,
      pressColor: 'lightblue',
      labelStyle: {
        fontFamily: 'Righteous-Regular',
        fontSize: 10,
        padding: 1
      },
      style: {
        //backgroundColor: '#282828',
        backgroundColor: '#3366ff'
      },
      tabStyle: {
        // height, width, Padding, etc....    
      }
    },
  });


MainScreenNavigator.navigationOptions = {
  header: null,
}

export default MainScreenNavigator