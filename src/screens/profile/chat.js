import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { Button, Content, Header, Left, Body, Right, Container } from 'native-base'
import { REACT_APP_BASE_URL } from '@env';

//context
import { useSocket } from '../../utils/context/SocketProvider';
//redux
import { useSelector } from 'react-redux';

const Chat = ({ route, navigation }) => {
  const [sellerId, setSellerId] = useState(0)
  const socket = useSocket();
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const user_id = useSelector((state) => state.auth.name);
  // const recipient = user_id == 3 ? 18 : 3 

  useEffect(() => {
    if (route.params && route.params.sellerId) {
      setSellerId(route.params.sellerId)
    }
  }, [])

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChatMessages((chatMessages) => [...chatMessages, msg]);
      if (user_id != msg.sender) {
        setSellerId(msg.sender)
      }
    });
    return () => {
      socket.off('chat message');
    };
  }, []);

  const submitChatMessage = () => {
    socket.emit('chat message', { chatMessage, sender: user_id }, sellerId);
    setChatMessage('');
  };

  console.log(chatMessages);
  console.log('length ' + chatMessages.length);
  return (
    <>
      <Container>
        <Header transparent>
          <Left>
            <Button transparent
              onPress={() => { navigation.goBack() }}
            >
              <Image source={require('./../../assets/back.png')} />
            </Button>
          </Left>
          <Body>
            <Text style={{fontSize:18, fontWeight:'bold'}}>Chat</Text>
          </Body>
          <Right />
        </Header>
        <Content style={{backgroundColor:'lightgray', paddingVertical:10}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View>
              {chatMessages.length !== 0 &&
                chatMessages.map(({ chatMessage, sender }, index) => {
                  let chatBln;
                  if (sender == user_id) {
                    chatBln =
                      <>
                        <View key={index} style={{ borderColor: 'blue', borderWidth: 2, borderRadius:10, marginLeft:150, backgroundColor:'white' , marginRight:5, marginTop:5, marginBottom:15}}>
                          <View style={{padding:10}}>
                          <Text>You :</Text>
                          <Text>{chatMessage}</Text>
                          </View>
                        </View>
                      </>
                  } else {
                    chatBln =
                    <>
                    <View key={index} style={{ borderColor: 'red', borderWidth: 2, borderRadius:10, marginLeft:5, backgroundColor:'white' , marginRight:150, marginVertical:5}}>
                      <View style={{padding:10}}>
                      <Text>{sender}</Text>
                      <Text>{chatMessage}</Text>
                      </View>
                    </View>
                  </>
                  }
                  return (
                    <>
                      {chatBln}
                    </>
                  );
                })}
            </View>
          </View>
        </Content>
        <View>
          <TextInput
            multiline={true}
            style={styles.form}
            placeholder="Message"
            value={chatMessage}
            onSubmitEditing={() => submitChatMessage()}
            onChangeText={(chatMessage) => {
              setChatMessage(chatMessage);
            }}
          />
          <Button full danger rounded onPress={submitChatMessage}>
            <Text style={{ color: '#fff' }}>Send</Text>
          </Button>
        </View>
      </Container>
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  form: {
    marginTop: 1,
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 4,
    height: 80,
    textAlignVertical: 'top',
  },
  btn: {
    backgroundColor: '#ebebeb',
    marginHorizontal: 20,
    height: 30,
    justifyContent: 'center',
    borderRadius: 8,
    width: 75,
    alignItems: 'center',
  },
});