import React from "react";
import { AppRegistry, Alert, AsyncStorage, ToastAndroid } from "react-native";
import { Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Title, Button, Text, Form, Item, Input } from "native-base";
import { getKeyname, setKeyname } from '../store'

export default class EditScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      keyname: ''
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
    getKeyname().then(res => {
      this.setState({keyname: res.keyname})
    }).catch(e => {
      console.log(e)
      // TODO: Error handling
      ToastAndroid.show('Failed to get keyname from AsyncStorage X(', ToastAndroid.SHORT);
    })
  }

  handleOnEndEditing () {
    setKeyname(this.state.keyname).then(res => {
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
              <Input placeholder="Keyname"
                value={this.state.keyname}
                onEndEditing={this.onEndEditing}
                onChangeText={(keyname) => this.setState({keyname})}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
