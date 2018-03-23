import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { AsyncStorage } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import IconFA from 'react-native-vector-icons/FontAwesome';
import getTheme from '../../native-base-theme/components';
import Config from 'react-native-config';
import { getUsername } from '../store'

import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ToastAndroid
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

console.ignoredYellowBox = ['Remote debugger'];

let client

type Props = {};
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'open',
      keyDegree: new Animated.Value(0),
      username: ''
    }

    this.topicName = 'genkan/device/1'

    this.onConnect = this.handleOnConnect.bind(this)
    this.onConnectionLost = this.handleOnConnectionLost.bind(this)
    this.onMenuPress = this.handleOnMenuPress.bind(this)
    this.connect = this.handleConnect.bind(this)
    this.onFailure = this.handleOnFailure.bind(this)
    this.onPressKey = this.handleOnPressKey.bind(this)
    this.setUsername = this.setUsernameHandler.bind(this)
    this.onSettingButtonPress = this.handleOnSettingButtonPress.bind(this)
  }

  handleOnConnect() {
    ToastAndroid.show('Success to connect!', ToastAndroid.SHORT);
    console.log("onConnect");
  }

  handleOnConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  publishOpen () {
    if (client.isConnected()) client.publish(this.topicName, 'open', 0, false)
  }

  publishClose () {
    if (client.isConnected()) client.publish(this.topicName, 'close', 0, false)
  }

  handleOnFailure () {
    // TODO: Send error message somewhere
    ToastAndroid.show('Oops! Failed to publish X(', ToastAndroid.SHORT);
  }

  handleConnect () {
    if (client && client.isConnected()) client.disconnect()
    const userName = Config.GENKAN_USERNAME
    const password = Config.GENKAN_PASSWORD
    const host = Config.GENKAN_HOST
    const port = Config.GENKAN_PORT

    client = new Paho.MQTT.Client(host, parseInt(port), 'gotestid');
    client.onConnectionLost = this.onConnectionLost;
    client.connect({ onSuccess: this.onConnect, onFailure: this.onFailure, userName: userName, password: password, useSSL: true });
    // TODO: Open Toast if connection success
  }

  componentDidMount () {
    this.setUsername()
    this.connect()
    // TODO: Set current state of the key in this.state.status
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

  handleOnPressKey () {
    if (!client || !client.isConnected()) return
    // TODO: send MQTT publish by the status
    if (this.state.status === 'open') {
      this.publishClose()
      this.setState({ status: 'closed' })
    } else {
      this.publishOpen()
      this.setState({ status: 'open' })
    }

    // TODO: Make not working when it's animating
    // Warning: the status is after changed current statusa
    let fromValue, toValue
    if (this.isOpen()) {
      fromValue = 0
      toValue = 1
    } else {
      fromValue = 1
      toValue = 0
    }

	  this.state.keyDegree.setValue(fromValue)
	  Animated.timing(
	    this.state.keyDegree,
	    {
	      toValue: toValue,
	      duration: 1000,
	    }
	  ).start()
	}

  setUsernameHandler () {
    getUsername().then(res => {
      this.setState({username: res.username})
    })
  }

  handleOnSettingButtonPress () {
    this.props.navigation.navigate('Edit')
  }

  render() {
    const keyDegree = this.state.keyDegree.interpolate({
        inputRange: [0, 1],
        outputRange: ['270deg', '360deg']
    })

    return (
      <Root>
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
                <Row style={styles.registeredKeyName}>
                  <H2>{this.state.username}</H2>
                </Row>
                <Row>
                  <Image source={{uri: 'https://cdn-groovy.s3-ap-northeast-1.amazonaws.com/production/articles/images/000/001/286/medium/bcc75b1f-7bd7-42e7-8b85-f4150eb1fb0a.jpg'}} style={{height: 200, width: null, flex: 1}}/>
                </Row>

                <Row>
                  <Animated.View style={{height: 300, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableWithoutFeedback>
                      <Animated.View
                        style={{
                          backgroundColor: this.isOpen() ? '#f4f4f4' : '#5cb85c',
                          width: 25,
                          height: 200,
                          transform: [{rotate: keyDegree}],
                          position: 'relative'
                        }}
                      />
                    </TouchableWithoutFeedback>
                    <TouchableOpacity
                      onPress={this.onPressKey}
                      style={styles.keyCircle}
                    >
                      <IconFA name={this.isOpen() ? 'unlock' : 'lock'}
                        size={40}
                        style={styles.keyIcon}
                      />
                    </TouchableOpacity>
                  </Animated.View>
                </Row>
              </Grid>
            </Content>

            <Footer style={styles.footer}>
              <FooterTab style={styles.footer}>
                <Button onPress={this.connect}>
                  <IconFA name="link"
                    size={30}
                  />
                  <Text>Connect</Text>
                </Button>
                <Button onPress={this.onSettingButtonPress}>
                  <IconFA name="gear"
                    size={30}
                  />
                  <Text>Setting</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        </StyleProvider>
      </Root>
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
  },
  registeredKeyName: {
    height: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  keyCircle: {
    position: 'absolute',
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#f4f4f4',
    borderRadius: 70,
  },
  keyIcon: {
    position: 'absolute',
  }
});
