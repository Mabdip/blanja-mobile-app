import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Right } from "native-base";
import { Image, View, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { setLoginfalse, removeEmail, removeId, removeName } from './../../utils/redux/ActionCreators/auth'
// import EmptyPage from './../emptyScreen/index'
import { BASE_URL } from '@env'
import axios from 'axios'

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        order: [],
        address: [],
    }

    getMyOrder = () => {
        axios.get(BASE_URL + '/transaksi/myTransaction/' + this.props.auth.id)
            .then(({ data }) => {
                this.setState({
                    order: data.data
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    getAddress = () => {
        axios.get(BASE_URL + `/address/${this.props.auth.id}`)
            .then(({ data }) => {
                // console.log(data)
                this.setState({
                    address: data.data
                })
            }).catch(({ response }) => {
                console.log(response)
            })
    }

    promptLogout = () => {
        Alert.alert(
            'Logout',
            'Apakah anda yakin ingin logout',
            [
                { text: 'NO', style: 'cancel' },
                { text: 'YES', onPress: () => this.Logout() },

            ])
    }

    Logout = () => {
        this.props.dispatch(setLoginfalse())
        this.props.navigation.navigate('Login')
    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if (!this.props.auth.isLogin) {
                this.props.navigation.navigate('Login')
            } else {
                this.getAddress()
                this.getMyOrder()
            }
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render() {
        let componentProfile;
        const { auth } = this.props
        if (auth.level == 2) {
            componentProfile =
                <>
                    <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                        onPress={() => { this.props.navigation.navigate('Store') }}
                    >
                        <View style={{ paddingLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>My Store</Text>
                            <Text style={{ color: 'gray', marginBottom: 10 }}>Manage your store products here</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                        onPress={() => { this.props.navigation.navigate('OrderedItem') }}
                    >
                        <View style={{ paddingLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Orders</Text>
                            <Text style={{ color: 'gray', marginBottom: 10 }}>Manage your Ordered Item</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                            onPress={() => { this.props.navigation.navigate('Chat') }}
                        >

                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Chat</Text>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>Chat Fiture</Text>
                            </View>
                        </TouchableOpacity>
                </>
        } else {
            componentProfile = <>
                <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                    onPress={() => { this.props.navigation.navigate('Orders') }}
                >
                    <View style={{ paddingLeft: 10, marginTop: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>My Orders</Text>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>Already {this.state.order.length} orders</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                    onPress={() => { this.props.navigation.navigate('Shipping') }}>
                    <View style={{ paddingLeft: 10, marginTop: 5 }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Shipping Adress</Text>
                        <Text style={{ color: 'gray', marginBottom: 10 }}>{this.state.address.length} Shipping Adress</Text>
                    </View>
                </TouchableOpacity>
            </>
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
                        <Body />
                        <Right>
                            <Button transparent>
                                <Image source={require('./../../assets/search.png')} />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Text style={{ fontWeight: 'bold', fontSize: 42, marginLeft: 10, marginRight: 10 }}>My Profile</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Image source={require('./../../assets/profile.png')} style={{ width: 80, height: 80, borderRadius: 40, marginLeft: 10, marginRight: 10, marginBottom: 50 }} />
                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{this.props.auth.name}</Text>
                                <Text style={{ color: 'gray' }}>{this.props.auth.email}</Text>
                            </View>
                        </View>
                        {componentProfile}
                        <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                            onPress={() => { this.props.navigation.navigate('Setting') }}
                        >

                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Settings</Text>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>Notification, Password</Text>
                            </View>
                        </TouchableOpacity>
                    </Content>
                    <Button full rounded danger style={{ marginHorizontal: 10, marginBottom: 15 }}
                        onPress={this.promptLogout}
                    >
                        <Text>Logout</Text>
                    </Button>
                </Container>

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

export default connect(mapStateToProps)(Profile);