import React, { Component } from 'react';
import { Container, View, Text, Content } from 'native-base'

export default class componentName extends Component {
    render() {
        return (
            <>
                <Container>
                    <Content>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{fontSize:'36', fontWeight:'bold'}}>Loading...</Text>
                        </View>
                    </Content>
                </Container>
            </>
        );
    }
}
