import React from 'react';
import {
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator, View
} from 'react-native';
import { FontIcons } from '../../../assets/icons';
import {
  RkButton, RkStyleSheet,
  RkText
} from 'react-native-ui-kitten';
import { MainRoutes } from '../MenuItems';

import { strings } from '../../../locales/i18n';
const paddingValue = 8;

class GridV1 extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: strings('user_Menu.Services'),
    tabBarIcon: ({ tintColor }) => (
      <Image
        key={7}
        source={require('../../../assets/icons/roomservice.png')}
        style={[styles.icon]}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      categorias: []
    }
    this.fetchDatasource = this.fetchDatasource.bind(this);
  }

  componentWillMount() {
    this.fetchDatasource();
  }

  fetchDatasource() {
    fetch('https://hotella.herokuapp.com/api/categoria/all')
      .then((response) => response.json())
      .then((responseJson) => {
        var aux = [];
        for (i in responseJson) {

          if (responseJson[i].estado != 2) {
            const newelement = {
              id: 'Servicos',
              title: responseJson[i].nome.trim(),
              icon: MainRoutes.giveRoutesIcon(responseJson[i].nome.trim()),
              screen: GridV1,
              children: [],
              params: {
                name: responseJson[i].nome.trim(),
                id: responseJson[i].idCategoria,
                idCliente: this.props.navigation.state.params.idCliente,
                uni: responseJson[i].tipoPagamento.trim()
              }
            }

            aux.push(newelement)
          }
        }
        this.setState({
          isLoading: false,
          categorias: aux,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  _calculateItemSize() {
    let { height, width } = Dimensions.get('window');
    return (width - paddingValue * 6) / 2;
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

    let size = this._calculateItemSize();
    let navigate = this.props.navigation.navigate;

    let items = this.state.categorias.map(function (route, index) {
      return (
        <RkButton
          rkType='square shadow'
          style={{ width: size, height: size }}
          key={index}
          onPress={() => {
            navigate(route.id, route.params)
          }}>

          <RkText style={styles.icon2} rkType='primary moon menuIcon'>
            {route.icon}
          </RkText>

          <RkText style={{ fontWeight: 'bold', fontSize: 18, alignItems: 'center' }}>
            {route.title}
          </RkText>

        </RkButton>
      )
    });


    return (
      <ScrollView style={styles.root}
        contentContainerStyle={styles.rootContainer}>
        {items}
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: '#45A3DB',
    padding: paddingValue,
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  icon2: {
    width: '40%',
    height: '40%',
    //marginBottom: 16
  },
  icon: {
    width: 24,
    height: 24
  },
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3BA2DB'
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
}));

export default GridV1