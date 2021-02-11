import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'native-base'
import { BASE_URL } from "@env"
import {connect} from 'react-redux'
import axios from 'axios'

class CardListStock extends Component {
    constructor(props) {
        super(props)
    }

    Delete = () =>{
        axios.delete(BASE_URL+'/product/deleteStock/'+this.props.id,{
            headers: {
                "x-access-token": "Bearer " + this.props.auth.token
            },
        }).then(({data}) =>{
            alert('berhasil delete')
        }).catch(({response}) =>{
            console.log(response.data)
        })
    }

    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    render() {
        const { id, product_id, name, price, color, size, category, image } = this.props
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Details', {
                        itemId: this.props.product_id,
                    })
                }}
            >
                <View style={styles.container}>
                    <Image source={{ uri: BASE_URL + image, width: 90, height: 120 }} />
                    <View style={styles.infobag}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text
                                style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5, maxWidth: 175 }}
                            >
                                {name}
                            </Text>
                            <Button full rounded success style={{ width: 50, height: 20, marginTop: 5 }}
                                onPress={() => {
                                    this.props.navigation.navigate('EditStock', {
                                        itemId: this.props.id,
                                    })
                                }}
                            >
                                <Text style={{ fontWeight: '700', fontSize: 12, color: '#FFF' }}>Edit</Text>
                            </Button>

                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'gray' }}>Category : {category}</Text>
                            <Button full rounded danger style={{ width: 50, height: 20, marginTop: 5 }}
                                onPress={this.Delete}
                            >
                                <Text style={{ fontWeight: '700', fontSize: 12, color: '#FFF' }}>Delete</Text>
                            </Button>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        </View>
                        <Text style={{ color: 'gray' }}>Color :
                        <Text style={{ color: 'black' }}>{color}</Text>
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 , justifyContent:'space-between'}}>
                            <Text style={{ color: 'gray' }}>Size :
                        <Text style={{ color: 'black' }}>{size}</Text>
                            </Text>
                            <View style={styles.price}>
                                <Text style={{ fontFamily: 'Metropolis-Bold', fontWeight: 'bold', fontSize: 20, }}>Rp. {this.toPrice(price)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(CardListStock)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 120,
        marginBottom: 20,

    },
    price: {
        marginTop: 7,
        marginLeft: 50,
    },
    img: {

        width: 95,
        height: 120,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    infobag: {
        backgroundColor: '#fff',
        width: 245,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        paddingHorizontal: 5,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    },
});