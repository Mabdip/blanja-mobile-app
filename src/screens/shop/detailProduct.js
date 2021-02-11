import React, { Component } from 'react'
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Picker, ToastAndroid, Alert } from 'react-native';
import CardProduct from '../../components/cardHome'
import Review from './../../components/review'
import { Left, Body, Title, Button, Container, Header, Form, Textarea, } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import axios from 'axios'
import { addItems } from './../../utils/redux/ActionCreators/bag'
import { connect } from 'react-redux'
import { BASE_URL } from '@env'
import Card from './../../components/cardForYou'


class DetailPage extends Component {
    state = {
        product: [],
        foryou: [],
        FavTrue: false,
        itemsId: this.props.route.params.itemId,
        selectedSize: 0,
        selectedColor: 0
    };

    componentDidMount = () => {
        axios.get(`${BASE_URL}/product/getProductData/` + this.props.route.params.itemId)
            .then(({ data }) => {
                console.log(data.data)
                this.setState({
                    product: data.data
                })
            }).catch((error) => {
                console.log(error.response.data)
            })
        axios.get(BASE_URL + '/products?sortBy=rating&orderBy=desc')
            .then(({ data }) => {
                // console.log(data)
                this.setState({
                    foryou: data.data.products,
                })
            }).catch((error) => {
                console.log(error.response.data)
            })
    }

    Bookmark = () => {
        this.setState({
            FavTrue: !this.state.FavTrue
        })
    }


    setSize = (e) => {
        this.setState({
            selectedSize: e
        })
    }

    setColor = (e) => {
        this.setState({
            selectedColor: e
        })
    }

    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    loginDuluhehe = () => {
        ToastAndroid.show("Bukan Costumer Hehe.", ToastAndroid.SHORT);
    }

    addToCart = () => {
        const { navigation } = this.props
        if (this.state.selectedColor == 0 || this.state.selectedSize == 0) {
            Alert.alert(
                'Kesalahan',
                'Harap memilih warna dan ukuran',
                [
                    { text: 'OK', style: 'cancel' },

                ])
        } else {
            const Items = {
                user_id: this.props.auth.id,
                product_id: this.props.route.params.itemId,
                product_name: this.state.product[0].product_name,
                product_img: this.state.product[0].product_img.split(',')[0],
                color: this.state.selectedColor,
                size: this.state.selectedSize,
                price: this.state.product[0].product_price,
                qty: 1,
                storeName: this.state.product.storeName
            }
            console.log(Items)
            this.props.dispatch(addItems(Items))
            ToastAndroid.show("Berhasil menambah item ke keranjang.", ToastAndroid.SHORT);
        }
    }

    render() {
        const { product, foryou } = this.state
        let btnChat;
        let btnAddCart;
        if (this.props.auth.level==1) {
            btnChat = <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Chat', {
                        room_id: `S${product[0].seller_id}B${this.props.auth.id}`
                    })
                }}>
                <View style={styles.love}>
                    <Image source={require('./../../assets/icons/chat.png')} />
                </View>
            </TouchableOpacity>
            btnAddCart =
                <Button danger full rounded style={{ marginVertical: 15 }}
                    onPress={this.addToCart}
                >

                    <Text style={{ color: '#fff' }}> Add to Cart </Text>
                </Button>
        } else {
            btnChat =
                <TouchableOpacity
                    onPress={this.loginDuluhehe}
                >
                    <View style={styles.love}>
                        <Image source={require('./../../assets/icons/chat.png')} />
                    </View>
                </TouchableOpacity>
        }
        const id_productDetails = this.props.route.params.itemId
        return (
            <>

                {
                    product && product.map(({ id, product_name, storeName, category_name, product_desc, product_img, product_price, size_name, color_name, rating }) => {

                        return (
                            <>
                                <Header transparent>
                                    <Left>
                                        <Button transparent
                                            onPress={() => { this.props.navigation.goBack() }}
                                        >
                                            <Image source={require('./../../assets/back.png')} />
                                        </Button>
                                    </Left>
                                    <Body >
                                        <Title style={{ color: 'black', fontWeight: 'bold', width: 150 }}>{product_name}</Title>
                                    </Body>
                                </Header>

                                <Container>
                                    <Grid>
                                        <SafeAreaView>
                                            <ScrollView id={id}>
                                                <Row size={50}>
                                                    <View style={styles.imgwrap}>
                                                        <SafeAreaView>
                                                            <ScrollView horizontal={true}>
                                                                {
                                                                    product_img && product_img.split(',').map((img) => {
                                                                        return (
                                                                            <>
                                                                                <Image source={{ uri: BASE_URL + img, width: 360, height: 400 }} />
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </ScrollView>
                                                        </SafeAreaView>
                                                    </View>
                                                </Row>

                                                <Row size={50}>
                                                    <View style={styles.container}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={styles.size}>
                                                                <Picker
                                                                    selectedValue={this.state.selectedSize}
                                                                    onValueChange={(itemValue, itemIndex) => this.setSize(itemValue)}
                                                                >
                                                                    <Picker.Item label="Size" value="0" style={{ backgroundColor: 'gray' }} />
                                                                    <Picker.Item label={size_name} value={size_name} />
                                                                </Picker>
                                                            </View>
                                                            <View style={styles.size}>
                                                                <Picker
                                                                    selectedValue={this.state.selectedColor}
                                                                    onValueChange={(itemValue, itemIndex) => this.setColor(itemValue)}
                                                                >
                                                                    <Picker.Item label="Color" value="0" />
                                                                    <Picker.Item label={color_name} value={color_name} />
                                                                </Picker>
                                                            </View>
                                                            {btnChat}
                                                        </View>
                                                        <View style={styles.wraptitle}>
                                                            <View style={{ width: 200 }}>
                                                                <Text style={styles.title}>{product_name}</Text>
                                                            </View>
                                                            <Text style={styles.title}>Rp. {this.toPrice(product_price)}</Text>
                                                        </View>
                                                        <Text style={{color:'gray'}}>STORE : {storeName}</Text>
                                                        <Text style={styles.PrdName}>Category  {category_name}</Text>
                                                        <View>
                                                        </View>
                                                        <Text>Product Description</Text>
                                                        <Text style={styles.desc}>
                                                            {product_desc}
                                                        </Text>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Pilihan lainya untukmu</Text>
                                                        <SafeAreaView>
                                                            <ScrollView
                                                                horizontal={true}
                                                            >
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    {
                                                                        foryou && foryou.map(({ id, product_name, product_price, product_img, category_name, color_name, size_name, rating, dibeli }) => {
                                                                            let img = product_img.split(',')[0]
                                                                            return (
                                                                                <>
                                                                                    <Card navigation={this.props.navigation} key={id} product_name={product_name} product_price={product_price} product_img={img} keyId={id} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} />
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </View>
                                                            </ScrollView>
                                                        </SafeAreaView>
                                                        <Review idProduct={id_productDetails} avgRating={rating} />
                                                    </View>
                                                </Row>
                                            </ScrollView>
                                        </SafeAreaView>
                                    </Grid>
                                    {btnAddCart}
                                </Container>
                            </>
                        )
                    })
                }
            </>
        );
    }
}

const mapStateToProps = ({ auth, bag }) => {
    return {
        auth,
        bag
    };
};

export default connect(mapStateToProps)(DetailPage);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        marginLeft: windowWidth * 0.02,
        marginRight: windowWidth * 0.02,
        marginTop: windowWidth * 0.04,
    },
    imgwrap: {
        flexDirection: 'row',
    },
    image: {
        width: 275,
        height: 413,
    },
    addcart: {
        position: 'absolute',
        bottom: 0,
        top: undefined,
    },
    btn: {
        backgroundColor: '#DB3022',
        width: "100%",
        height: 48,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 24,
    },
    title: {
        fontFamily: 'Metropolis-Light',
        fontSize: 24,

    },
    wraptitle: {
        flexDirection: 'row',
        marginTop: 22,
        justifyContent: 'space-between',
        marginRight: 20
    },
    PrdName: {
        fontFamily: 'Metropolis-Light',
        fontSize: 11,
        color: '#9B9B9B',
    },
    rating: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    desc: {
        fontFamily: 'Metropolis',
        color: 'gray',
        marginBottom: 10
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginBottom: 12,
    },
    card: {
        flexDirection: 'row',
    },
    sizecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    love: {
        height: 36,
        width: 36,
        alignItems: 'center',
        paddingVertical: 13,
        borderRadius: 18,
        marginTop: -5,
    },
    size: {
        width: 140,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#9B9B9B',
        marginRight: 10
        // paddingHorizontal: 5,
    },
});