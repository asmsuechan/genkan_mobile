import React from "react";
import { AppRegistry, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Title,
  Row,
  Text
} from "native-base";
import firebase from 'react-native-firebase';
import IconFA from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'

export default class HistoryScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
      isFetched: false
    }

    this.handleFetch = this.fetchHandler.bind(this)
  }

  componentDidMount () {
    firebase.database()
      .ref('devices/1/history')
      .on('value', this.handleFetch);
  }

  componentWillUnmount () {
    firebase.database()
      .ref('devices/1/history')
      .off('value', this.handleFetch);
  }

  fetchHandler (snapshot) {
    const keys = Object.keys(snapshot.val());
    const events = keys.map((v) => { return snapshot.val()[v]; });
    this.setState({ events: events, isFetched: true })
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
    const events = [];
    if (this.state.isFetched) {
      this.state.events.forEach((event, i) => {
        const iconName = event.Action === 'open' ? 'unlock' : 'lock'
        const parsedTime = moment(event.RanAt, "YYYY-MM-DD HH:mm").toString()
        events.push(
          <Row key={i} style={styles.eventRow}>
              <IconFA name={iconName}
                size={60}
                style={styles.lock}/>
              <Text>{event.Action}</Text>
              <Text>{parsedTime}</Text>
          </Row>
        )
      })
    }
    return (
      <Container>
        <Content padder>
          {events}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  lock: {
  },
  eventRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
