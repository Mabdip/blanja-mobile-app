import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';

export default class CardHeaderFooterExample extends Component {
    render() {
        const { title, content } = this.props
        return (
            <>
                <Card>
                    <CardItem>
                        <Body>
                            <Text style={{fontSize:18, fontWeight:'bold'}}>{title}</Text>
                            <Text>
                                {content}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
            </>
        );
    }
}