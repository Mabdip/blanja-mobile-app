import React, { useState, useEffect, useRef } from 'react';
import { Container, Header, Body, Left, Content, View, Text, Button } from 'native-base'
import { TextInput, ToastAndroid, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from "@env"
import { useSocket } from './../../utils/context/SocketProvider'

let number = 0

const ChatRoom = ({ navigation, route }) => {
    useEffect(() => {
        getNewMessage()
        console.log('did mount')
    }, [])

    const socket = useSocket();

    useEffect(() => {
        socket.on('refresh', (someEvent) => {
            console.log('refresh ke ' + number)
            getNewMessage()
        })
        return () => socket.off('refresh');
    }, [number])

    const auth = useSelector((state) => state.auth)
    const room_id = route.params.room_id
    const splitRoom = room_id.split("S")[1].split("B")
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState('')
    const seller = splitRoom[0]
    const buyer = splitRoom[1]
    const sender = auth.id

    const config = {
        headers: {
            'x-access-token': 'Bearer ' + auth.token,
        },
    };

    const sendMessage = () => {
        const Msg = {
            seller: seller,
            buyer: buyer,
            chatRoom: room_id,
            sender: sender,
            message: message
        }
        console.log(Msg)
        axios.post(BASE_URL + '/chat/addMessage', Msg, config)
            .then(({ data }) => {
                ToastAndroid.show('Message Sent', ToastAndroid.SHORT, ToastAndroid.CENTER);
                setMessage('')
                console.log('sent')
                number = number + 1
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    const getNewMessage = () => {
        axios.get(BASE_URL + '/chat/newMessage/' + room_id)
            .then(({ data }) => {
                setChat(data.data)
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    return (
        <>
            <Container>
                <Header transparent>
                    <Left>
                        <Button primary
                            onPress={() => { navigation.goBack() }}
                        >
                            <Text>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Text>ChatRoom {room_id}</Text>
                    </Body>
                </Header>
                <Content>
                    {
                        chat.map(({ sender_id, sender_name, message, created_at }) => {
                            let chatMsg;
                            if (sender_id == auth.id) {
                                chatMsg =
                                    <>
                                        <Button transparent></Button>
                                        <View>
                                            <Button rounded bordered primary ><Text>You : {message}</Text></Button>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Button transparent></Button>
                                                <Button small rounded bordered primary><Text>{created_at.toString().split('T')[1].substr(0, 5)}</Text></Button>
                                            </View>
                                        </View>
                                    </>
                            } else {
                                chatMsg =
                                    <>
                                        <View>
                                            <Button rounded bordered danger ><Text>{sender_name} : {message}</Text></Button>
                                            <Button small rounded bordered danger><Text>{created_at.toString().split('T')[1].substr(0, 5)}</Text></Button>
                                        </View>
                                        <Button transparent></Button>
                                    </>
                            }
                            return (
                                <>
                                    <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        {chatMsg}
                                    </View>
                                </>
                            )
                        })
                    }
                </Content>
                <View>
                    <TextInput
                        multiline={true}
                        style={{
                            marginTop: 1,
                            borderColor: 'gray',
                            borderWidth: 2,
                            backgroundColor: '#fff',
                            marginBottom: 8,
                            borderRadius: 4,
                            height: 80,
                            textAlignVertical: 'top',
                        }}
                        placeholder="Message"
                        value={message}
                        onChangeText={(text) => {
                            setMessage(text)
                        }}
                    />
                    <Button full danger rounded onPress={sendMessage}>
                        <Text style={{ color: '#fff' }}>Send</Text>
                    </Button>
                </View>
            </Container>
        </>
    )
}

export default ChatRoom