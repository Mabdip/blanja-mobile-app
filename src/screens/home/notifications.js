import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Footer, FooterTab, Icon, Left, Body, Text, View } from "native-base";
import { Image } from 'react-native'
import CardNotif from './../../components/cardNotif'
import { connect } from 'react-redux'


class HeaderTransparent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { notify } = this.props.notification
    console.log(notify)
    let listNotification;
    if (notify.length > 0) {
      listNotification =
        <>
          {
            notify && notify.map(({ title, content }) => <CardNotif title={title} content={content} />)
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
        {listNotification}
      </Container>
    );
  }
}

const mapStateToProps = ({ notification }) => {
  return {
    notification
  };
};

export default connect(mapStateToProps)(HeaderTransparent);
