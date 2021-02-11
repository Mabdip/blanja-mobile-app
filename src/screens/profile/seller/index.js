import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Right } from "native-base";
import { Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { BASE_URL } from "@env"
import axios from 'axios'

class UserStore extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        userDetails: {}
    }

    getUserDetails = () => {
        axios.get(BASE_URL + '/user/details/' + this.props.auth.id)
            .then(({ data }) => {
                this.setState({
                    userDetails: data.data
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    componentDidMount = () => {
        this.getUserDetails()
    }

    render() {
        const { userDetails } = this.state
        console.log(userDetails)
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
                            <Button transparent>
                                {/* <Image source={require('./../../../assets/icons/Search.png')} /> */}
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Text style={{ fontWeight: 'bold', fontSize: 42, marginLeft: 10, marginRight: 10 }}>My Store</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Image source={require('./../../../assets/profile.png')} style={{ width: 80, height: 80, borderRadius: 40, marginLeft: 10, marginRight: 10, marginBottom: 50 }} />
                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{userDetails.storeName}</Text>
                                <Text style={{ color: 'gray' }}>{userDetails.fullname}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                            onPress={() => { this.props.navigation.navigate('AddProduct') }}
                        >
                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Add products</Text>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>Add your new Product here</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginLeft: 10, marginRight: 40 }}
                            onPress={() => { this.props.navigation.navigate('ListProduct') }}
                        >
                            <View style={{ paddingLeft: 10, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>List product</Text>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>Manage your store products here</Text>
                            </View>
                        </TouchableOpacity>
                    </Content>
                </Container>
            </>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(UserStore)