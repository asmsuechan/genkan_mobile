import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { AsyncStorage } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import IconFA from 'react-native-vector-icons/FontAwesome';
import getTheme from '../native-base-theme/components';
import Config from 'react-native-config';

import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import {
  Container,
  Button,
  Text,
  Icon,
  Header,
  Title,
  Body,
  Left,
  Content,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Root,
  Toast,
  StyleProvider,
  Switch,
  H2
} from 'native-base';
import {
  StackNavigator,
  DrawerNavigator,
  DrawerItems
} from 'react-navigation';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync : {
  }
});

let client

type Props = {};
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      isConnected: false,
      showToast: false,
      status: 'open',
    }
    this.onConnect = this.handleOnConnect.bind(this)
    this.onConnectionLost = this.handleOnConnectionLost.bind(this)
    this.onSwitchChange = this.handleOnSwitchChange.bind(this)
    this.onMenuPress = this.handleOnMenuPress.bind(this)
  }

  handleOnConnect() {
    this.setState({ isConnected: true })
    console.log("onConnect");
  }

  handleOnConnectionLost(responseObject) {
    this.setState({ isConnected: false, message: 'Connection lost!' })
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  publishOpen () {
    if (client.isConnected()) client.publish('test', 'open', 0, false)
  }

  publishClose () {
    if (client.isConnected()) client.publish('test', 'close', 0, false)
  }

  connect () {
    // TODO: Disconnect before connect
    const userName = Config.GENKAN_USERNAME
    const password = Config.GENKAN_PASSWORD
    const host = Config.GENKAN_HOST
    const port = Config.GENKAN_PORT

    client = new Paho.MQTT.Client(host, parseInt(port), 'gotestid');
    client.onConnectionLost = this.onConnectionLost;
    client.connect({ onSuccess: this.onConnect, userName: userName, password: password, useSSL: true });
    // TODO: Open Toast if connection success
  }

  componentDidMount () {
    this.connect()
    // TODO: Set current state of the key in this.state.status
  }

  handleOnSwitchChange () {
    // TODO: send MQTT publish by the status
    if (this.state.status === 'open') {
      this.publishClose()
      this.setState({ status: 'closed' })
    } else {
      this.publishOpen()
      this.setState({ status: 'open' })
    }
  }

  isOpen () {
    return this.state.status === 'open'
  }

  static navigationOptions = ({navigation}) => ({
    title:'Home',
    drawerIcon: <Icon name="home" size={24} color="#4CAF50"/>,
    headerStyle: styles.headerHome,
    headerLeft: (
      <Icon name="bars" size={24}
        style={styles.icon1}
        onPress={()=>{navigation.navigate('DrawerOpen')}} />
    ),
  });

  handleOnMenuPress () {
    this.props.navigation.navigate("DrawerOpen")
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          <Header style={styles.header}>
            <Left>
              <Button
                transparent
                onPress={this.onMenuPress}>
                <Icon name="menu" style={{color: '#000'}} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>Genkan</Title>
            </Body>
          </Header>

          <Content padder style={styles.content}>
            <Grid style={styles.buttonsGrid}>
              <Row style={{height: 80}}>
                <H2>末永邸</H2>
              </Row>
              <Row>
                <Image source={{uri: 'https://cdn-groovy.s3-ap-northeast-1.amazonaws.com/production/articles/images/000/001/286/medium/bcc75b1f-7bd7-42e7-8b85-f4150eb1fb0a.jpg'}} style={{height: 200, width: null, flex: 1}}/>
              </Row>

              <Row>
                <Text>Current status: {this.state.status}</Text>
              </Row>
              <Row>
                <Switch value={this.isOpen()} onValueChange={this.onSwitchChange} style={styles.switch} />
              </Row>
            </Grid>
          </Content>

          <Footer style={styles.footer}>
            <FooterTab style={styles.footer}>
              <Button onClick={this.connect}>
                <IconFA name="link"
                  size={30}
                />
                <Text>Connect</Text>
              </Button>
              <Button>
                <IconFA name="history"
                  size={30}
                />
                <Text>History</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
  },
  content: {
    backgroundColor: '#fff',
    // backgroundColor: '#F1F0EE',
  },
  imageContainer: {
    height:80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#900',
    borderWidth: 3,
    borderColor: '#aaa',
  },
  lock: {
    // color: '#FDC44F'
  },
  unlock: {
    // color: '#900'
  },
  footer: {
    backgroundColor: '#fff',
  },
  buttonsGrid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  switch: {
    height: 200,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  }
});
