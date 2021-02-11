import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Right } from 'native-base';
import {ToastAndroid} from 'react-native'
import { connect } from 'react-redux'
import {removeEmail} from './../../utils/redux/ActionCreators/auth'
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '@env'

class ResetPassword extends React.Component {
    state = {
        newPassword: '',
        confPassword: '',
        errorForm: ''
    }

    resetPassword = () => {
        if (this.state.newPassword === '' || this.state.confPassword === '') {
            this.setState({
                errorForm: 'Semua kolom harus diisi!'
            })
        } else {
            if (this.state.newPassword !== this.state.confPassword) {
                this.setState({
                    errorForm: 'Password dan Konfirmasi Password tidak sama'
                })
            } else {
                const resetData = {
                    email: this.props.auth.email,
                    newPassword: this.state.newPassword
                }
                axios.patch(BASE_URL + '/auth/reset', resetData)
                    .then(({ data }) => {
                        console.log(data)
                        ToastAndroid.show(data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                        this.props.dispatch(removeEmail())
                        this.props.navigation.navigate('Login')
                    }).catch(({ response }) => {
                        ToastAndroid.show('Gagal!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                    })
            }
        }
    }

    render() {
    // console.log(this.state.newPassword, this.state.confPassword)
    // console.log(this.props.auth.email)
    const {newPassword, confPassword} = this.state
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
                    <Text style={{ marginTop: 30, fontWeight: 'bold', color: 'red', textAlign: 'justify' }}>You need to change your password to activate your account</Text>
                    <Form>
                        <Item floatingLabel style={{ marginBottom: 25 }}>
                            <Label>New Password</Label>
                            <Input name="newPassword" secureTextEntry={true} value={newPassword} onChangeText={(text) => { this.setState({ newPassword: text }) }} />
                        </Item>
                        <Item floatingLabel last style={{ marginBottom: 25 }}>
                            <Label>Confirmation New Password</Label>
                            <Input name="confPassword" secureTextEntry={true} value={confPassword} onChangeText={(text) => { this.setState({ confPassword: text }) }} />
                        </Item>
                        <Button full rounded danger
                            onPress={this.resetPassword}>
                            <Text style={{ color: 'white' }}>Reset</Text>
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

export default connect(mapStateToProps)(ResetPassword);