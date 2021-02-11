import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { addQty, minQty, removeItems } from './../utils/redux/ActionCreators/bag'
import { connect } from 'react-redux'
import { BASE_URL } from '@env'

class CardBag extends Component {
    Minus = () => {
        const data = {
            product_id: this.props.productId,
            color: this.props.color,
            size: this.props.size,
            price: this.props.price
        }
        // console.log(data)
        if(this.props.qty!= 1){
            this.props.dispatch(minQty(data))
        }else{

            Alert.alert(
                'Remove Item',
                'Hapus dari keranjang?',
                [
                  {text: 'NO', style: 'cancel'},
                  {text: 'YES', onPress: () => this.removeItems()},
                  
                ])
            
        }
    }

    removeItems = () =>{
        const data = {
            product_id: this.props.productId,
            color: this.props.color,
            size: this.props.size,
            price: this.props.price
        }
        this.props.dispatch(removeItems(data))
    }

    Plus = () => {
        const data = {
            product_id: this.props.productId,
            color: this.props.color,
            size: this.props.size,
            price: this.props.price
        }
        // console.log(data)
        this.props.dispatch(addQty(data))
    }

    toPrice = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    render() {
        const { productId, name, color, size, qty, price, img } = this.props
        // console.log(this.props.bag.mybag)
        return (
            <View style={styles.container}>

                <Image source={{ uri: BASE_URL + img, width: 104, height: 104 }} style={styles.img} />
                <View style={styles.infobag}>
                    <Text>{name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginRight: 16 }}>Color: {color}</Text>
                        <Text>Size: {size}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 14 }}>
                        <TouchableOpacity
                            onPress={this.Minus}
                        >
                            <View style={styles.btn}>
                                <Image source={require('./../assets/icons/min.png')} style={{ marginTop: 13 }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 7, marginHorizontal: 10 }}>{qty}</Text>

                        <TouchableOpacity
                            onPress={this.Plus}
                        >
                            <View style={styles.btn}>
                                <Image source={require('../assets/icons/plus.png')} style={{ marginTop: 6 }} />
                            </View>
                        </TouchableOpacity>


                        <View style={styles.price}>
                            <Text style={{ fontFamily: 'Metropolis-Bold', fontSize: 20 }}>Rp {this.toPrice(qty * price)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ auth, bag }) => {
    return {
        auth,
        bag
    };
};

export default connect(mapStateToProps)(CardBag);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 5
    },
    price: {
        marginTop: 7,
        marginLeft: 20,
    },
    btn: {
        width: 36,
        height: 36,
        borderWidth: 1,
        borderRadius: 36 / 2,
        alignItems: 'center',
        paddingTop: 4,
        borderColor: '#9B9B9B',
    },
    img: {
        width: 104,
        height: 104,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    infobag: {
        backgroundColor: '#fff',
        width: 220,
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