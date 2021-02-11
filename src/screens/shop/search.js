import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Card from '../../components/cardHome'
import { Container, Header, Title, Content, Button, Left, Body, Right, Form, Item, Label, Input } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid'
import axios from 'axios'
import { BASE_URL } from '@env'

class ShopCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            pageInfo: {},
            currentPage: '',
            intialPage: '',
            searchKey: '',
            emptyResult: ''
        }
    }

    nextPage = () => {
        const nextPage = this.state.pageInfo.nextpage
        if (nextPage != null) {
            axios.get(BASE_URL + nextPage)
                .then(({ data }) => {
                    this.setState({
                        products: data.data.products,
                        pageInfo: data.data.pageInfo,
                    })
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    prevPage = () => {
        const prevPage = this.state.pageInfo.previousPage
        if (prevPage != null) {
            axios.get(BASE_URL + prevPage)
                .then(({ data }) => {
                    this.setState({
                        products: data.data.products,
                        pageInfo: data.data.pageInfo,
                    })
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    SearchItems = () => {
        axios.get(BASE_URL + '/products?name=' + this.state.searchKey)
            .then(({ data }) => {
                // console.log(data)
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo
                })
            }).catch((error) => {
                this.setState({
                    products: [],
                    emptyResult: `Pencarian tidak ditemukan untuk produk ${this.state.searchKey}`
                })
                console.log(error)
            })
    }

    Refresh = () => {
        this.getInitialData()
    }

    render() {
        const { products, pageInfo } = this.state
        let searchResult;
        if (products.length > 0) {
            searchResult = <>
                <View style={styles.grid} >
                    {
                        products && products.map(({ id, product_name, product_price, product_img, category_name, color_name, size_name, rating, dibeli }) => {
                            let img = product_img.split(',')[0]
                            return (
                                <>
                                    <Card navigation={this.props.navigation}  key={id} product_name={product_name} product_price={product_price} product_img={img} keyId={id} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} />
                                </>
                            )
                        })
                    }
                </View>
            </>
        } else {
            searchResult = <><Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>{this.state.emptyResult}</Text></>
        }
        return (
            <>
                <Header transparent style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={require('../../assets/icons/back.png')} />
                        </Button>
                        <Title style={{ position: 'absolute', color: 'black', marginLeft: 30, marginTop: 10, fontWeight: 'bold' }}>Search</Title>
                    </Left>
                    <Body >
                        
                    </Body>
                </Header>
                <Container style={{ backgroundColor: '#f0f0f0' }}>
                    <ScrollView>
                        <Form style={{ marginBottom: 10 }}>
                            <Item floatingLabel>
                                <Label>Keyword</Label>
                                <Input name="searchKey" value={this.state.searchKey} onChangeText={(text) => { this.setState({ searchKey: text }) }} />
                            </Item>
                            <Button full rounded danger small style={{ marginHorizontal: 15, marginTop: 20 }}
                                onPress={this.SearchItems}
                            >
                                <Text style={{ color: 'white' }}>Search</Text>
                            </Button>
                        </Form>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
                            <Text style={{ fontSize: 18 }}>
                                Search result for {this.state.searchKey}
                            </Text>
                        </View>
                        <View style={{ minHeight: 480 }}>
                            {searchResult}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 5 }}>
                            <Button bordered
                                onPress={this.prevPage}
                                style={{width: 50, height: 25, borderRadius: 10, top: 5}}>
                                <Text style={{left: 10}}>Prev</Text>
                            </Button>
                            <Button full small rounded bordered style={{ width: 200}}>
                                <Text>{pageInfo.currentPage}</Text>
                            </Button>
                            <Button bordered
                                onPress={this.nextPage}
                                style={{width: 50, height: 25, borderRadius: 10, top: 5}}
                            >
                                <Text style={{left: 10}}>Next</Text>
                            </Button>
                        </View>
                    </ScrollView>
                </Container>
            </>
        );
    }
}

export default ShopCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 10
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        marginLeft: 10
    },
    filter: {
        marginLeft: 10,
        marginBottom: 10, flexDirection: 'row',
        justifyContent: 'center'
    },
    txtFilter: {
        fontSize: 20
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DB3022",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10
    },
    ctgTitle: {
        fontFamily: 'Metropolis-Bold',
        fontSize: 34,
        fontWeight: '700',
        marginTop: 5,

    },
    btnTitle: {
        color: '#fff',
        fontSize: 35,
    },
    btnSub: {
        color: '#fff',
        fontSize: 18,
    },
    card: {
        marginVertical: 10
    },
    cardTitle: {
        flex: 1,
        textAlign: 'center',
    }
});