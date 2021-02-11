import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Footer, FooterTab, Icon, Left, Body, Textarea, View, Form, Text, Label } from "native-base";
import { Image, Picker, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import { BASE_URL } from '@env';
import { connect } from 'react-redux';
import axios from 'axios';


class writeReview extends Component {
    state = {
        listProduct: [],
        selectedProduct: 0,
        star: 1,
        review: ''
    }

    getDataTrx = () => {
        axios.get(BASE_URL + '/transaksi/trx/' + this.props.route.params.trxId)
            .then(({ data }) => {
                this.setState({
                    listProduct: data.data
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    setProduct = (e) => {
        this.setState({
            selectedProduct: e
        })
    }

    setRating = (e) => {
        this.setState({
            star: e
        })
    }

    submitReview = () => {
        if (this.state.selectedProduct != 0) {
            const reviewData = {
                user_id: this.props.auth.id,
                product_id: this.state.selectedProduct,
                rating: this.state.star,
                review: this.state.review
            }
            axios.post(BASE_URL + '/user/addReview', reviewData)
                .then(({ data }) => {
                    ToastAndroid.show(data.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    this.props.navigation.goBack()
                }).catch(({ response }) => {
                    console.log(response.data)
                })
        } else {
            Alert.alert(
                'Kesalahan',
                'Harap pilih produk yang ingin direview',
                [
                  {text: 'OK', style: 'cancel'},
                  
                ])
        }
    }

    componentDidMount = () => {
        this.getDataTrx()
    }

    render() {
        const { listProduct, selectedProduct, star } = this.state
        let rating;
        if (star == 1) {
            rating =
                <>
                    <TouchableOpacity
                        onPress={() => this.setRating(1)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(2)}
                    >
                        <Image source={require('./../../assets/icons/emptystar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(3)}
                    >
                        <Image source={require('./../../assets/icons/emptystar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(4)}
                    >
                        <Image source={require('./../../assets/icons/emptystar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(5)}
                    >
                        <Image source={require('./../../assets/icons/emptystar.png')} />
                    </TouchableOpacity>
                </>
        } else if (star == 2) {
            rating =
                <>
                    <TouchableOpacity
                        onPress={() => this.setRating(1)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(2)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(3)}
                    >
                        <Image source={require('./../../assets/icons/emptystar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(4)}
                    >
                        <Image source={require('./../../assets/icons/emptystar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(5)}
                    >
                        <Image source={require('./../../assets/icons/emptystar.png')} />
                    </TouchableOpacity>
                </>
        } else if (star == 3) {
            rating =
                <>
                    <TouchableOpacity
                        onPress={() => this.setRating(1)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(2)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(3)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(4)}
                    >
                        <Image source={require('./../../assets/icons/emptystar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(5)}
                    >
                        <Image source={require('./../../assets/icons/emptystar.png')} />
                    </TouchableOpacity>
                </>
        } else if (star == 4) {
            rating =
                <>

                    <TouchableOpacity
                        onPress={() => this.setRating(1)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(2)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(3)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(4)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(5)}
                    >
                        <Image source={require('./../../assets/icons/emptystar.png')} />
                    </TouchableOpacity>
                </>
        } else if (star == 5) {
            rating =
                <>
                    <TouchableOpacity
                        onPress={() => this.setRating(1)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(2)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(3)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(4)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setRating(5)}
                    >
                        <Image source={require('./../../assets/icons/fillstar.png')} />
                    </TouchableOpacity>
                </>
        }
        return (
            <Container >
                <Header transparent>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Image source={require('./../../assets/back.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black', marginLeft: 20, fontWeight: 'bold' }}>Write a Review</Title>
                    </Body>
                </Header>
                <Content padder style={{ backgroundColor: '#f0f0f0' }}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>Beri ulasan untuk transaksi {this.props.route.params.trxId}</Text>
                    <Label>Pilih Produk</Label>
                    <View style={{ borderWidth: 1, borderColor: 'red', borderRadius: 5, marginBottom: 20 }}>
                        <Picker
                            selectedValue={selectedProduct}
                            onValueChange={(itemValue, itemIndex) => this.setProduct(itemValue)}
                        >
                            <Picker.Item label="product" value='0' style={{ backgroundColor: 'gray' }} />
                            {
                                listProduct && listProduct.map(({ id,product_id, product_name }) => {
                                    return <Picker.Item label={product_name} value={product_id} />
                                })
                            }
                        </Picker>
                    </View>
                    <Label>Beri rating</Label>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text></Text>
                        {rating}
                        <Text></Text>

                    </View>
                    <Form>
                        <Label>Review</Label>
                        <Textarea rowSpan={5} bordered placeholder='Write review here...' onChangeText={(text) => { this.setState({ review: text }) }} />
                    </Form>
                    <Button full rounded danger style={{ marginTop: 15 }}
                        onPress={this.submitReview}
                    >
                        <Text>
                            Submit Review
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, bag }) => {
    return {
        auth,
        bag
    };
};

export default connect(mapStateToProps)(writeReview);