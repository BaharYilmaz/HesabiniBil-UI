import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, ScrollView, FlatList, View, SafeAreaView, StyleSheet,Clipboard  } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { AppContext } from '../../../provider/AppProvider'

import AppFooter from '../../../components/Footer'
import Members from '../Members';
import Bills from "../Bills";
import Modal from '../../../components/MessageModal';


const HomeAccount = (props) => {

    const state = useContext(AppContext);
    const params = props.route.params;
    const [screen, chageScreen] = useState(1)
    const [showMenu, setShow] = useState(false)


    console.log(params.account)
    useEffect(() => {
        // state.getAccountsById(params.accountId);
        state.getAccountMembers(params.account.ortakHesapID)
    }, []);

    const toggleScreen = (value) => {
        chageScreen(value)
    }
    const toggleMenu = () => {
        setShow(!showMenu)
    }
    return (
        <Container >
            <Header />

            <View style={{ flexDirection: "row", marginVertical: 20, marginHorizontal: 40, alignItems: 'center' }}>

                <Left>
                    <H1 style={{ color: 'darkseagreen', marginBottom: 5 }}>{params.account.hesapAd}</H1>
                    <Badge warning>
                        <Text>{params.account.hesapTurID == 1 ? 'Aile' : 'Ev Arkadaşları'}</Text>
                    </Badge>
                </Left>
                <Right >
                    <Icon name='cog' size={30} color="darkseagreen" onPress={() => toggleMenu()} />
                    {showMenu ?
                        <List style={styles.menu}
                        >
                            <ListItem onPress={() => toggleMenu()}><Text style={{ color: 'white' }}>Aylık Harcama</Text></ListItem>
                            <ListItem onPress={() => state.setModal({ modalVisible: true, modalMessage: 'GRUP DAVET KODU:',modalMessageDetail: 'blbla'})}><Text style={{ color: 'white' }}>Davet Kodu Al</Text></ListItem>
                            <ListItem onPress={() => toggleMenu()}><Text style={{ color: 'white' }}>Hesabı Düzenle</Text></ListItem>
                            <ListItem onPress={() => toggleMenu()}><Text style={{ color: 'white' }}>Hesaptan Çık</Text></ListItem>
                            <ListItem onPress={() => toggleMenu()}><Text style={{ color: 'white' }}>Hesabı Sil</Text></ListItem>

                        </List>
                        : null}

                </Right>


            </View>
            <Footer style={{ marginHorizontal: 30, backgroundColor: 'transparent' }} >
                <FooterTab style={{ backgroundColor: 'transparent' }} >
                    <Left>
                        <Button block onPress={() => toggleScreen(1)} style={screen == 1 ? styles.active : styles.passive}>
                            <Text>Fişler</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button block onPress={() => toggleScreen(0)} style={screen == 0 ? styles.active : styles.passive}>
                            <Text >Üyeler</Text>
                        </Button>
                    </Right>
                </FooterTab>
            </Footer>
            <View style={styles.divider} />

            <Content style={{ marginHorizontal: 10 }}>

                <SafeAreaView style={{ margin: 20 }} >
                    {
                        screen === 1 ? <Bills /> : <Members />
                    }
                    <Modal/>

                </SafeAreaView >
            </Content>

            <Footer style={{ marginHorizontal: 30, backgroundColor: 'transparent' }} >
                <FooterTab style={{ backgroundColor: 'transparent' }} >
                    <Body>
                        <Button rounded >
                            <Text>Fiş Yükle</Text>
                        </Button>
                    </Body>
                </FooterTab>
            </Footer>

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
    },
    divider: {
        height: 4,
        backgroundColor: 'steelblue',
        marginHorizontal: 30,
        marginVertical: 10
    },
    menu: {
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'darkseagreen',
        borderRadius: 3,
        color: 'white'
    }

});

export default HomeAccount;