import React, { useState, useEffect } from 'react';
import { Container, Header, Body, Left, Content, View, Text, Button } from 'native-base'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from "@env"

const listChat = ({ navigation }) => {
    const auth = useSelector((state) => state.auth)
    const [chatList, setChatList] = useState([])

    const config = {
        headers: {
            'x-access-token': 'Bearer ' + auth.token,
        },
    };

    const ChatRoom = () => {
        if (auth.level == 2) {
            axios.get(BASE_URL + `/chat/chatRoomSeler`, config)
                .then(({ data }) => {
                    console.log(data)
                    setChatList(data.data)
                }).catch(({ response }) => {
                    console.log(response.data)
                })
        } else {
            axios.get(BASE_URL + `/chat/chatRoomBuyer`, config)
                .then(({ data }) => {
                    console.log(data)
                    setChatList(data.data)
                }).catch(({ response }) => {
                    console.log(response.data)
                })
        }
    }
    useEffect(() => {
        ChatRoom()
    }, [])
    return (
        <>
            <Container>
                <Header transparent>
                    <Left>
                        <Button primary>
                            <Text>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Text>Chat List</Text>
                    </Body>
                </Header>
                <Content>
                    {
                        chatList.map(({ chatRoom }) => {
                            return (
                                <>
                                    <View>
                                        <Button full rounded
                                            onPress={() => {
                                                navigation.navigate('ChatRoom', {
                                                    room_id: chatRoom
                                                })
                                            }}
                                        >
                                            <Text>{chatRoom}</Text>
                                        </Button>
                                    </View>
                                </>
                            )
                        })
                    }
                </Content>
            </Container>
        </>
    )


}

export default listChat
