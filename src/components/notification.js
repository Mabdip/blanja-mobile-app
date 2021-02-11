import React, { Component } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Button } from 'native-base'

const Bell = ({navigation}) => {
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Notification')
                }}
                style={{ position: 'absolute', right: 20, top: 40 }}
            >
                    <Image source={require('./../assets/bell.png')} />
            </TouchableOpacity>
        </>
    )
}
export default Bell;