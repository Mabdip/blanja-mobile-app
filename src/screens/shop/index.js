import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Body, Right, Card, CardItem } from "native-base";

class Shop extends Component {
    render() {
        return (
            <>
                <Header transparent>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Image source={require('../../assets/icons/back.png')} />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ color: 'black', marginLeft: 35, fontWeight: 'bold' }}>Categories</Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={() => { this.props.navigation.navigate('Search') }}>
                            <Image source={require('../../assets/icons/Search.png')} />
                        </Button>
                    </Right>
                </Header>

                <Container style={styles.container}>
                    <ScrollView >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onPress}
                        >
                            <Text style={styles.btnTitle}>Summer Sales</Text>
                            <Text style={styles.btnSub}>Up to 50% off</Text>
                        </TouchableOpacity>

                        <Card style={styles.card} >
                            <CardItem cardBody button onPress={() => { this.props.navigation.navigate('Categories',{
                                categoryType:'new',
                                title:'NEW'
                            }) }}>
                                <Left>
                                    <Text style={styles.cardTitle}>New</Text>
                                </Left>
                                <Right>
                                    <Image source={require('../../assets/images/new.png')} style={styles.cardImg}/>
                                </Right>
                            </CardItem>
                        </Card>
                        <Card style={styles.card} >
                        <CardItem cardBody button onPress={() => { this.props.navigation.navigate('Categories',{
                                categoryType:1,
                                title:'TSHIRT'
                            }) }}>
                                <Left>
                                    <Text style={styles.cardTitle}>T-Shirt</Text>
                                </Left>
                                <Right>
                                    <Image source={require('../../assets/images/tshirt-low.jpg')} style={styles.cardImg}/>
                                </Right>
                            </CardItem>
                        </Card>
                        <Card style={styles.card} >
                            <CardItem cardBody button onPress={() => { this.props.navigation.navigate('Categories',{
                                categoryType:2,
                                title:'SHORTS'
                            }) }}>
                                <Left>
                                    <Text style={styles.cardTitle}>Shorts</Text>
                                </Left>
                                <Right>
                                    <Image source={require('../../assets/images/short-low.jpg')} style={styles.cardImg}/>
                                </Right>
                            </CardItem>
                        </Card>
                        <Card style={styles.card} >
                        <CardItem cardBody button onPress={() => { this.props.navigation.navigate('Categories',{
                                categoryType:3,
                                title:'JACKETS'
                            }) }}>
                                <Left>
                                    <Text style={styles.cardTitle}>Jackets</Text>
                                </Left>
                                <Right>
                                    <Image source={require('../../assets/images/jacket-low.jpg')}style={styles.cardImg} />
                                </Right>
                            </CardItem>
                        </Card>
                        <Card style={styles.card} >
                        <CardItem cardBody button onPress={() => { this.props.navigation.navigate('Categories',{
                                categoryType:4,
                                title:'PANTS'
                            }) }}>
                                <Left>
                                    <Text style={styles.cardTitle}>Pants</Text>
                                </Left>
                                <Right>
                                    <Image source={require('../../assets/images/pant.jpg')}style={styles.cardImg} />
                                </Right>
                            </CardItem>
                        </Card>
                        <Card style={styles.card} >
                        <CardItem cardBody button onPress={() => { this.props.navigation.navigate('Categories',{
                                categoryType:5,
                                title:'SHOES'
                            }) }}>
                                <Left>
                                    <Text style={styles.cardTitle}>Shoes</Text>
                                </Left>
                                <Right>
                                    <Image source={require('../../assets/images/shoes.png')} />
                                </Right>
                            </CardItem>
                        </Card>

                    </ScrollView>
                </Container>
            </>
        );
    }
}

export default Shop;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 10
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DB3022",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10
    },
    btnTitle: {
        color: '#fff',
        fontSize: 35,
    },
    btnSub: {
        color: '#fff',
        fontSize: 18,
    },
    card: {
        // borderTopLeftRadius: 20,
        // borderBottomLeftRadius: 20,
        marginVertical: 10
    },
    cardTitle: {
        flex: 1,
        textAlign: 'center',
    },
    cardImg: {
        maxWidth: 170,
        maxHeight: 120,
    }
});