import React from "react";
import { AppRegistry, Alert, AsyncStorage, ToastAndroid } from "react-native";
import { Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Title, Button, Text, Form, Item, Input } from "native-base";
import { getKeyname, setKeyname, getKeyIcon, setKeyIcon } from '../store'

export default class EditScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      keyname: '',
      keyIcon: 'https://cdn-groovy.s3-ap-northeast-1.amazonaws.com/production/articles/images/000/001/286/medium/bcc75b1f-7bd7-42e7-8b85-f4150eb1fb0a.jpg'
    }

    this.onKeynameEndEditing = this.handleOnKeynameEndEditing.bind(this)
    this.setCurrentName = this.setCurrentNameHandler.bind(this)
    this.onKeyIconEndEditing = this.handleOnKeyIconEndEditing.bind(this)
    this.setCurrentKeyIcon = this.setCurrentKeyIconHandler.bind(this)
  }

  componentDidMount () {
    this.setCurrentName()
    this.setCurrentKeyIcon()
  }

  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Edit</Title>
        </Body>
        <Right />
      </Header>
    )
  });

  setCurrentNameHandler () {
    getKeyname().then(res => {
      this.setState({keyname: res.keyname})
    }).catch(e => {
      console.log(e)
      // TODO: Error handling
      ToastAndroid.show('Failed to get keyfrom storage X(', ToastAndroid.SHORT);
    })
  }

  setCurrentKeyIconHandler () {
    getKeyIcon().then(res => {
      this.setState({keyIcon: res.keyIcon})
    }).catch(e => {
      console.log(e)
      // TODO: Error handling
      ToastAndroid.show('Failed to get keyIcon from storage X(', ToastAndroid.SHORT);
    })

  }

  handleOnKeynameEndEditing () {
    setKeyname(this.state.keyname).then(res => {
      ToastAndroid.show('Success to save!', ToastAndroid.SHORT);
    }).catch(error => {
      console.log(error)
      ToastAndroid.show('Failed to save X(', ToastAndroid.SHORT);
    })
  }

  handleOnKeyIconEndEditing () {
    setKeyIcon(this.state.keyIcon).then(res => {
      ToastAndroid.show('Success to save!', ToastAndroid.SHORT);
    }).catch(error => {
      console.log(error)
      ToastAndroid.show('Failed to save X(', ToastAndroid.SHORT);
    })
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item>
              <Input placeholder="Keyname"
                value={this.state.keyname}
                onEndEditing={this.onKeynameEndEditing}
                onChangeText={(keyname) => this.setState({keyname})}
              />
            </Item>
            <Item last>
              <Input placeholder="Key Icon"
                value={this.state.keyIcon}
                onEndEditing={this.onKeyIconEndEditing}
                onChangeText={(keyIcon) => this.setState({keyIcon})}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
