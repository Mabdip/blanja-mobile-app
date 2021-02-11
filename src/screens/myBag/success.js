import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Footer, FooterTab, Icon, Left, Body, Text, View } from "native-base";
import { Image , TouchableOpacity} from 'react-native';

import {setEmptyBag} from './../../utils/redux/ActionCreators/bag';
import {connect} from 'react-redux';

class SuccesPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = () =>{
        this.props.dispatch(setEmptyBag())
    }
    render() {
        return (
            <Container >
                <Content style={{ backgroundColor: '#f0f0f0', margin: 10 }}>
                    <View style={{ marginTop: '50%', alignItems: 'center' }}>
                        <Image source={require('./../../assets/bags.png')} />
                        <Text style={{ fontWeight: '700', fontSize: 40, marginBottom: 10 }}>Success!</Text>
                        <Text>Your order will be delivered soon</Text>
                        <Text>Thanks for using our App!</Text>
                    </View>
                    <Button full rounded danger style={{ marginTop: 160 }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Home') }}
                        >
                            <Text>Continue Shopping</Text>
                        </TouchableOpacity>
                    </Button>
                </Content>

            </Container>
        );
    }
}

const mapStateToProps = ({ auth, bag }) => {
    return {
        auth,
        bag
    };
};

export default connect(mapStateToProps)(SuccesPage);