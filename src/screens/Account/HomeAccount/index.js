import React, { useEffect, useState } from 'react';
import { Container, Header, Content, Button, Form, Item, Input, Title, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, ScrollView, FlatList, View, SafeAreaView, StyleSheet } from 'react-native';

import AppFooter from '../../../components/Footer'
import Members from '../Members';
import Bills from "../Bills";


const HomeAccount = (props) => {

    const params = props.route.params;
    const [screen, chageScreen] = useState(1)

    useEffect(() => {
        getAccountWithId();
    }, []);

    const getAccountWithId = () => {
        console.log("id", params.accountId)
    }
    const toggleScreen = (value) => {
        console.log(value)
        chageScreen(value)

    }

    return (
        <Container >
            <Header />

            <View style={{ backgroundColor: 'darkseagreen', margin: 30, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                <H3 style={{ color: 'white' }}>Hesap adı</H3>
            </View>
            <Footer style={{ marginHorizontal: 30, backgroundColor: 'transparent' }} >
                <FooterTab style={{ backgroundColor: 'transparent' }} >
                    <Left>
                        <Button block onPress={() => toggleScreen(1)} style={screen == 1 ? styles.active:styles.passive}>
                            <Text>Fişler</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button block onPress={() => toggleScreen(0)} style={screen == 0 ? styles.active:styles.passive}>
                            <Text >Üyeler</Text>
                        </Button>
                    </Right>
                </FooterTab>
            </Footer>
            <Content style={{ marginHorizontal: 20 }}>

                <SafeAreaView >
                    {
                        screen === 1 ? <Bills /> : <Members />
                    }
                </SafeAreaView >

            </Content>

            <AppFooter {...props} />

        </Container>

    );
};
const styles = StyleSheet.create({
    active: {
        backgroundColor: 'steelblue',
    },
    passive: {
        backgroundColor: 'lightgray',
    }
});

export default HomeAccount;