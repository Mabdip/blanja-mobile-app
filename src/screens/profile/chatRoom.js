import React, { useState, useEffect, useRef } from 'react';
import { Container, Header, Body, Left, Content, View, Text, Button } from 'native-base'
import { TextInput, ToastAndroid, ScrollView, Image, FlatList, SafeAreaView, KeyboardAvoidingView, Animated } from 'react-native'
import { setLoginfalse } from './../../utils/redux/ActionCreators/auth'
import { useSelector, connect } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from "@env"
import { useSocket } from './../../utils/context/SocketProvider'
import { vw, vh } from 'react-native-expo-viewport-units';

let number = 0

const ChatRoom = ({ navigation, route, setLoginfalse }) => {
    const keyboardHeight = new Animated.Value(0)

    useEffect(() => {
        getName()
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
    const [name, setName] = useState('')
    const seller = splitRoom[0]
    const buyer = splitRoom[1]
    const sender = auth.id

    const config = {
        headers: {
            'x-access-token': 'Bearer ' + auth.token,
        },
    };

    const getName = () => {
        if (sender != buyer) {
            axios.get(BASE_URL + '/user/name/' + buyer)
                .then(({ data }) => {
                    setName(data.data.fullname)
                }).catch(({ response }) => {
                    console.log(response)
                })
        } else {
            axios.get(BASE_URL + '/user/name/' + seller)
                .then(({ data }) => {
                    setName(data.data.fullname)
                }).catch(({ response }) => {
                    console.log(response)
                })
        }
    }

    const sendMessage = () => {
        if (message != '') {
            const Msg = {
                seller: seller,
                buyer: buyer,
                roomChat: room_id,
                sender: sender,
                message: message
            }
            console.log(Msg)
            axios.post(`${BASE_URL}/chat/addMessage`, Msg, config)
                .then(({ data }) => {
                    ToastAndroid.show('Message Sent', ToastAndroid.SHORT, ToastAndroid.CENTER);
                    setMessage('')
                    console.log('sent')
                    number = number + 1
                }).catch(({ response }) => {
                    console.log(response.status)
                    if (response.status == 401) {
                        ToastAndroid.show('SESI ANDA TELAH HABIS', ToastAndroid.SHORT, ToastAndroid.CENTER);
                        if (setLoginfalse()) {
                            navigation.replace('Profile')
                        }
                    }
                })
        } else {
            ToastAndroid.show('Message cannot be empty', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
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
                        <Button transparent
                            onPress={() => { navigation.goBack() }}
                        >
                            <Image source={require('./../../assets/back.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                    </Body>
                </Header>
                <View
                    style={{ flex: 1, backgroundColor: '#c4c4c4' }}
                >
                    <FlatList
                        data={chat}
                        inverted
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            item.sender_id == auth.id ? (
                                <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View></View>
                                    <View style={{ borderColor: 'red', backgroundColor: 'white', borderWidth: 1, minWidth: vw(25), maxWidth: vw(60), borderRadius: 5, marginHorizontal: vw(1) }}>
                                        <View style={{ paddingHorizontal: vw(3), paddingVertical: vw(2) }}>
                                            <Text style={{ textAlign: 'right', fontWeight: 'bold', color: 'red' }}>You</Text>
                                            <Text >{item.message}</Text>
                                            <Text style={{ fontSize: 10, marginTop: 8, color: 'gray', textAlign: 'right' }}>{item.create_at.toString().split('T')[0]} | {item.create_at.toString().split('T')[1].substr(0, 5)}</Text>
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                    <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ borderColor: 'red', backgroundColor: 'white', borderWidth: 1, minWidth: vw(30), maxWidth: vw(60), borderRadius: 5, marginHorizontal: vw(1) }}>
                                            <View style={{ paddingHorizontal: vw(3), paddingVertical: vw(2) }}>
                                                <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'red' }}>{item.sender_name}</Text>
                                                <Text>{item.message}</Text>
                                                <Text style={{ fontSize: 10, marginTop: 8, textAlign: 'right' }}>{item.create_at.toString().split('T')[0]} | {item.create_at.toString().split('T')[1].substr(0, 5)}</Text>
                                            </View>
                                        </View>
                                        <View></View>
                                    </View>
                                )
                        )}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        multiline={true}
                        style={{
                            marginTop: 3,
                            borderColor: 'gray',
                            borderWidth: 2,
                            backgroundColor: '#fff',
                            marginBottom: 8,
                            borderRadius: 15,
                            paddingHorizontal: vw(3),
                            height: vh(7),
                            width: vw(75),
                            marginLeft: vw(2),
                            marginRight: vw(2),
                            textAlignVertical: 'top',
                        }}
                        placeholder="Type a message"
                        value={message}
                        onChangeText={(text) => {
                            setMessage(text)
                        }}
                    />
                    <Button danger rounded style={{ width: vh(10), height: vh(7), marginTop: 3 }} onPress={sendMessage} >
                        <Text>SEND</Text>
                    </Button>
                </View>
            </Container>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoginfalse: () =>
            dispatch(setLoginfalse()),
    };
};
export default connect(null, mapDispatchToProps)(ChatRoom);