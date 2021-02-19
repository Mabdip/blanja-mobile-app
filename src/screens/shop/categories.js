import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Card from '../../components/cardHome'
import { Container, Header, Title, Content, Button, Left, Body, Right, CheckBox } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid'
import axios from 'axios'
import { BASE_URL } from '@env'

class ShopCategory extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        products: [],
        pageInfo: [],
        modalVisible: false,
        modalSortVisible: false,
        isRed: false,
        isGreen: false,
        isBlue: false,
        isBlack: false,
        color: 0,
        sizeSelected: 0,
        catSelected: 0,
        selectedBrand: 0,
        axiosData: '',
        itemNotFound: ''
    }

    checkedRed = () => {
        this.setState({
            isRed: !this.state.isRed,
            isGreen: false,
            isBlue: false,
            isBlack: false,
        })
        if (this.state.color == 1) {
            this.setState({
                color: 0
            })
        } else {
            this.setState({
                color: 1
            })
        }
    }

    checkedGreen = () => {
        this.setState({
            isRed: false,
            isGreen: !this.state.isGreen,
            isBlue: false,
            isBlack: false,
        })
        if (this.state.color == 2) {
            this.setState({
                color: 0
            })
        } else {
            this.setState({
                color: 2
            })
        }
    }

    checkedBlue = () => {
        this.setState({
            isRed: false,
            isGreen: false,
            isBlue: !this.state.isBlue,
            isBlack: false,
        })
        if (this.state.color == 3) {
            this.setState({
                color: 0
            })
        } else {
            this.setState({
                color: 3
            })
        }
    }

    checkedBlack = () => {
        this.setState({
            isRed: false,
            isGreen: false,
            isBlue: false,
            isBlack: !this.state.isBlack,
        })
        if (this.state.color == 4) {
            this.setState({
                color: 0
            })
        } else {
            this.setState({
                color: 4
            })
        }
    }

    setSelectedValue = (e) => {
        this.setState({
            selectedBrand: e
        })
    }


    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    setModalSortVisible = (visible) => {
        this.setState({ modalSortVisible: visible });
    }



    Discard = () => {
        this.setState({
            isRed: false,
            isGreen: false,
            isBlue: false,
            isBlack: false,
            color: 0,
            sizeSelected: 0,
            catSelected: 0,
            selectedBrand: 0,
            modalVisible: false,
            baseUrl: ''
        })
    }

    Apply = () => {
        let axiosData = ''
        if (this.state.color != 0) {
            axiosData += `color=${this.state.color}&`
        }
        if (this.state.sizeSelected != 0) {
            axiosData += `size=${this.state.sizeSelected}&`
        }
        if (this.state.catSelected != 0) {
            axiosData += `category=${this.state.catSelected}&`
        }
        this.setState({
            axiosData: axiosData
        })
        let modifiedUrl = ''
        if (this.state.baseUrl != '/products?') {
            modifiedUrl = '&'
        }
        axios.get(BASE_URL + `${this.state.baseUrl}${modifiedUrl}` + axiosData)
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    modalVisible: false,
                    itemNotFound: ``
                })
            })
            .catch(err => {
                console.log(err.response.data)
                this.setState({
                    products: [],
                    modalVisible: false,
                    itemNotFound: `Oops, barang tidak ditemukan`
                })
            })
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

    refresh = () => {
        axios.get(BASE_URL + this.state.baseUrl)
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }


    componentDidMount = () => {
        if (this.props.route.params.categoryType === 'new') {
            axios.get(BASE_URL + '/products')
                .then(({ data }) => {
                    this.setState({
                        products: data.data.products,
                        pageInfo: data.data.pageInfo,
                        baseUrl: '/products?'
                    })
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            axios.get(BASE_URL + '/products?category=' + this.props.route.params.categoryType)
                .then(({ data }) => {
                    // console.log(data)
                    this.setState({
                        products: data.data.products,
                        pageInfo: data.data.pageInfo,
                        baseUrl: '/products?category=' + this.props.route.params.categoryType

                    })
                }).catch((error) => {
                    console.log(error.response.data)
                })
        }
    }

    nameAsc = () => {
        let modifiedUrl = ''
        if (this.state.baseUrl != '/products?') {
            modifiedUrl = '&'
        }
        this.setModalSortVisible(false)
        axios.get(BASE_URL + this.state.baseUrl + modifiedUrl + 'sortBy=product_name&orderBy=asc')
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    nameDesc = () => {
        let modifiedUrl = ''
        if (this.state.baseUrl != '/products?') {
            modifiedUrl = '&'
        }
        this.setModalSortVisible(false)
        axios.get(BASE_URL + this.state.baseUrl + modifiedUrl + 'sortBy=product_name&orderBy=desc')
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    priceAsc = () => {
        let modifiedUrl = ''
        if (this.state.baseUrl != '/products?') {
            modifiedUrl = '&'
        }
        this.setModalSortVisible(false)
        axios.get(BASE_URL + this.state.baseUrl + modifiedUrl + 'sortBy=product_price&orderBy=asc')
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    priceDesc = () => {
        let modifiedUrl = ''
        if (this.state.baseUrl != '/products?') {
            modifiedUrl = '&'
        }
        this.setModalSortVisible(false)
        axios.get(BASE_URL + this.state.baseUrl + modifiedUrl + 'sortBy=product_price&orderBy=desc')
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    rating = () => {
        let modifiedUrl = ''
        if (this.state.baseUrl != '/products?') {
            modifiedUrl = '&'
        }
        this.setModalSortVisible(false)
        axios.get(BASE_URL + this.state.baseUrl + modifiedUrl + 'sortBy=rating&orderBy=desc')
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    newest = () => {
        let modifiedUrl = ''
        if (this.state.baseUrl != '/products?') {
            modifiedUrl = '&'
        }
        this.setModalSortVisible(false)
        axios.get(BASE_URL + this.state.baseUrl + modifiedUrl + 'sortBy=create_at&orderBy=asc')
            .then(({ data }) => {
                this.setState({
                    products: data.data.products,
                    pageInfo: data.data.pageInfo,
                })
            }).catch((error) => {
                console.log(error)
            })
    }
    render() {
        const { products, pageInfo, modalVisible, modalSortVisible } = this.state
        let sizeXS = <Button bordered danger small onPress={() => { this.setState({ sizeSelected: 1 }) }} style={styles.btnSize}><Text>XS</Text></Button>
        let sizeS = <Button bordered danger small onPress={() => { this.setState({ sizeSelected: 2 }) }} style={styles.btnSize}><Text>S</Text></Button>
        let sizeM = <Button bordered danger small onPress={() => { this.setState({ sizeSelected: 3 }) }} style={styles.btnSize}><Text>M</Text></Button>
        let sizeL = <Button bordered danger small onPress={() => { this.setState({ sizeSelected: 4 }) }} style={styles.btnSize}><Text>L</Text></Button>
        let sizeXL = <Button bordered danger small onPress={() => { this.setState({ sizeSelected: 5 }) }} style={styles.btnSize}><Text>XL</Text></Button>
        if (this.state.sizeSelected == 1) {
            sizeXS = <Button danger small onPress={() => { this.setState({ sizeSelected: 1 }) }} style={styles.btnSize}><Text>XS</Text></Button>
        } else if (this.state.sizeSelected == 2) {
            sizeS = <Button danger small onPress={() => { this.setState({ sizeSelected: 2 }) }} style={styles.btnSize}><Text>S</Text></Button>
        } else if (this.state.sizeSelected == 3) {
            sizeM = <Button danger small onPress={() => { this.setState({ sizeSelected: 3 }) }} style={styles.btnSize}><Text>M</Text></Button>
        } else if (this.state.sizeSelected == 4) {
            sizeL = <Button danger small onPress={() => { this.setState({ sizeSelected: 4 }) }} style={styles.btnSize}><Text>L</Text></Button>
        }
        else if (this.state.sizeSelected == 5) {
            sizeXL = <Button danger small onPress={() => { this.setState({ sizeSelected: 5 }) }} style={styles.btnSize}><Text>XL</Text></Button>
        }
        return (
            <>
                <Header transparent style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={require('../../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ color: 'black', marginLeft: 50, fontWeight: 'bold' }}>{this.props.route.params.title}</Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={this.refresh}
                        >
                            <Image source={require('../../assets/icons/refresh.png')} />
                        </Button>
                    </Right>
                </Header>
                <Container style={{ backgroundColor: '#f0f0f0' }}>
                    <View style={styles.filter}>
                        <Grid>
                            <Col>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(true)
                                    }}
                                >
                                    <Text style={styles.txtFilter}> Filter <Image source={require('./../../assets/icons/filter.png')} /> </Text>
                                </TouchableOpacity>
                            </Col>
                            <Col>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalSortVisible(true)
                                    }}
                                >
                                    <Text style={styles.txtFilter}> Sort <Image source={require('./../../assets/icons/sort2.png')} /></Text>
                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    </View>
                    <Text>{this.state.itemNotFound}</Text>

                    <ScrollView>
                        <View style={styles.grid} >
                            {
                                products && products.map(({ id, product_name, product_price, product_img, category_name, color_name, size_name, rating, dibeli }) => {
                                    let img = product_img.split(',')[0]
                                    return (
                                        <>
                                            <Card navigation={this.props.navigation} product_name={product_name} product_price={product_price} product_img={img} keyId={id} category={category_name} color={color_name} size={size_name} rating={rating} dibeli={dibeli} />
                                        </>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button full small rounded bordered
                            onPress={this.prevPage}
                        >
                            <Text>{`<< `}Prev</Text>
                        </Button>
                        <Button full small rounded bordered style={{ width: 200 }}>
                            <Text>{pageInfo.currentPage}</Text>
                        </Button>
                        <Button small rounded bordered
                            onPress={this.nextPage}
                        >
                            <Text>Next {`>> `}</Text>
                        </Button>
                    </View>
                </Container>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Content style={{ backgroundColor: '#f0f0f0', width: 330 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, margin: 15 }}>Color</Text>
                                <View style={{ height: 80, backgroundColor: 'white' }}>
                                    <View style={{ marginTop: 15, marginRight: 15, flexDirection: 'row', justifyContent: "space-around" }}>
                                        <CheckBox color="red" checked={this.state.isRed} style={styles.btnColor} onPress={this.checkedRed} />
                                        <CheckBox color="green" checked={this.state.isGreen} style={styles.btnColor} onPress={this.checkedGreen} />
                                        <CheckBox color="blue" checked={this.state.isBlue} style={styles.btnColor} onPress={this.checkedBlue} />
                                        <CheckBox color="black" checked={this.state.isBlack} style={styles.btnColor} onPress={this.checkedBlack} />
                                    </View>
                                </View>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, margin: 15 }}>Sizes</Text>
                                <View style={{ height: 60, backgroundColor: 'white', paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
                                    {sizeXS}
                                    {sizeS}
                                    {sizeM}
                                    {sizeL}
                                    {sizeXL}
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 5 }}>
                                    <Button full rounded bordered dark style={styles.btn}
                                        onPress={this.Discard}
                                    >
                                        <Text>Discard</Text>
                                    </Button>
                                    <Button full rounded danger style={styles.btn}
                                        onPress={this.Apply}
                                    >
                                        <Text>Apply</Text>
                                    </Button>
                                </View>
                            </Content>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalSortVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ width: '100%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'white' }}>Close [x]</Text>
                                    <Text style={{ fontSize: 18, textAlign: 'center' }}>Sort By</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setModalSortVisible(false)
                                        }}
                                    >
                                        <Text>Close [x]</Text>
                                    </TouchableOpacity>
                                </View>
                                <Button transparent style={styles.btnModal}
                                    onPress={this.nameDesc}
                                >
                                    <Text style={{ fontSize: 18 }}>Sort By Name: Z-A</Text>
                                </Button>
                                <Button transparent style={styles.btnModal}
                                    onPress={this.nameAsc}
                                >
                                    <Text style={{ fontSize: 18 }}>Sort By Name: A-Z</Text>
                                </Button><Button transparent style={styles.btnModal}
                                    onPress={this.priceAsc}
                                >
                                    <Text style={{ fontSize: 18 }}>Sort By Price: Low to High</Text>
                                </Button><Button transparent style={styles.btnModal}
                                    onPress={this.priceDesc}
                                >
                                    <Text style={{ fontSize: 18 }}>Sort By Price: High to Low</Text>
                                </Button><Button transparent style={styles.btnModal}
                                    onPress={this.rating}
                                >
                                    <Text style={{ fontSize: 18 }}>Sort By Rating</Text>
                                </Button><Button transparent style={styles.btnModal}
                                    onPress={this.newest}
                                >
                                    <Text style={{ fontSize: 18 }}>Sort By Newest</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalView: {
        height: 320,
        width: 350,
        backgroundColor: "white",
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    btn: {
        width: 80,
        marginHorizontal: 5
    },
    btnSize: {
        width: 30,
        justifyContent: 'center',
        color: '#d9534f'
    },
    btnColor: {
        borderRadius: 30,
        width: 30,
        height: 30
    },
    btnModal: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: 330,

    }
});