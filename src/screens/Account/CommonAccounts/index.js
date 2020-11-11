import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../provider/AppProvider'

import { Dimensions, ScrollView, FlatList, View, SafeAreaView, StyleSheet } from 'react-native';


import { Container, Header, Content, Button, Form, Item, Input, Title, Left, Right, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from 'react-native-easy-grid';


import AppFooter from '../../../components/Footer'

const CommonAccounts = (props) => {

    const state = useContext(AppContext);
    const accountList = state.accountList;

    useEffect(() => {
        console.log("This line will be run only after the first render ");
        state.getAccounts()
        console.log("sayı",accountList.length)
    }, []);

    return (
        < Container >
            <Header />
            <View style={{ backgroundColor: 'lightblue', margin: 30, padding: 10, borderRadius: 5, alignItems: 'center' }}>
                <H3 style={{ color: 'white' }}>Ortak Hesaplar</H3>
            </View>
            <Content style={{ marginHorizontal: 20 }}>

                <SafeAreaView >
                    {accountList.length>0? 
                        <List >

                            <ScrollView >

                                {
                                    accountList.map(list =>
                                        <ListItem thumbnail key={list.ortakHesapID} >
                                            <Body>
                                                <Text style={{ marginBottom: 10 }}>{list.hesapAd}</Text>
                                                <Badge warning>
                                                    <Text style={{ color: 'white' }} note numberOfLines={1}>{list.hesapTurID == 1 ? 'Aile' : 'Ev Arkadaşları'}</Text>
                                                </Badge>
                                            </Body>
                                            <Right>
                                                <Button transparent onPress={() => props.navigation.navigate('HomeAccount', { account: list })}>
                                                    <Text>Hesaba Git</Text>
                                                </Button>
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            </ScrollView>
                        </List>
                        :<Text style={{ color: 'lightgray' ,textAlign:'center'}}>Üyesi olduğunuz bir ev hesabı yok... </Text> 
                    }
                </SafeAreaView >

            </Content>
            <Footer style={{ backgroundColor: 'transparent', margin: 30 }}>
                <FooterTab style={{ backgroundColor: 'transparent', margin: 20 }}>
                    <Left>
                        <Button rounded style={{ backgroundColor: 'darkseagreen' }} onPress={() => props.navigation.navigate('CreateHomeAccount')}>
                            <Text>Hesap Oluştur</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button rounded style={{ backgroundColor: 'palevioletred' }} onPress={() => props.navigation.navigate('JoinAccount')}>
                            <Text>Hesaba Üye Ol</Text>
                        </Button>
                    </Right>
                </FooterTab>
            </Footer>

            <AppFooter {...props} />

        </Container >
    );
}
//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default CommonAccounts;
