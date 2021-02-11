import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Input, CheckBox } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet, Picker, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { orderItems } from './../../utils/redux/ActionCreators/bag'
import axios from 'axios'
import { BASE_URL } from '@env'
import CardAdress from './../../components/cardAddressPayment'
import PushNotification from 'react-native-push-notification';
import { showNotification } from '../../notif';
import { addNotification } from './../../utils/redux/ActionCreators/notification'

import {useSocket} from './../../utils/context/SocketProvider'
// const socket = useSocket()

const channel = 'notif';
 
class CheckOut extends React.Component {
    state = {
        isCheckedMaster: false,
        isCheckedPost: false,
        isCheckedGopay: false,
        selectedPayment: 0,
        address: [],
        kurir: [],
        jasaKirim: '0',
        shippingPrice: 0
    }

    checkedMaster = () => {
        this.setState({
            isCheckedMaster: !this.state.isCheckedMaster,
            isCheckedPost: false,
            isCheckedGopay: false,
            selectedPayment: 1
        })
    }

    checkedPost = () => {
        this.setState({
            isCheckedMaster: false,
            isCheckedPost: !this.state.isCheckedPost,
            isCheckedGopay: false,
            selectedPayment: 2
        })
    }

    checkedGopay = () => {
        this.setState({
            isCheckedMaster: false,
            isCheckedPost: false,
            isCheckedGopay: !this.state.isCheckedGopay,
            selectedPayment: 3
        })
    }

    submitOrder = () => {
        let payment = 0
        if (this.state.isCheckedMaster) {
            payment = 1
        } else if (this.state.isCheckedPost) {
            payment = 2
        } else if (this.state.isCheckedGopay) {
            payment = 3
        }
        if (payment != 0 && this.props.address.activeAddress != null) {
            const Order = {
                trxId: `TRX${this.props.bag.trxId}`,
                payment: payment,
                address: this.props.address.activeAddress
            }
            if (this.props.dispatch(orderItems(Order))) {
                const newTrx = {
                    user_id: this.props.auth.id,
                    TrxId: Order.trxId,
                    payment: payment,
                    address: this.props.address.activeAddress,
                    kurir:this.state.jasaKirim,
                    qty: this.props.bag.mybag.length,
                    total: this.props.bag.totalAmmount + this.state.shippingPrice,
                    trackingNumber: `BELUM ADA DATA`
                }
                axios.post(BASE_URL + '/transaksi', newTrx)
                    .then((result) => {
                        axios.post(BASE_URL + '/transaksi/itemOrder', this.props.bag.mybag)
                            .then((res) => {
                                showNotification('Notification', 'Checkout Succes', channel);
                                const notifData = {
                                    title: `Checkout berhasil pada transaksi ${Order.trxId}`,
                                    content: `Hore checkout kamu berhasil, share ke temenmu dan dapetin kupon cashbacknya`
                                }
                                this.props.dispatch(addNotification(notifData))
                                this.props.navigation.navigate('Success')
                            }).catch(({ response }) => {
                                console.log(response.data)
                            })
                    }).catch((error) => {
                        console.log(error.response.data)
                    })
            }

        } else {
            ToastAndroid.show('Harap lengkapi alamat dan pembayaran', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }

    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            axios.get(BASE_URL + `/address/get/${this.props.address.activeAddress}`)
                .then(({ data }) => {
                    this.setState({
                        address: data.data
                    })
                }).catch(({ response }) => {
                    console.log(response.data)
                })
            axios.get(BASE_URL + '/kurir/jasa_pengiriman')
                .then(({ data }) => {
                    this.setState({
                        kurir: data.data
                    })
                }).catch(({ response }) => {
                    console.log(response.data)
                })
        });

        PushNotification.createChannel(
            {
                channelId: 'notif',
                channelName: 'My Notification channel',
                channelDescription: 'A channel to categories your notification',
                soundName: 'default',
                importance: 4,
                vibrate: true,
            },
            (created) => console.log(`createchannel returned '${created}'`),
        );
        // code to run on component mount

        PushNotification.getChannels((channel_ids) => {
            console.log(channel_ids);
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    setKurir = (e) => {
        const price = this.state.kurir.filter((jasa) =>{
            return jasa.id == e
        })
        console.log(price)
        this.setState({
            jasaKirim:e,
            shippingPrice:price[0].tarif
        })
    }

    render() {
        // console.log(this.props.bag.mybag[0])
        const { address, kurir, jasaKirim, shippingPrice, selectedPayment } = this.state
        // console.log(jasaKirim, shippingPrice, selectedPayment)
        let cardAdress;
        if (this.props.address.activeAddress != null) {
            cardAdress =
                <>
                    <CardAdress key={address.id} type={address.address_type} addressId={address.id} name={address.recipient_name} city={address.city} postal={address.postal} phone={address.phone} navigation={this.props.navigation} />
                </>
        } else {
            cardAdress =

                <Text>Belum ada alamat terpilih</Text>

        }
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
                            <Title style={{ color: 'black', marginLeft: 35, fontWeight: 'bold' }}>CheckOut</Title>
                        </Body>
                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0' }}>
                        <View style={{ margin: 10 }}>
                            <View style={{ height: 150 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom:10 }}>
                                    <Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 18 }}>Shipping Address</Text>
                                    <TouchableOpacity
                                        onPress={() => { this.props.navigation.navigate('Shipping') }}
                                    >
                                        <Text style={{ marginRight: 5, fontWeight: 'bold', fontSize: 18 }}>Change Address</Text>
                                    </TouchableOpacity>
                                </View>

                                {cardAdress}
                            </View>

                            <Text style={{ marginTop: 20, marginLeft: 5, fontWeight: 'bold', fontSize: 18 }}>Payment</Text>
                            <View style={{ flexDirection: 'row', marginRight: 10, height: 60, }}>
                                <Image source={require('./../../assets/icons/master.png')} style={{ width: 105, height: 88 }} />
                                <Text style={{ marginTop: 30, width: 120 }}>Master Card</Text>
                                <CheckBox style={{ marginLeft: 70, marginTop: 30 }} checked={this.state.isCheckedMaster} onPress={this.checkedMaster} />
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 10, height: 60, }}>
                                <Image source={require('./../../assets/icons/pos.png')} />
                                <Text style={{ marginTop: 30, width: 120 }}>Post Indonesia</Text>
                                <CheckBox style={{ marginLeft: 70, marginTop: 30 }} checked={this.state.isCheckedPost} onPress={this.checkedPost} />
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 10, height: 60, }}>
                                <Image source={require('./../../assets/icons/gopay.png')} />
                                <Text style={{ marginTop: 30, width: 120 }}>GoPay</Text>
                                <CheckBox style={{ marginLeft: 70, marginTop: 30 }} checked={this.state.isCheckedGopay} onPress={this.checkedGopay} />
                            </View>
                        </View>



                        <View style={{ backgroundColor: 'white', height: 160, marginTop: 50, borderTopEndRadius: 10, borderTopLeftRadius: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginVertical: 5 }}>
                                <Text style={{ width: 100, color: 'gray' }}>Order :</Text>
                                <Text>Rp. {this.props.bag.totalAmmount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row',justifyContent:'space-between', marginLeft:15, marginVertical: 5 }}>
                                <Text style={{ width: 80, color: 'gray' }}>Shipping :</Text>
                                <View style={{ width: 100, height: 40, marginTop: -15}}>
                                    <Picker
                                        // selectedValue={this.state.jasaKirim}
                                        selectedValue={jasaKirim}
                                        onValueChange={(itemValue, itemIndex) => this.setKurir(itemValue)}
                                    >
                                        <Picker.Item label="Jasa Kirim" value="0" style={{ backgroundColor: 'gray' }} />
                                        {
                                            kurir && kurir.map(({ id, nama_kurir, waktu, tarif }) => {
                                                return <Picker.Item label={nama_kurir + ', ' + waktu + ', ' + 'Rp.' + tarif} value={`${id}`} />
                                            })
                                        }
                                    </Picker>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginVertical: 5 }}>
                                <Text style={{ width: 100, color: 'gray' }}>Summary :</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Rp. {this.props.bag.totalAmmount + this.state.shippingPrice}</Text>
                            </View>
                            <Button full rounded danger style={{ margin: 10 }}
                                onPress={this.submitOrder}
                            >
                                <Text style={{ color: 'white' }}>
                                    Submit Order
                            </Text>
                            </Button>
                        </View>
                    </Content>
                </Container>
            </>
        )
    }
}

const mapStateToProps = ({ auth, address, bag, notification }) => {
    return {
        auth,
        address,
        bag,
        notification
    };
};

export default connect(mapStateToProps)(CheckOut);