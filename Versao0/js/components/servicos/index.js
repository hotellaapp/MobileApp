import React, { Component } from 'react';
import { Text, View, Image, Button,ListView,StyleSheet ,Dimensions,ActivityIndicator} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import significadosHelper from '../../utils/Significados.js';
import styles from '../../styles/Tabs';

export default class Servicos extends React.Component {


    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.name,
        
       
      });

    constructor (props){
        super(props);
        this.state = {
          isLoading: true
        }
    }


  

    componentDidMount() {

        var idPedido =  `https://hotella.herokuapp.com/api/categoria/${this.props.navigation.state.params.id}` ;
      return fetch(idPedido)
        .then((response) => response.json())
        .then((responseJson) => {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson.servicos),
          }, function() {
            // do something with new state
          });
        }) 
        .catch((error) => {
          console.error(error);
        });
    }
    



     renderRow (rowData, sectionID) {
       if(rowData.estado == 0 ||rowData.estado == 1||rowData.estado == 4 ){

        if(rowData.estado == 4){
          var navigateTo = 'PedidoInfo';
        }else{
          var navigateTo = 'PedidoReq';
        }
      
      return (
        <ListItem
        roundAvatar
        key={sectionID}
        title={rowData.nome.trim()}
        subtitle ={significadosHelper.giveStateRequest(rowData.estado)}
        avatar={{uri:'https://image.flaticon.com/icons/png/128/45/45428.png'}}
        avatarOverlayContainerStyle = {{backgroundColor:'transparent'}}
        onPressRightIcon={() => this.props.navigation.navigate(navigateTo,{uni:this.props.navigation.state.params.uni ,name:rowData.nome.trim(),id:rowData.idServico,idCliente:this.props.navigation.state.params.idCliente})}
      />
      )}
      return null;
    }



    render() {

      if (this.state.isLoading) {
        return (
          <View style={styles.loadContainer}>
             <ActivityIndicator
               color = '#00ffff'
               size = "large"
               style = {styles.activityIndicator}/>
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

