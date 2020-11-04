import React, { useEffect } from 'react';
import { Container, Header, Content, Button, Form, Item, Input, Title, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppFooter from '../../../components/Footer'
import Members from '../Members';
import Bills from "../Bills";
import { View } from 'antd-mobile';


const HomeAccount = (props) => {

    const params = props.route.params;
    console.log("id", params.accountId)

    useEffect(() => {
        getAccountWithId();
    });

    const getAccountWithId = () => {
        console.log("heyyu")
    }

    return (
        <Container >
            <Header />

            <Content style={{ margin: 20 }} activeTabStyle={{ color: 'red' }}>
                
            </Content>
            <AppFooter {...props} />

        </Container>

    );
};

export default HomeAccount;