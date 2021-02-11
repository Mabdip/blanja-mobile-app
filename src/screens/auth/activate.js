import React, { Component } from 'react';
import { Form, Item, Input, Label, Button, Toast } from 'native-base';
import { TextInput, ToastAndroid } from 'react-native'
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '@env'

class Register extends React.Component {
    state = {
        email: '',
        otp: '',
        errorForm: '',
    }

    changeHandler = (e) => {
        console.log(e.target)
        this.setState({ [e.target.name]: e.target.value })
    }

    Activate = () => {
        if (this.state.email === '' || this.state.otp === '') {
            this.setState({
                errorForm: 'Semua kolom harus diisi!'
            })
        } else {
            axios.get(BASE_URL + `/auth/activate/${this.state.email}/${this.state.otp}`)
                .then(({ data }) => {
                    // alert(data.message)
                    ToastAndroid.show(data.message, ToastAndroid.SHORT);
                    // console.log(data)
                    this.props.navigation.navigate('Login')
                }).catch(({ response }) => {
                    ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                    console.log(response.data)
                })
        }

    }

    Resend = () => {
        if (this.state.email === '') {
            this.setState({
                errorForm: 'Kolom email harus diisi!'
            })
        } else {
            const resendData = {
                email: this.state.email
            }
            axios.post(BASE_URL + `/auth/resend`, resendData)
                .then(({ data }) => {
                    alert(data.message)
                    // console.log(data)
                }).catch(({ response }) => {
                    alert(response.data.message)
                    console.log(response.data)
                })
        }
    }



    render() {
        let { email, otp } = this.state
        // console.log(this.state)
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
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input name="email" value={email} onChangeText={(text) => { this.setState({ email: text }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Activation Code</Label>
                            <Input name="otp" value={otp} onChangeText={(text) => { this.setState({ otp: text }) }} />
                        </Item>
                        <TouchableOpacity style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 25 }}
                            onPress={() => {
                                this.props.navigation.navigate('Login')
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Already activate account, Login here -{'>'}</Text>
                        </TouchableOpacity>
                        <Button full rounded danger
                            onPress={this.Activate}>
                            <Text style={{ color: 'white' }}>Activate</Text>
                        </Button>
                    </Form>
                    <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{this.state.errorForm}</Text>
                    <TouchableOpacity style={{ alignSelf: "center", }}
                        onPress={this.Resend}
                    >
                        <Text>Didn't get Activation code? Resend here</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}
export default Register;