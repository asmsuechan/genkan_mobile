import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import SideBar from "../SideBar.js";
import EditScreen from "../EditScreen/index.js";
import { DrawerNavigator } from "react-navigation";
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Edit: { screen: EditScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;
