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



import { Container, Content, Button, Form, Item, Input, Title, H2, H3, Text, Tab, Tabs } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header'
import CommonAccounts from '../Account/CommonAccounts'
import DebtTracking from '../Debt/DebtTracking'
import Footer from '../../components/Footer'

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


                <Footer />

            </Container>
        );
    }

}
//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default Home;
