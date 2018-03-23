import React from "react";
import { AppRegistry, Alert } from "react-native";
import { Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Title, Button, Text } from "native-base";
export default class EditScreen extends React.Component {
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
  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Icon active name="paper-plane" />
              <Text>Edit Screen 1</Text>
              <Right>
                <Icon name="close" />
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
