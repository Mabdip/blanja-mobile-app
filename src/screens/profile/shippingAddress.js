import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Input } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { setAddress } from './../../utils/redux/ActionCreators/adress'
import { BASE_URL } from '@env'

import CardAdress from './../../components/cardAdress'

class Shipping extends React.Component {
    state = {
        shippingAddress: [],
        selectedAddress: null,
    }

    getAddress = () => {
        const config = {
            headers: {
                'x-access-token': 'Bearer ' + this.props.auth.token,
            },
        };
        axios.get(BASE_URL + `/address/${this.props.auth.id}`, config)
            .then(({ data }) => {
                this.setState({
                    shippingAddress: data.data
                })
            }).catch(({ response }) => {
                console.log(response)
            })
    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getAddress()
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    setAddress = (id) => {
        this.setState({
            selectedAddress: id
        })
    }
    setActiveAddress = () => {
        // ToastAndroid.show('Adress ' + this.state.selectedAddress + ' terpilih', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        this.props.dispatch(setAddress(this.state.selectedAddress))
    }

    render() {
        // console.log(this.props.auth)
        const { shippingAddress } = this.state
        // console.log(this.props.address)
        return (
            <>
                <Container>
                    <Header transparent>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('./../../assets/back.png')} />
                            </Button>
                        </Left>
                        <Body >
                            <Title style={{ color: 'black', fontWeight: 'bold' }}>My Shipping Address</Title>
                        </Body>
                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0', margin: 10 }}>
                        <Item rounded style={{ marginTop: 20, backgroundColor: 'white' }}>
                            <Input placeholder="Search Here" />
                        </Item>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 15 }}>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Shipping Address</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.navigate('AddAddress') }}
                            >
                                <Text>Add New Address</Text>
                            </TouchableOpacity>
                        </View>
                        <SafeAreaView>
                            <ScrollView style={{ height: 380, marginBottom: 20, marginTop: 20 }}>
                                {
                                    shippingAddress.length > 0 ? (
                                        <>
                                        {
                                    shippingAddress && shippingAddress.map(({ id, recipient_name, city, postal, phone, address_type }) => {
                                        const color= this.state.selectedAddress == id? '#dedede' : 'white'
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    onPress={() => { this.setAddress(id) }}
                                                >
                                                    <CardAdress key={id} addressId={id} type={address_type} color={color} name={recipient_name} city={city} postal={postal} phone={phone} navigation={this.props.navigation} />
                                                </TouchableOpacity>
                                            </>
                                        )
                                    })
                                }
                                        </>
                                    ) : (
                                        <View style={{flexDirection:'row', justifyContent: 'space-between',}}>
                                            <Text></Text>
                                            <Text style={{fontSize:24, fontWeight:'bold'}}>NO ADDRESS YET</Text>
                                            <Text></Text>
                                        </View>
                                    )
                                }
                            </ScrollView>
                        </SafeAreaView>

                        <Button full rounded bordered dark>
                            <TouchableOpacity
                                onPress={this.setActiveAddress}
                            >
                                <Text>
                                    Set Active Address
                            </Text>
                            </TouchableOpacity>
                        </Button>

                    </Content>
                </Container>
            </>
        )
    }
}

const mapStateToProps = ({ auth, address }) => {
    return {
        auth,
        address
    };
};

export default connect(mapStateToProps)(Shipping);