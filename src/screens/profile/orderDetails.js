import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Form, Item, Input, Label } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Modal, Alert, ToastAndroid} from 'react-native'
import { BASE_URL } from '@env'
import axios from 'axios'
import { connect } from 'react-redux'

import CardOrder from '../../components/cardOrderDetail'

class OrderDetails extends React.Component {

    state = {
        orderDetails: [],
        modalTrackingVisible: false,
        trackNumb: ''
    }

    getDataTransaksi = () => {
        axios.get(BASE_URL + '/transaksi/getOrderDetail/' + this.props.route.params.trxId)
            .then(({ data }) => {
                this.setState({
                    orderDetails: data.data
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    componentDidMount = () => {
        this.getDataTransaksi()
    }

    setModalVisible = (e) => {
        this.setState({
            modalTrackingVisible: e
        })
    }

    changeStatus = (e) => {
        axios.patch(BASE_URL + `/transaksi/changeStatus/${e}/${this.state.orderDetails.TrxId}`)
            .then(({ data }) => {
                ToastAndroid.show(data.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                this.getDataTransaksi()
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    kirimPesanan = () => {
        const regexKurir = RegExp(this.state.orderDetails.regex)
        if(this.state.trackNumb != '' && regexKurir.test(this.state.trackNumb) && this.state.trackNumb.length == 10){
            axios.patch(BASE_URL + `/transaksi/updateResi/${this.state.orderDetails.TrxId}/${this.state.trackNumb}`)
            .then(({ data }) => {
                ToastAndroid.show(data.message+' memasukan no. resi', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                this.changeStatus(3)
                this.setState({
                    modalTrackingVisible: false
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
        }else{
            Alert.alert(
                'No. Resi tidak valid',
                'Harap masukan No. Resi yang valid!',
                [
                  {text: 'OK', style: 'cancel'},
                ])
        }
    }

    render() {
        const { TrxId, created_at, trackingNumber, status, qty, address, city, postal, payment, total, cardOrder, nama_kurir, waktu, tarif } = this.state.orderDetails
        const { trackNumb, modalTrackingVisible } = this.state
        console.log(this.state.trackNumb)
        const newDate = `${created_at}`
        let statusDelivery;
        let btnAction;
        if (status == 1) {
            //order masuk
            statusDelivery = <Text style={{ color: 'black', fontWeight: 'bold' }}>Status : ORDER CREATED</Text>
            if (this.props.auth.level == 2) {
                btnAction =

                    <Button full rounded danger
                        onPress={() => { this.changeStatus(2) }}
                    >
                        <Text>Terima Pesanan</Text>
                    </Button>
            }
        } else if (status == 2) {
            //diproses
            statusDelivery = <Text style={{ color: 'orange', fontWeight: 'bold' }}>Status : ON PROCCESS</Text>
            if (this.props.auth.level == 2) {
                btnAction =
                    <Button full rounded danger
                        // onPress={() => { this.changeStatus(3) }}
                        onPress={() => {
                            this.setModalVisible(true)
                        }}
                    >
                        <Text>Kirim Pesanan</Text>
                    </Button>
            }

        } else if (status == 3) {
            //dikirim
            statusDelivery = <Text style={{ color: 'orange', fontWeight: 'bold' }}>Status : ON DELIVERY</Text>
            if (this.props.auth.level == 1) {
                btnAction =
                    <Button full danger rounded
                        onPress={() => { this.changeStatus(4) }}
                    >
                        <Text>Konfirmasi Barang</Text>
                    </Button>
            }
        } else if (status == 4) {
            statusDelivery = <Text style={{ color: 'green', fontWeight: 'bold' }}>Status : ORDER FINISHED</Text>
            if (this.props.auth.level == 1) {
                btnAction =
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button full rounded bordered dark style={styles.btn}
                                onPress={() => { this.props.navigation.navigate('Home') }}
                            >
                                <Text>Reorder</Text>
                            </Button>
                            <Button full rounded danger style={styles.btn}
                                onPress={() => {
                                    this.props.navigation.navigate('Review', {
                                        trxId: TrxId
                                    })
                                }}
                            >
                                <Text>Beri Ulasan</Text>
                            </Button>
                        </View>
                    </>
            }
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
                            <Title style={{ color: 'black', fontWeight: 'bold', marginLeft: 20 }}>Order Details</Title>
                        </Body>
                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0', marginHorizontal: 10 }}>
                        <View style={{minHeight:350}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Order No :
                                <Text style={{ color: 'gray', }}> {TrxId}</Text>
                            </Text>
                            <Text style={{ color: 'green' }}>{newDate.substr(0, 10)}</Text>
                        </View>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 18 }}>
                            Tracking Number :
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}> {trackingNumber}</Text>
                        </Text>
                        {statusDelivery}
                        <Text style={{ fontWeight: 'bold', marginBottom: 15, marginTop: 10 }}>{qty} Items</Text>

                        {
                            cardOrder && cardOrder.map(({ product_name, price, product_img, color, size, qty }) => {
                                return (
                                    <>
                                        <CardOrder name={product_name} price={price} img={product_img} color={color} size={size} qty={qty} />
                                    </>
                                )
                            })
                        }
                        </View>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Order Information</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'gray', width: 125, marginBottom: 10 }}>Shipping Address  </Text>
                            <Text style={{ width: 215, fontWeight: 'bold' }}>{address}, {city}, ID {postal}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 30, marginBottom: 10 }}>
                            <Text style={{ width: 125, color: 'gray' }}>Payment Method </Text>
                            <Text>{payment}</Text>
                            <Text style={{ width: 135 }}> **** 8932</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ color: 'gray', width: 125 }}>Delivery Method  </Text>
                            <Text style={{ width: 215, fontWeight: 'bold' }}>{nama_kurir}, {waktu}, Rp. {tarif}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ color: 'gray', width: 125 }}>Discount  </Text>
                            <Text style={{ width: 215, fontWeight: 'bold' }}>-</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ color: 'gray', width: 125 }}>Total Amount  </Text>
                            <Text style={{ width: 215, fontWeight: 'bold' }}>Rp. {total}</Text>
                        </View>
                        {btnAction}
                    </Content>
                </Container>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalTrackingVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Form>
                                <Item>
                                    {/* <Label>No. Resi</Label> */}
                                    <Input name="product_name" value={trackNumb} onChangeText={(text) => { this.setState({ trackNumb: text }) }} placeholder='Masukan No. Resi (10 Karakter)' />
                                </Item>
                            </Form>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 10 }}>
                                <Button full rounded bordered style={styles.btnTracking}
                                    onPress={() => {
                                        this.setModalVisible(false)
                                    }}
                                >
                                    <Text style={{ color: 'black' }}>Cancel</Text>
                                </Button>
                                <Button full rounded danger style={styles.btnTracking}
                                    onPress={this.kirimPesanan}
                                >
                                    <Text style={{color:'white'}}>Kirim</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </>
        )
    }
}
const mapStateToProps = ({ auth, bag }) => {
    return {
        auth,
        bag
    };
};

export default connect(mapStateToProps)(OrderDetails);

const styles = StyleSheet.create({
    btn: {
        width: 150
    },
    btnTracking: {
        width: 130,
        marginHorizontal: 5

    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modalView: {
        height: 130,
        width: 350,
        backgroundColor: "white",
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
})