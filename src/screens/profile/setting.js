import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Body, Text, Item, Label, Input, CheckBox, ListItem, Form } from "native-base";
import { Image, View, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native'
import { BASE_URL } from '@env'
import { connect } from 'react-redux'
import axios from 'axios'

class Setting extends React.Component {
    state = {
        isChecked: true,
        modalTrackingVisible: false,
        old_password: '',
        new_password: ''
    }

    setModalVisible = (e) => {
        this.setState({
            modalTrackingVisible: e
        })
    }

    changePassword = () => {
        if (this.state.old_password.length < 6 || this.state.new_password.length < 6) {
            alert('Minimal 6 karakter')
        } else {
            const updateData = {
                email: this.props.auth.email,
                old_password: this.state.old_password,
                new_password: this.state.new_password
            }
            axios.patch(BASE_URL + '/user/changePassword', updateData)
                .then(({ data }) => {
                    Alert.alert(
                        'OK',
                        data.message,
                        [
                            { text: 'OK', style: 'cancel' },

                        ])
                }).catch(({ response }) => {
                    console.log(response.data)
                    if (response.data.status == 401) {
                        Alert.alert(
                            'Kesalahan',
                            'Kata sandi lama tidak dikenali',
                            [
                                { text: 'OK', style: 'cancel' },

                            ])
                    }
                })
        }

    }

    render() {
        const { modalTrackingVisible, old_password, new_password } = this.state
        console.log(new_password, old_password)
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
                        <Body >
                            <Title style={{ color: 'black', marginLeft: 30, fontWeight: 'bold' }}>Setting</Title>
                        </Body>

                    </Header>
                    <Content style={{ backgroundColor: '#f0f0f0' }}>
                        <View style={{ marginLeft: 15, marginRight: 10, }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 42, marginTop: 20, marginBottom: 10 }}>Setting</Text>
                            <Text style={{ fontWeight: 'bold' }}>Personal Information</Text>
                            <Item floatingLabel style={{ backgroundColor: 'white', marginTop: 20, paddingTop: 10, paddingBottom: 10 }}>
                                <Label style={{ marginLeft: 10 }}>{this.props.auth.name}</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel style={{ backgroundColor: 'white', marginTop: 20, paddingTop: 10, paddingBottom: 10 }}>
                                <Label style={{ marginLeft: 10 }}>Date of Birth</Label>
                                <Input value='30/12/1996' />
                            </Item>
                            <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 5 }}>
                                <Text style={{ fontWeight: 'bold', }}>Personal Information</Text>
                                <TouchableOpacity
                                    onPress={() => { this.setModalVisible(true) }}
                                >
                                    <Text style={{ fontWeight: 'bold', color: 'gray', marginLeft: 120 }}>Change</Text>
                                </TouchableOpacity>
                            </View>
                            <Item floatingLabel style={{ backgroundColor: 'white', marginTop: 20, paddingTop: 10, paddingBottom: 10 }}>
                                <Label style={{ marginLeft: 10 }}>Password</Label>
                                <Input secureTextEntry={true} value='arkademy' />
                            </Item>
                            <Text style={{ fontWeight: 'bold', marginTop: 30, marginBottom: 5 }}>Notification</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                                <Text style={{ marginTop: 10 }}>Sales</Text>
                                <CheckBox style={{ marginEnd: 10 }} checked={this.state.isChecked} color="blue" onPress={() => { this.setState({ isChecked: !this.state.isChecked }) }} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                                <Text style={{ marginTop: 10 }}>New Arrivals</Text>
                                <CheckBox style={{ marginEnd: 10 }} color="green" />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                                <Text style={{ marginTop: 10 }}>Change Status Delivery</Text>
                                <CheckBox style={{ marginEnd: 10 }} color="green" />
                            </View>
                        </View>
                    </Content>
                </Container>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalTrackingVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Form>
                                <Item floatingLabel>
                                    <Label>Kata sandi lama</Label>
                                    <Input name="oldPassword" secureTextEntry={true} value={old_password} onChangeText={(text) => { this.setState({ old_password: text }) }} placeholder='Kata sandi lama' />
                                </Item>
                                <Item floatingLabel>
                                    <Label>Kata sandi baru</Label>
                                    <Input name="newPassword" secureTextEntry={true} value={new_password} onChangeText={(text) => { this.setState({ new_password: text }) }} placeholder='Kata sandi baru' />
                                </Item>
                            </Form>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 10 }}>
                                <Button full rounded bordered style={styles.btnTracking}
                                    onPress={() => {
                                        this.setModalVisible(false)
                                    }}
                                >
                                    <Text style={{ color: 'black' }}>Cancel</Text>
                                </Button>
                                <Button full rounded danger style={styles.btnTracking}
                                    onPress={this.changePassword}
                                >
                                    <Text style={{ color: 'white' }}>Kirim</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
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

export default connect(mapStateToProps)(Setting);

const styles = StyleSheet.create({
    btn: {
        width: 150
    },
    btnTracking: {
        width: 130,
        marginHorizontal: 5

    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modalView: {
        height: 220,
        width: 350,
        backgroundColor: "white",
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
})

