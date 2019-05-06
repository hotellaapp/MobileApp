import React, { Component } from "react";
import Login from "../components/login/";
import Tab from "../components/tabInterno/";
import Hotels from "../components/listHotels/";
import Pedido from "../components/pedido/";
import PedidoInfo from "../components/pedidoInfo/";
import Avaliacao from "../components/avaliacao/";
import ServicosExternos from "../components/tabExterno";
import Servicos from "../components/servicos";
import PedidoExterno from "../components/pedidoExterno";
import PedidoReq from "../components/pedidoReq";
import HomeDrawerRouter from "./HomeDrawerRouter";
import Informacao from "../components/informacao"
import { StackNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
export default (StackNav = StackNavigator({
  Login: { screen: Login },
  Hotels: { screen: Hotels },
  Tab: { screen: Tab },
  Servicos:{screen:Servicos},
  PedidoReq:{screen:PedidoReq},
  Pedido:{screen: Pedido},
  Aval:{screen: Avaliacao},
  ServicosExternos :{screen:ServicosExternos},
  PedidoExterno:{screen:PedidoExterno},
  Info:{screen:Informacao},
  PedidoInfo :{screen:PedidoInfo}
 
  

}));
