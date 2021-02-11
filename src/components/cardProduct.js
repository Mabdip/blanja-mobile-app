import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Button, Modal, } from 'native-base'
import { BASE_URL } from "@env"
import axios from 'axios'
import { connect } from 'react-redux'

class CardBag extends Component {

    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    popConfirm = () => {
        Alert.alert(
            'Delete data?',
            'Data yang dihapus tidak dapat dikembalikan',
            [
              {text: 'NO', style: 'cancel'},
              {text: 'YES', onPress: () => this.deleteItems()},
              
            ])
    }

    deleteItems = () => {
        const config = {
            headers: {
                'x-access-token': 'Bearer ' + this.props.auth.token,
            },
        };
        axios.delete(BASE_URL + '/product/deleteProduct/' + this.props.id, config)
            .then(({ data }) => {
                console.log('berhasil delete')
                this.props.navigation.push('ListProduct')
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }
    render() {
        const { id, name, price, category, image, color, size, condition } = this.props
        let conditionItems;
        if (condition.toLowerCase() == 'new') {
            conditionItems = <Text style={{ color: 'red' }}>{condition}</Text>
        } else {
            conditionItems = <Text style={{ color: 'gray' }}>{condition}</Text>
        }
        return (
            <>
                <View style={styles.container}>
                    <Image source={{ uri: BASE_URL + image, width: 120, height: 120 }} style={styles.img} />
                    <View style={styles.infobag}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Text
                                style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5, maxWidth: 150, height: 20 }}
                            >
                                {name}
                            </Text>
                            <View>
                                <Button full rounded success style={{ width: 50, height: 20, marginTop: 5 }}
                                    onPress={() => {
                                        this.props.navigation.navigate('EditProduct', {
                                            itemId: this.props.id,
                                        })
                                    }}
                                >
                                    <Text style={{ fontWeight: '700', fontSize: 12, color: '#FFF' }}>Edit</Text>
                                </Button>
                                <Button full rounded danger style={{ width: 50, height: 20, marginTop: 5 }}
                                    onPress={this.popConfirm}

                                >
                                    <Text style={{ fontWeight: '700', fontSize: 12, color: '#FFF' }}>Delete</Text>
                                </Button>
                            </View>
                        </View>
                        <Text style={{ marginRight: 16, color: 'gray' }}>Category:
                        <Text style={{ color: 'black', fontWeight: 'bold' }}> {category}</Text>
                        </Text>
                        <Text>{size}-{color} | {conditionItems}
                        </Text>
                        <View>
                            <Text style={{ fontFamily: 'Metropolis-Bold', fontWeight: 'bold', fontSize: 20 }}>Rp. {this.toPrice(price)}</Text>
                        </View>
                    </View>
                </View>
            </>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(CardBag);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 120,
        marginBottom: 20,

    },
    img: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    infobag: {
        backgroundColor: '#fff',
        width: 215,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        height: 50,
        width: 200,
        borderWidth: 4,
        borderColor: "#20232a",
        backgroundColor: "white",
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        }
    }
});