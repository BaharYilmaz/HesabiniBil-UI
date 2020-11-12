import React, { Component } from 'react';

import { Container, Content, Button, Form, Right, Left, Title, Footer, FooterTab, Text, Tab, Tabs, Body } from 'native-base';


const AppFooter = (props) => {

    return (
        <Footer >
            <FooterTab style={{marginHorizontal:20}} >
                <Left>
                    <Button onPress={() => props.navigation.navigate('CommonAccounts')}>
                        <Text>Ortak Hesaplar</Text>
                    </Button>
                </Left>
                <Right>
                    <Button onPress={() => props.navigation.navigate('DebtTracking')} >
                        <Text>Borç Takibi</Text>
                    </Button>
                </Right>
            </FooterTab>
        </Footer>

    );
}

export default AppFooter;
