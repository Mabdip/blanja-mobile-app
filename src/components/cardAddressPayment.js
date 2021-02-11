import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class cardAddress extends React.Component {
    render() {
        let isActive = this.props.address.activeAddress == this.props.addressId
        return (
            <>
                <View style={{marginVertical:10}}>
                    <View style={{ borderColor: isActive?'green':'white', borderWidth: 4 , borderRadius:10}}>
                        <View style={styles.order} >
                            <View style={{ padding:10, borderRadius:5, borderColor:this.props.color }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                {this.props.name+' ('+this.props.type+')'}
                            </Text>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 18 }}>
                            {this.props.city + ', '}<Text style={{ color: 'green', fontWeight: 'bold' }}>{this.props.postal}</Text>
                        </Text>
                        <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={{ color: 'gray', fontSize: 18 }}>
                                {this.props.phone}
                            </Text>
                            <View style={{marginRight:10}}>
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