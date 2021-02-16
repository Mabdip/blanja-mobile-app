import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Footer, FooterTab, Icon, Left, Body, Text, View } from "native-base";
import { Image } from 'react-native'
import CardNotif from './../../components/cardNotif'
import { connect } from 'react-redux'
import { BASE_URL } from '@env'
import axios from 'axios'


class HeaderTransparent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notify: []
    }
  }

  componentDidMount = () => {
    if (this.props.auth.level == 2) {
      axios.get(BASE_URL + '/notif/seller/' + this.props.auth.id)
        .then(({ data }) => {
          this.setState({
            notify: data.data
          })
        }).catch(({ response }) => {
          console.log(response.data)
        })
    } else if (this.props.auth.level == 1) {
      console.log('saya buyer')
      axios.get(BASE_URL + '/notif/buyer/' + this.props.auth.id)
        .then(({ data }) => {
          this.setState({
            notify: data.data
          })
        }).catch(({ response }) => {
          console.log(response.data)
        })
    }
  }

  render() {
    const { notify } = this.state
    let listNotification;
    if (notify.length > 0) {
      listNotification =
        <>
          {
            notify && notify.map(({ title, message }) => <CardNotif title={title} content={message} />)
          }
        </>
    } else {
      listNotification =
        <>
          <View style={{ marginTop: '60%', alignItems: 'center' }}>
            <Image source={require('./../../assets/no_notification.png')} />
            <Text>No Notification</Text>
          </View>
        </>
    }
    return (
      <Container >
        <Header transparent>
          <Left>
            <Button transparent
              onPress={() => { this.props.navigation.goBack() }}
            >
              <Image source={require('./../../assets/back.png')} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: 'black', marginLeft: 25, fontWeight: 'bold' }}>Notification</Title>
          </Body>
        </Header>
        <Content>
        {listNotification}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ notification, auth }) => {
  return {
    auth,
    notification
  };
};

export default connect(mapStateToProps)(HeaderTransparent);