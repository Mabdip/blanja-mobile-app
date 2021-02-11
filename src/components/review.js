import React, { Component } from 'react';
import { Button, Container, Card, CardItem, Left, Body, Right } from 'native-base'
import { Image, Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { BASE_URL } from '@env'
import axios from 'axios'

class Review extends Component {
    state = {
        review: [],
        isEmpty: true
    }

    componentDidMount = () => {
        // console.log(BASE_URL + '/user/getReview/' + this.props.idProduct)
        axios.get(BASE_URL + '/user/getReview/' + this.props.idProduct)
            .then(({ data }) => {
                this.setState({
                    review: data.data,
                    isEmpty: false
                })
            }).catch(({ response }) => {
                console.log(response.data)
            })
    }

    render() {
        const { isEmpty, review } = this.state
        const totalReview = review.length
        let starOne = 0
        let starTwo = 0
        let starThree = 0
        let starFour = 0
        let starFive = 0
        review.map(({ rating }) => {
            if (rating == 1) {
                starOne += 1
            } else if (rating == 2) {
                starTwo += 1
            } else if (rating == 3) {
                starThree += 1
            } else if (rating == 4) {
                starFour += 1
            }
            else if (rating == 5) {
                starFive += 1
            }
        })

        // console.log(isEmpty, review)
        let reviewItems;
        if (isEmpty) {
            reviewItems =
                <>
                    <View style={{ width: '100%', height: 50, marginVertical: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Belum ada ulasan.</Text>
                    </View>
                </>
        } else {
            reviewItems = <>
                {
                    review && review.map(({ fullname, rating, review, created_at }) => {
                        let starRating;
                        if (rating == 1) {
                            starRating = <>
                                <Image source={require('../assets/icons/Star.png')} style={{ marginBottom: 3 }} />
                            </>
                        } else if (rating == 2) {
                            starRating =
                                <>
                                    <Image source={require('../assets/icons/2stars.png')} style={{ marginBottom: 3 }} />
                                </>
                        } else if (rating == 3) {
                            starRating =
                                <>
                                    <Image source={require('../assets/icons/3stars.png')} style={{ marginBottom: 3 }} />
                                </>
                        }
                        else if (rating == 4) {
                            starRating =
                                <>
                                    <Image source={require('../assets/icons/4stars.png')} style={{ marginBottom: 3 }} />
                                </>
                        }
                        else if (rating == 5) {
                            starRating =
                                <>
                                    <Image source={require('../assets/icons/5stars.png')} style={{ marginBottom: 3 }} />
                                </>
                        }
                        return (
                            <>
                                <Row>
                                    <Card style={{ width: '100%' }}>
                                        <CardItem>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'row', width: 200 }}>
                                                    <Image source={require('./../assets/images/review.png')} style={{
                                                        width: 36,
                                                        height: 36,
                                                        borderWidth: 1,
                                                        borderRadius: 36 / 2,
                                                    }} />
                                                    <Text style={{ marginLeft: 10, marginTop: 8 }}>{fullname}</Text>
                                                </View>
                                                <View>
                                                    <Text style={{ marginTop: 5, marginLeft: 40, color: 'green' }}>{created_at.toString().split('T')[0]}</Text>
                                                </View>
                                            </View>
                                        </CardItem>
                                        <CardItem>
                                            {starRating}
                                        </CardItem>
                                        <CardItem style={{ maginHorizontal: 20 }}>
                                            <Text>{review}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Right style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <Text>helpful </Text>
                                                <Image source={require('./../assets/icons/thumbs.png')} />
                                            </Right>
                                        </CardItem>
                                    </Card>
                                </Row>
                            </>
                        )
                    })
                }
            </>
        }
        return (
            <>
                <View style={{ marginRight: 15 }}>
                    <Text style={{ fontFamily: 'Metropolis', fontWeight: "700", fontSize: 34, marginTop: 20, marginBottom: 24, }}>
                        Rating&Reviews
                    </Text>

                    <Grid>
                        <Row>
                            <Col size={3}>
                                <Text style={{ fontSize: 48 }}>{this.props.avgRating}</Text>
                                <Text style={{ fontSize: 12, color: '#9B9B9B' }}>{totalReview} ratings</Text>
                            </Col>
                            <Col size={3} style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
                                <Image source={require('../assets/icons/5stars-removebg-preview.png')} style={{ marginBottom: 3 }} />
                                <Image source={require('../assets/icons/4stars.png')} style={{ marginBottom: 3 }} />
                                <Image source={require('../assets/icons/3stars.png')} style={{ marginBottom: 3 }} />
                                <Image source={require('../assets/icons/2stars.png')} style={{ marginBottom: 3 }} />
                                <Image source={require('../assets/icons/Star.png')} style={{ marginBottom: 3 }} />
                            </Col>
                            <Col size={4}>
                                <Image source={require('../assets/icons/12.png')} style={{ marginTop: 5, marginBottom: 3 }} />
                                <Image source={require('../assets/icons/5.png')} style={{ marginTop: 5, marginBottom: 3 }} />
                                <Image source={require('../assets/icons/4.png')} style={{ marginTop: 5, marginBottom: 3 }} />
                                <Image source={require('../assets/icons/2.png')} style={{ marginTop: 7, marginBottom: 3 }} />
                                <Image source={require('../assets/icons/0.png')} style={{ marginTop: 5, marginBottom: 3 }} />
                            </Col>
                            <Col size={1} style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
                                <Text style={{ fontSize: 10, color: '#9B9B9B', marginTop: 3 }}>{starFive}</Text>
                                <Text style={{ fontSize: 10, color: '#9B9B9B', marginTop: 3 }}>{starFour}</Text>
                                <Text style={{ fontSize: 10, color: '#9B9B9B', marginTop: 3 }}>{starThree}</Text>
                                <Text style={{ fontSize: 10, color: '#9B9B9B', marginTop: 3 }}>{starTwo}</Text>
                                <Text style={{ fontSize: 10, color: '#9B9B9B', marginTop: 3 }}>{starOne}</Text>
                            </Col>
                        </Row>

                        <Row style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>{review.length} Reviews</Text>
                            <Text>with photos</Text>
                        </Row>
                        {reviewItems}
                    </Grid>

                </View>

            </>
        );
    }
}

export default Review;