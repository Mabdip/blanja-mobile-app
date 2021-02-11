import React, { Component } from 'react';
import { Form, Item, Input, Label, Button, } from 'native-base';
import { setLogintrue } from './../../utils/redux/ActionCreators/auth'
import {ToastAndroid, Alert} from 'react-native'
import { connect } from 'react-redux'
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import axios from 'axios'
import { BASE_URL } from '@env'

const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errorForm: ''
    }

    Login = () => {
        if (this.state.email === '' || this.state.password === '') {
            this.setState({
                errorForm: 'Semua kolom harus diisi!'
            })
        } else {
            if(regexEmail.test(this.state.email)){
                const data = {
                    email: this.state.email,
                    password: this.state.password
                }
    
                axios.post(BASE_URL + '/auth/login', data)
                    .then(({ data }) => {
                        this.setState({
                            errorForm: ''
                        })
                        const dataLogin = {
                            name:data.result.name,
                            email:data.result.email,
                            level:data.result.level,
                            id:data.result.user_id,
                            token:data.result.token
                        }
                        // console.log(dataLogin)
                        ToastAndroid.show(data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                        this.props.dispatch(setLogintrue(dataLogin))
                        this.props.navigation.navigate('Home')
                    }).catch(({ response }) => {
                        console.log(response.data)
                        ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
                    })
            }else{
                Alert.alert(
                    'WARNING',
                    'Format email tidak sesuai',
                    [
                        { text: 'OK', style: 'cancel' },
        
                    ])
            }
            
        }

    }

    componentDidMount = () => {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if (this.props.auth.isLogin) {
                this.props.navigation.navigate('Home')
            }
        });
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render() {
        // console.log(this.state)
        const { email, password } = this.state
        const { auth } = this.props
        // console.log(BASE_URL)
        return (
            <>
                <View style={{ margin: 20 }}>
                    <Text>
                        {'\n'}
                    </Text>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate('Home') }}
                    >
                        <Image style={{ alignSelf: 'center' }}
                            source={require('./../../assets/Vector.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: 'red', alignSelf: "center" }}>Blanja</Text>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input name="email" value={email} onChangeText={(text) => { this.setState({ email: text }) }} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input name="password" value={password} onChangeText={(text) => { this.setState({ password: text }) }} secureTextEntry={true} />
                        </Item>
                        <TouchableOpacity style={{ flexDirection: 'row-reverse', marginTop: 10, marginBottom: 25 }}
                            onPress={() => {
                                this.props.navigation.navigate('ForgotPassword')
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Forgot your password? -{'>'}</Text>
                        </TouchableOpacity>
                        <Button full rounded danger
                            onPress={this.Login}
                        >
                            <Text style={{ color: 'white' }}>Login</Text>
                        </Button>
                    </Form>
                    <TouchableOpacity style={{ alignSelf: "center", }}
                        onPress={() => {
                            this.props.navigation.navigate('Register')
                        }}
                    >
                        <Text>Dont have an account? Register Here</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{this.state.errorForm}</Text>
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

export default connect(mapStateToProps)(Login);