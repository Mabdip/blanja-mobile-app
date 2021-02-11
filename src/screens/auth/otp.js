import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Right } from 'native-base';
import { connect } from 'react-redux'
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ToastAndroid
} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '@env'


class Otp extends React.Component {
    state = {
        otp: '',
        errorForm:''
    }

    checkOTP = () => {
        if(this.state.otp !== ''){
            axios.get(BASE_URL+'/auth/otp/'+this.props.auth.email+'/'+this.state.otp)
            .then(({data}) =>{
                ToastAndroid.show(data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                this.props.navigation.navigate('ResetPassword')
            }).catch(({response}) =>{
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                console.log(response.data)
            })
        }else{
            this.setState({
                errorForm:'Kolom OTP harus diisi!'
            })
        }
    }

    render() {
        const {otp} = this.state
        // console.log(this.state)
        const {auth} = this.props
        // console.log(auth)
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
                    <Text style={{marginTop:30, fontWeight:'bold', textAlign:'justify'}}>Please, check your inbox email. Then type OTP code here</Text>
                    <Form>
                        <Item floatingLabel style={{marginBottom:25}}>
                            <Label>OTP Code</Label>
                            <Input name="otp" value={otp} onChangeText={(text) => { this.setState({ otp: text }) }} />
                        </Item>
                        <Button full rounded danger 
                        onPress={this.checkOTP}>
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

export default connect(mapStateToProps)(Otp);