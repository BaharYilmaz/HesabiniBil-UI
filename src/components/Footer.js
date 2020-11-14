import React, { Component } from 'react';

import { Container, Content, Button, Form, Right, Left, Title, Footer, FooterTab, Text, Tab, Tabs, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const AppFooter = (props) => {

    return (
        <Footer >
            <FooterTab style={{ marginHorizontal: 20 }} >
                <Button onPress={() => props.navigation.navigate('CommonAccounts')}>
                    <Text style={{ fontSize: 13 }}>Ortak Hesaplar</Text>
                </Button>
                <Button vertical onPress={() => props.navigation.navigate('Profile')} >
                    <Icon name='account' size={30} color='white' />
                </Button>
                <Button onPress={() => props.navigation.navigate('DebtTracking')} >
                    <Text style={{ fontSize: 13 }}>Borç Takibi</Text>
                </Button>
            </FooterTab>
        </Footer>

    );
}

export default AppFooter;
