import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export default class cardOrder extends React.Component {
    render() {
        const {idStatus} = this.props
        let strStatus;
        if(idStatus ==1){
            strStatus = <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', width:80, marginTop: 10,  }}>{this.props.status}</Text>
        }else if(idStatus==2){
            strStatus = <Text style={{ color: 'orange', fontSize: 18, fontWeight: 'bold', width:80, marginTop: 10,  }}>{this.props.status}</Text>
        }else if(idStatus ==3){
            strStatus = <Text style={{ color: 'orange', fontSize: 18, fontWeight: 'bold', width:70, marginTop: 10,  }}>{this.props.status}</Text>
        }else if(idStatus==4){
            strStatus = <Text style={{ color: 'green', fontSize: 18, fontWeight: 'bold', width:80, marginTop: 10,  }}>{this.props.status}</Text>
        }
        return (
            <>
                <TouchableOpacity style={styles.order}
                    onPress={() => {
                        this.props.navigation.navigate('DetailsOrders', {
                            trxId: this.props.trxId
                        })
                    }}
                >
                    <View style={{ margin: 10, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                Order No :
                                        <Text style={{ color: 'gray', }}> {this.props.trxId}</Text>
                            </Text>
                            <Text style={{ color: 'green' }}>{this.props.created_at.toString().substr(0, 10)}</Text>
                        </View>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 18 }}>
                            Tracking Number :
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}> {this.props.trackingNumber}</Text>
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, }}>
                            <Text style={{color: 'gray', fontSize: 18 }}>
                                Quantity :
                                        <Text style={{ color: 'black', fontWeight: 'bold' }} > {this.props.qty}</Text>
                            </Text>
                            {strStatus}
                        </View>
                        <Text style={{ color: 'gray', fontSize: 18, marginTop: -20,  }}>
                            Total Amount :
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}> Rp. {this.props.total}</Text>
                        </Text>

                    </View>
                </TouchableOpacity>

            </>
        )
    }
}

const styles = StyleSheet.create({
    order: {
        borderRadius: 10, height: 164,
        width: '95%', backgroundColor: 'white',
        marginTop: 10,
        marginHorizontal: 5,
        marginBottom: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.5,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 10, height: 10 }
    }
})