import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import { Icon } from 'react-native-elements';
import { Dimensions, ScrollView, FlatList, View, SafeAreaView, StyleSheet, Clipboard,TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { AppContext } from '../../../provider/AppProvider'
import AppFooter from '../../../components/Footer'
import Members from '../Members';
import Bills from "../Bills";
import Modal from '../../../components/Modals/InvitationModal';
import EditModal from '../../../components/Modals/EditAccountModal';


const HomeAccount = (props) => {

    const state = useContext(AppContext);
    const params = props.route.params;
    const [screen, chageScreen] = useState(1)
    const [showMenu, setShow] = useState(false)


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
        <Container>
            <Header />

            <View style={{ flexDirection: "row", margin:wp('5%'), alignItems: 'center' }}>

                <Left>
                    <H1 style={{ color: 'darkseagreen', marginBottom: 5 }}>{params.account.hesapAd}</H1>
                    <Badge warning>
                        <Text>{params.account.hesapTurID == 1 ? 'Aile' : 'Ev Arkadaşları'}</Text>
                    </Badge>
                </Left>
                <Right >
                    <TouchableOpacity onPress={() => toggleMenu()} ><Text>

                        <Icon name='cog' type='font-awesome' size={hp('5%')} color="darkseagreen" />

                    </Text>
                    </TouchableOpacity>
                    {showMenu ?
                        <List style={styles.menu}
                        >
                            <ListItem  >
                                <View style={{ flexDirection: 'row' }}>
                                    <Left />

                                    <TouchableOpacity onPress={() => toggleMenu()} ><Text>

                                        <Icon name='cog' type='font-awesome' size={hp('5%')} color="white" />

                                    </Text>
                                    </TouchableOpacity>
                                </View>


                            </ListItem>
                            <ListItem><TouchableOpacity onPress={() => toggleMenu()}><Text style={{ color: 'white' }}>Aylık Harcama</Text></TouchableOpacity></ListItem>
                            <ListItem><TouchableOpacity transparent onPress={() => state.setModalInvitation({ modalVisible: true, modalMessage: 'blbla' })}><Text style={{ color: 'white' }}>Davet Kodu Al</Text></TouchableOpacity></ListItem>
                            <ListItem><TouchableOpacity onPress={() => state.setModalEditAccount({ modalVisible: true, modalValue: params.account.hesapAd })}><Text style={{ color: 'white' }}>Hesabı Düzenle</Text></TouchableOpacity></ListItem>
                            <ListItem><TouchableOpacity onPress={() => toggleMenu()}><Text style={{ color: 'white' }}>Hesaptan Çık</Text></TouchableOpacity></ListItem>
                            {/* <ListItem onPress={() => toggleMenu()}><Text style={{ color: 'white' }}>Hesabı Sil</Text></ListItem> */}

                        </List>
                        : null}

                </Right>


            </View>
            <Footer style={{ marginHorizontal: wp('5%'), backgroundColor: 'transparent' }} >
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

            <Content style={{ marginHorizontal: wp('0.5%') }}>

                <SafeAreaView style={{ margin: wp('0.5%') }} >
                    {
                        screen === 1 ? <Bills /> : <Members />
                    }
                    <Modal />
                    <EditModal />

                </SafeAreaView >
            </Content>

            <View style={{ alignSelf: 'center', marginVertical: wp('3%') }}>
                <Button rounded style={{ backgroundColor: 'crimson' }} onPress={() => props.navigation.navigate('AddBill')}>
                    <Text style={{ fontWeight: 'bold' }}>Fiş Yükle</Text>
                </Button>
            </View>



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
        marginHorizontal: wp('5%'),
        marginVertical: wp('1%')
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