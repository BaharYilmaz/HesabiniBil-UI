import React, { Component } from 'react';
import {
    Alert,
    LayoutAnimation,
    TouchableOpacity,
    Dimensions,
    Image,
    UIManager,
    KeyboardAvoidingView,
    StyleSheet,
    ScrollView,
    Linking,
    View,
} from 'react-native';



import { Container, Content, Button, Form, Item, Input, Title, H2, H3, Text, Body, Badge } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../Header'


class Home extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }
    render() {
        const { height: screenHeight } = Dimensions.get('window');
        return (

            <Container >
                <Header />

                <Content >
                    <Text>home</Text>
                    <TouchableOpacity
                        onPress={() => this.navigation.navigate('Hesabım')} >
                        <Text >İptal</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }

}
//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default Home;
