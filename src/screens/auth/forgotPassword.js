import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Right } from 'native-base';
import {ToastAndroid} from 'react-native'
import { setEmail } from './../../utils/redux/ActionCreators/auth'
import { connect } from 'react-redux'
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '@env'

class ForgotPassword extends React.Component {
    state = {
        email: '',
        errorForm:'',
    }

    ForgotPassword = () => {
        if (this.state.email !== '') {
            const emailData = {
                email:this.state.email
            }
            axios.post(BASE_URL+'/auth/forgot',emailData)
            .then(({data}) =>{
                this.setState({
                    errorForm:''
                })
                ToastAndroid.show(data.message, ToastAndroid.SHORT);
                this.props.dispatch(setEmail(this.state.email))
                this.props.navigation.navigate('Otp')
            }).catch(({response}) => {
                console.log(response.data)
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            })
        }else{
            this.setState({
                errorForm:'Kolom email harus diisi!'
            })
        }
    }

    render() {
        const { email } = this.state
        // console.log(this.state)
        // console.log('email :'+this.props.auth.email)
        return (
            <>
                <View style={{ margin: 20 }}>
                    <Text>
                        {'\n'}
                    </Text>
                    <Image style={{ alignSelf: 'center' }}
                        source={require('./../../assets/Vector.png')}
                    />
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: 'red', alignSelf: "center" }}>Blanja</Text>
                    <Text style={{ marginTop: 30, fontWeight: 'bold', textAlign: 'justify' }}>Please, enter your email address. You will receive an OTP to create a new password via email.</Text>
                    <Form>
                        <Item floatingLabel style={{ marginBottom: 25 }}>
                            <Label>Email</Label>
                            <Input name="email" value={email} onChangeText={(text) => { this.setState({ email: text }) }} />
                        </Item>
                        <Button full rounded danger
                            onPress={this.ForgotPassword}>
                            <Text style={{ color: 'white' }}>Send</Text>
                        </Button>
                    </Form>
                    <Text style={{color:'red', textAlign:'center', fontWeight:'bold'}}>{this.state.errorForm}</Text>
                </View>
            </>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(ForgotPassword);