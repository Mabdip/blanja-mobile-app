import React, { Component } from 'react';
import { Form, Item, Input, Label, Button, Toast } from 'native-base';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ToastAndroid
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env'

class Register extends React.Component {
    state = {
        fullname: '',
        email: '',
        password: '',
        storeName:'',
        errorForm: '',
        registSeller: false
    }

    Register = () => {
        if (this.state.fullname === '' || this.state.email === '' || this.state.password === '') {
            this.setState({
                errorForm: 'Semua kolom harus diisi'
            })
        } else {
            let data = {
                email: this.state.email,
                password: this.state.password,
                fullname: this.state.fullname,
            }
            if(this.state.registSeller){
                data = {
                    ...data,
                    level_id:2,
                    storeName:this.state.storeName
                }
            }else{
                data = {
                    ...data,
                    level_id:1,
                    storeName:''
                }
            }
            console.log(data)
            axios.post(BASE_URL + '/auth/signup', data)
                .then(({ data }) => {
                    this.setState({
                        errorForm: ''
                    })
                    // console.log(data)
                    ToastAndroid.show(data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                    this.props.navigation.navigate('Activate')
                }).catch((error) => {
                    ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
                })
        }

    }


    render() {
        let { fullname, email, password, registSeller, storeName } = this.state
        let btnSwitch;
        let formSeller;
        if (registSeller) {
            btnSwitch = <>
                <View>
                    <Text style={{fontSize:14, fontWeight:'bold', textAlign: 'center', marginBottom: 5}}>Your Register as Seller</Text>
                    <Button full rounded danger small
                        onPress={() => this.setState({
                            registSeller: !this.state.registSeller
                        })}
                    >
                        <Text style={{color:'white'}}>Switch to Customer</Text>
                    </Button>
                </View>
            </>
            formSeller = <>
            <Item floatingLabel>
                            <Label>Store Name</Label>
                            <Input name="firstname" value={storeName} onChangeText={(text) => { this.setState({ storeName: text }) }} />
                        </Item>
            </>
        } else {
            btnSwitch = <>
                <View>
                    <Text style={{ffontSize:14, fontWeight:'bold', textAlign: 'center', marginBottom: 5}}>Your Register as Customer</Text>
                    <Button full rounded danger small
                        onPress={() => this.setState({
                            registSeller: !this.state.registSeller
                        })}
                    >
                        <Text style={{color:'white'}}>Switch to Seller</Text>
                    </Button>
                </View>
            </>
        }
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
                    <View style={{ marginHorizontal:80, marginTop:10 }}>
                        {btnSwitch}
                    </View>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input name="email" value={email} onChangeText={(text) => { this.setState({ email: text }) }} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input name="password" secureTextEntry={true} value={password} onChangeText={(text) => { this.setState({ password: text }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Fullname</Label>
                            <Input name="firstname" value={fullname} onChangeText={(text) => { this.setState({ fullname: text }) }} />
                        </Item>
                        {formSeller}
                        <TouchableOpacity style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 25 }}
                            onPress={() => {
                                this.props.navigation.navigate('Login')
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Already have an account, Login here -{'>'}</Text>
                        </TouchableOpacity>
                        
                        <Button full rounded danger
                            onPress={this.Register}>
                            <Text style={{ color: 'white' }}>Register</Text>
                        </Button>
                        <TouchableOpacity style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 25 }}
                            onPress={() => {
                                this.props.navigation.navigate('Activate')
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Already register? Activate your account here -{'>'}</Text>
                        </TouchableOpacity>
                    </Form>
                    <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{this.state.errorForm}</Text>
                </View>
            </>
        )
    }
}
export default Register;