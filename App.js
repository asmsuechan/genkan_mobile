import React, { Component } from "react";
import HomeScreen from "./src/HomeScreen/index.js";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    this.setState({ isReady: true });
  }
  render() {
    return <HomeScreen />;
  }
}
