import React, { Component } from "react";
import Tab from "../components/tabInterno/";
import { DrawerNavigator } from "react-navigation";
export default (DrawNav = DrawerNavigator(
  {
    Tab: {screen: Tab },
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
));
