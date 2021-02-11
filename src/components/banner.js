import React, { Component } from 'react';
import { View, Image, ImageBackground,TouchableOpacity, Text } from 'react-native'
import Bell from './../components/notification'

export default class Banner extends React.Component {
    render() {
        return (
            <>
                <View style={{ height: 180 }}>
                    <ImageBackground style={{ width: '100%', height: '100%' }}
                        source={require('./../assets/Banner.png')}
                    >
                        
                        <View style={{ position: 'absolute', left: 0, bottom: 0, marginLeft: 10, marginBottom: 15 }}>
                            <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'white' }}>Street Clothes</Text>
                        </View>
                        
                        <Bell navigation= {this.props.navigation} />
                    </ImageBackground>
                    
                </View>
            </>
        )
    }
}