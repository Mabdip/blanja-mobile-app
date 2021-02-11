import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Picker, ToastAndroid } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Label, Textarea, Left, Body, Right } from 'native-base';
import { BASE_URL } from "@env"
import axios from 'axios'
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux'

class AddProduct extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            product_name: '',
            category_id: 0,
            color_id: 0,
            size_id: 0,
            condition_id: 0,
            product_price: '',
            product_desc: '',
            product_img: [],
            taken_pic: {}
        }
    }

    setCategory = (e) => {
        this.setState({
            category_id: e
        })
    }

    setColor = (e) => {
        this.setState({
            color_id: e
        })
    }

    setSize = (e) => {
        this.setState({
            size_id: e
        })
    }

    setCondition = (e) => {
        this.setState({
            condition_id: e
        })
    }

    chooseFile = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
        })
            .then((images) => {
                console.log(images.length);
                this.setState({ product_img: images });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    takePicture = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: 'photo',
        })
            .then((images) => {
                console.log(images.length);
                this.setState({ taken_pic: images });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    postProduct = () => {
        ToastAndroid.show('Harap tunggu', ToastAndroid.SHORT, ToastAndroid.CENTER);
        const config = {
            headers: {
                'x-access-token': 'Bearer ' + this.props.auth.token,
                'Content-type': 'multipart/form-data',
            },
        };
        const data = new FormData();
        data.append('product_name', this.state.product_name);
        data.append('category_id', this.state.category_id);
        data.append('color_id',this.state.color_id)
        data.append('size_id',this.state.size_id)
        data.append('condition_id', this.state.condition_id)
        data.append('product_price', this.state.product_price);
        data.append('product_desc', this.state.product_desc);
        data.append('user_id', this.props.auth.id);
        if (Object.keys(this.state.taken_pic).length > 0) {
            data.append('product_img', {
                name: this.state.taken_pic.path.split('/').pop(),
                type: this.state.taken_pic.mime,
                uri:
                    Platform.OS === 'android'
                        ? this.state.taken_pic.path
                        : this.state.taken_pic.path.replace('file://', ''),
            })
        }
        if (this.state.product_img[0]) {
            for (let i = 0; i < this.state.product_img.length; i++) {
                data.append('product_img',
                    {
                        name: this.state.product_img[i].path.split('/').pop(),
                        type: this.state.product_img[i].mime,
                        uri:
                            Platform.OS === 'android'
                                ? this.state.product_img[i].path
                                : this.state.product_img[i].path.replace('file://', ''),
                    }
                );
            }
        }

        console.log(data);
        axios
            .post(BASE_URL + `/product/addProduct`, data, config)
            .then((data) => {
                console.log(data.data);
                ToastAndroid.show('Produk berhasil ditambahkan', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                this.props.navigation.push('ListProduct')
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }

    render() {
        const { product_name, category_id, color_id, size_id, condition_id, product_price, product_desc, product_img, taken_pic } = this.state
        console.log(this.state)
        let prevImgFromCamera;
        if (Object.keys(this.state.taken_pic).length > 0) {
            prevImgFromCamera =
                <>
                    <Image
                        source={{ uri: taken_pic.path }}
                        style={styles.imageStyle}
                    />
                </>
        }
        return (
            <>
                <Container>
                    <Header transparent>
                        <Left>
                            <Button transparent
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image source={require('./../../../assets/back.png')} />
                            </Button>
                        </Left>
                        <Body><Text style={{ fontSize: 24, fontWeight: 'bold' }}>Add Product</Text></Body>
                    </Header>
                    <Content style={{ marginRight: 15, backgroundColor: 'white' }}>
                        <ScrollView style={{ height: 550, backgroundColor: 'white' }}>
                            <View>
                                <Form>
                                    <Item stackedLabel>
                                        <Label >Product Name</Label>
                                        <Input name="product_name" value={product_name} onChangeText={(text) => { this.setState({ product_name: text }) }} />
                                    </Item>
                                    <View style={styles.size}>
                                        <Picker
                                            selectedValue={category_id}
                                            onValueChange={(itemValue, itemIndex) => this.setCategory(itemValue)}
                                        >
                                            <Picker.Item label="Category" value="0" style={{ backgroundColor: 'gray' }} />
                                            <Picker.Item label="T-shirt" value="1" />
                                            <Picker.Item label="Short" value="2" />
                                            <Picker.Item label="Jacket" value="3" />
                                            <Picker.Item label="Pants" value="4" />
                                            <Picker.Item label="Shoes" value="5" />
                                        </Picker>
                                    </View>
                                    <View style={styles.size}>
                                        <Picker
                                            selectedValue={color_id}
                                            onValueChange={(itemValue, itemIndex) => this.setColor(itemValue)}
                                        >
                                            <Picker.Item label="Color" value="0" style={{ backgroundColor: 'gray' }} />
                                            <Picker.Item label="Red" value="1" />
                                            <Picker.Item label="Green" value="2" />
                                            <Picker.Item label="Blue" value="3" />
                                            <Picker.Item label="Black" value="4" />
                                        </Picker>
                                    </View>
                                    <View style={styles.size}>
                                        <Picker
                                            selectedValue={size_id}
                                            onValueChange={(itemValue, itemIndex) => this.setSize(itemValue)}
                                        >
                                            <Picker.Item label="Size" value="0" style={{ backgroundColor: 'gray' }} />
                                            <Picker.Item label="XS" value="1" />
                                            <Picker.Item label="S" value="2" />
                                            <Picker.Item label="M" value="3" />
                                            <Picker.Item label="L" value="4" />
                                            <Picker.Item label="XL" value="5" />
                                        </Picker>
                                    </View>
                                    <View style={styles.size}>
                                        <Picker
                                            selectedValue={condition_id}
                                            onValueChange={(itemValue, itemIndex) => this.setCondition(itemValue)}
                                        >
                                            <Picker.Item label="Condition" value="0" style={{ backgroundColor: 'gray' }} />
                                            <Picker.Item label="New" value="1" />
                                            <Picker.Item label="Second" value="2" />
                                        </Picker>
                                    </View>
                                    <Item stackedLabel>
                                        <Label >Price</Label>
                                        <Input name="price" value={product_price} onChangeText={(text) => { this.setState({ product_price: text }) }} />
                                    </Item>
                                    <View style={{ marginLeft: 15 }}>
                                        <Label >Product Description</Label>
                                        <Textarea rowSpan={5} bordered placeholder="Description" name="description" value={product_desc} onChangeText={(text) => { this.setState({ product_desc: text }) }} />
                                        <View style={{ flexDirection: 'row' }}>
                                            {product_img && product_img.map((item) => {
                                                return (
                                                    <Image
                                                        key={product_img.indexOf(item)}
                                                        source={{ uri: product_img.length !== 0 ? item.path : '' }}
                                                        style={styles.imageStyle}
                                                    />
                                                );
                                            })}
                                            {prevImgFromCamera}
                                        </View>
                                        <View>
                                            <Label>Product picture</Label>
                                            <TouchableOpacity
                                                activeOpacity={0.5}
                                                style={styles.btnSection}
                                                onPress={this.chooseFile}>
                                                <Text style={styles.btnText}>Choose Image</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                activeOpacity={0.5}
                                                style={styles.btnSection}
                                                onPress={this.takePicture}>
                                                <Text style={styles.btnText}>Take Picture</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Form>
                            </View>
                        </ScrollView>
                        <Button danger full rounded onPress={this.postProduct} style={{marginLeft:15}}>
                            <Text style={{ color: '#fff' }}> SUBMIT </Text>
                        </Button>
                    </Content>
                </Container>
            </>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(AddProduct);

const styles = StyleSheet.create({

    textTitle: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    btnSection: {
        width: '100%',
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold'
    },
    size: {
        width: '100%',
        height: 40,
        // paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#9B9B9B',
        paddingHorizontal: 5,
        paddingBottom: 15
    },
    imageStyle: {
        width: 200,
        height: 200,
        width: 100,
        height: 100,
        margin: 5,
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
    },
})