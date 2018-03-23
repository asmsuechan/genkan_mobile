import React from "react";
import { AppRegistry, Alert, AsyncStorage, ToastAndroid } from "react-native";
import { Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Title, Button, Text, Form, Item, Input } from "native-base";
import { getUsername, setUsername } from '../store'

export default class EditScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: ''
    }

    this.onEndEditing = this.handleOnEndEditing.bind(this)
    this.setCurrentName = this.setCurrentNameHandler.bind(this)
  }

  componentDidMount () {
    this.setCurrentName()
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
    getUsername().then(res => {
      this.setState({username: res.username})
    }).catch(e => {
      console.log(e)
      // TODO: Error handling
      ToastAndroid.show('Failed to get username from AsyncStorage X(', ToastAndroid.SHORT);
    })
  }

  handleOnEndEditing () {
    setUsername(this.state.username).then(res => {
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
            <Item last>
              <Input placeholder="Username"
                value={this.state.username}
                onEndEditing={this.onEndEditing}
                onChangeText={(username) => this.setState({username})}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
