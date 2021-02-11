import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import CardBag from '../../components/cardBag';
import { Container, Header, Title, Content, Button, Left, Right } from "native-base";
import { connect } from 'react-redux'
import { BASE_URL } from '@env'
import axios from 'axios'

class Mybag extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        emptyBag: false
    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if (!this.props.auth.isLogin || this.props.auth.level != 1) {
                this.props.navigation.navigate('Home')
            }
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render() {
        const bagState = this.props.bag.mybag
        let thisBag;
        let btnCheckout;
        if (bagState.length < 1) {
            thisBag = <><View><Text>Cart anda masih kosong</Text></View></>
        } else {
            thisBag = <>
                {
                    bagState && bagState.map(({ product_id, product_img, product_name, color, size, qty, price }) => {
                        return (
                            <>
                                <CardBag productId={product_id} img={product_img} name={product_name} color={color} size={size} qty={qty} price={price} />
                            </>
                        )
                    })
                }
            </>
            btnCheckout =
                <>
                    <Button full rounded danger style={{ marginHorizontal: 10, marginBottom: 10 }}
                        onPress={() => { this.props.navigation.navigate('Checkout') }}
                    >
                        <View style={styles.btn}>
                            <Text style={{ color: '#fff' }}>CHECK OUT</Text>
                        </View>
                    </Button>
                </>
        }
        return (
            <>
                <Container style={{ backgroundColor: '#f0f0f0' }}>
                    <Header transparent style={{ backgroundColor: 'white' }}>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('./../../assets/back.png')} />
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent>
                                <Image source={require('./../../assets/search.png')} />
                            </Button>
                        </Right>
                    </Header>
                    <View style={styles.container}>
                        <Text
                            style={{
                                fontFamily: 'Metropolis-Bold',
                                fontSize: 34,
                                fontWeight: '700',
                                marginTop: 15,
                                marginBottom: 24,
                            }}>My Bag</Text>
                        <View style={{ height: 400 }}>
                            <SafeAreaView>
                                <ScrollView>
                                    {thisBag}
                                </ScrollView>
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={styles.addcart}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: '#fff',
                                marginHorizontal: 10,
                                marginVertical: 20,
                            }}>
                            <Text style={{ fontFamily: 'Metropolis-Light', color: '#9B9B9B' }}>
                                Total amount:</Text>
                            <Text style={{ fontFamily: 'Metropolis-Bold' }}>Rp. {this.props.bag.totalAmmount}</Text>
                        </View>
                        {btnCheckout}
                    </View>
                </Container>
            </>
        );
    }
}
const mapStateToProps = ({ auth, bag }) => {
    return {
        auth, bag
    };
};

export default connect(mapStateToProps)(Mybag);

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: windowWidth * 0.04,
    },
    addcart: {
        position: 'absolute',
        borderTopEndRadius: 10,
        borderTopLeftRadius: 20,
        width: windowWidth,
        bottom: 0,
        top: undefined,
        backgroundColor: '#fff',
    },
});