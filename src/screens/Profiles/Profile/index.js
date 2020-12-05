import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import { Icon } from 'react-native-elements';
import { Dimensions, ScrollView, FlatList, View, SafeAreaView, StyleSheet, Clipboard,TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { AppContext } from '../../../provider/AppProvider'
import AppHeader from '../../../components/Header'

import AppFooter from '../../../components/Footer'
import Notifications from "../Notifications";
import Iban from '../Iban'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Profile = (props) => {

    const state = useContext(AppContext);
    const [screen, chageScreen] = useState(1)


    useEffect(() => {
        // state.getAccountsById(params.accountId);
        // state.getAccountMembers(params.account.ortakHesapID)
    }, []);

    const toggleScreen = (value) => {

        chageScreen(value)
    }
    const toggleMenu = () => {
        setShow(!showMenu)
    }
    return (
        <Container>
      <AppHeader screenName={'CommonAccounts'} />

           <Iban/>
          
            <View style={{ marginHorizontal:  hp('1%'), marginVertical:  hp('2%'), alignItems: 'center' }}>
                <H3 style={{ color: 'darkorange', fontWeight: "bold" }}>Bildirimler</H3>
            </View>


            <View style={styles.divider} />

            <Content style={{ marginHorizontal: hp('2%') }}>

                <SafeAreaView style={{ margin:  hp('2%') }} >
                    <Notifications />
                </SafeAreaView >
            </Content>


            <AppFooter {...props} />

        </Container>

    );
};
const styles = StyleSheet.create({
    active: {
        backgroundColor: 'darkorange',
    },
    passive: {
        backgroundColor: 'lightgray',
    },
    divider: {
        height: 3,
        backgroundColor: 'darkorange',
        marginHorizontal:  wp('2%'),
    },
    menu: {
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'darkseagreen',
        borderRadius: 3,
        color: 'white'
    }

});

export default Profile;