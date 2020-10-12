import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Form, Item, Input, Title, Left, Text, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SideMenu from '../../navigation/SideMenu';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';

class Home extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }


    render() {
        return (

            <Container >
                <Header>
                    <Left />
                    <Body>
                        <Title>Hesabını Bil</Title>
                    </Body>
                    <Right />
                    <Right>
                        <Button transparent onPress={() =>this.navigation.dispatch(DrawerActions.toggleDrawer())}>
                            <Icon name="menu" size={30} color="white" />

                        </Button>
                        
                    </Right>
                </Header>
                <Content ></Content>
            </Container>


        );
    }
}

export default Home;