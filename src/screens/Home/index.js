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
import Header from '../Header'
import CommonAccounts from '../CommonAccounts'
import DebtTracking from '../DebtTracking'


class Home extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }
    render() {
        const { height: screenHeight } = Dimensions.get('window');
        return (

            <Container >
                <Header hasTabs />
                {/* 
                <View style={{ padding: 50, alignItems: 'center' }}>
                    <H3>Hoşgeldiniz !</H3>
                </View> */}

                <Tabs tabBarPosition="overlayBottom">
                    <Tab heading="Ortak Hesaplar">
                        <CommonAccounts />
                    </Tab>
                    <Tab heading="Borç Takibi">
                        <DebtTracking />
                    </Tab>
                </Tabs>

            </Container>
        );
    }

}
//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default Home;
