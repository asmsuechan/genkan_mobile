import React from "react";
import { AppRegistry } from "react-native";
import { Container, Content, Header, Left, Button, Icon, Body, Right, Title } from "native-base";

export default class EditScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
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
          <Title>History</Title>
        </Body>
        <Right />
      </Header>
    )
  });

  render() {
    return (
      <Container>
        <Content padder>
        </Content>
      </Container>
    );
  }
}
