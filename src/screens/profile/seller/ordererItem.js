import React, { Component } from 'react';
import { Container, Header, Body, Left, Right, Content, Button, Text, View } from 'native-base'
import { Image } from 'react-native'
import CardOrder from './../../../components/cardOrders'
import axios from 'axios'
import { BASE_URL } from "@env"


export default class componentName extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        orderData: [],
    }

    getOrderData = () => {
        axios.get(BASE_URL + '/transaksi/OrderData')
            .then(({ data }) => {
                this.setState({
                    orderData: data.data
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    refresh = () => {
        this.getOrderData()
    }

    componentDidMount = () => {
        this.getOrderData()
    }
    render() {
        const { orderData } = this.state
        return (
            <>
                <Container>
                    <Header transparent>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('./../../../assets/back.png')} />
                            </Button>
                        </Left>
                        <Body />
                        <Right>
                            <Button transparent
                                onPress={this.refresh}
                            >
                                <Image source={require('./../../../assets/icons/refresh.png')} />
                            </Button>
                        </Right>
                    </Header>
                    <Content style={{ marginHorizontal: 10 }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 42, marginRight: 10, marginTop: 20, marginBottom: 10, width: 200 }}>Costumer Orders</Text>
                        </View>
                        {
                            orderData && orderData.map(({ trxId, trackingNumber, qty, total, created_at, status, status_id }) => {
                                return (
                                    <>
                                        <CardOrder trxId={trxId} trackingNumber={trackingNumber} qty={qty} total={total} created_at={created_at} idStatus={status_id} status={status} navigation={this.props.navigation} />
                                    </>
                                )
                            })
                        }
                    </Content>
                </Container>
            </>
        );
    }
}
