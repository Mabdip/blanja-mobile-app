import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '@env'

class cardAddress extends React.Component {
    confirmDelete = () => {
        Alert.alert(
            'Hapus alamat',
            'Apakah anda yakin?',
            [
                { text: 'NO', style: 'cancel' },
                { text: 'YES', onPress: () => this.deleteAddress() },

            ])
    }

    deleteAddress = () => {
        if(this.props.address.activeAddress == this.props.addressId){
            Alert.alert(
                'GAGAL!',
                'Alamat anda masih di set sebagai alamat aktif',
                [
                    { text: 'OK', style: 'cancel' },
                ])
        }else{
            axios.delete(BASE_URL + '/address/delete/' + this.props.addressId)
            .then(({ data }) => {
                ToastAndroid.show('Berhasil menghapus alamat', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                this.props.navigation.push('Shipping')
            }).catch(({ response }) => {
                console.log(response.data)
                ToastAndroid.show('GAGAL!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            })
        }
    }
    render() {
        let isActive = this.props.address.activeAddress == this.props.addressId
        return (
            <>
                <View style={{ marginVertical: 10 }}>
                    <View style={{ borderColor: isActive ? 'green' : 'white', borderWidth: 4, borderRadius: 10 }}>
                        <View style={styles.order} >
                            <View style={{ padding: 10, borderRadius: 5, borderColor: this.props.color }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                        {this.props.name + ' (' + this.props.type + ')'}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.navigate('ChangeAddress', {
                                                addressId: this.props.addressId,
                                            })
                                        }}
                                    >
                                        <Text style={{ marginRight: 10, fontWeight: 'bold', color: 'blue' }}>Change</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ marginTop: 10, color: 'gray', fontSize: 18 }}>
                                    {this.props.city + ', '}<Text style={{ color: 'green', fontWeight: 'bold' }}>{this.props.postal}</Text>
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'gray', fontSize: 18 }}>
                                        {this.props.phone}
                                    </Text>
                                    <View style={{ marginRight: 10 }}>
                                        <TouchableOpacity
                                            onPress={this.confirmDelete}
                                        >
                                            <Text style={{ color: 'red', fontWeight: 'bold' }}>
                                                Delete
                                    </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

            </>
        )
    }
}

const mapStateToProps = ({ auth, address }) => {
    return {
        auth,
        address
    };
};

export default connect(mapStateToProps)(cardAddress);

const styles = StyleSheet.create({
    order: {
        borderRadius: 10, height: 100,
        width: '100%', backgroundColor: 'white',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.5,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 10, height: 10 }
    }
})