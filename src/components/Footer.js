import React, { Component } from 'react';

import { Container, Content, Button, Form, Right, Left, Title, Footer, FooterTab, Text, Tab, Tabs } from 'native-base';


const AppFooter = (props) => {

    return (
        <Footer >
            <FooterTab >
                    <Button  onPress={() => props.navigation.navigate('CommonAccounts')}>
                        <Text>Ortak Hesaplar</Text>
                    </Button>
                    <Button  onPress={() => props.navigation.navigate('DebtTracking')} >
                        <Text>Borç Takibi</Text>
                    </Button>
            </FooterTab>
        </Footer> 
       
    );
}

export default AppFooter;
