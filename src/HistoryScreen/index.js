import React, { Component } from "react";
import HistoryScreen from "./HistoryScreen.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  HistoryScreen: { screen: HistoryScreen },
}));
