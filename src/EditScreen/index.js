import React, { Component } from "react";
import EditScreen from "./EditScreen.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  EditScreen: { screen: EditScreen },
}));
