import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import { Dimensions, ScrollView, FlatList, View, SafeAreaView, StyleSheet, Clipboard, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import BillFoto from "../BillFoto";
import BillList from "../BillList";
import AppFooter from '../../../../components/Footer'
import AppHeader from '../../../../components/Header'

const BillDetay = (props) => {
    const [screen, chageScreen] = useState(0)
    const bill = props.route.params.list;

    const toggleScreen = (value) => {
        chageScreen(value)
    }
    return (
        <Container>
            <Header screen={'HomeAccount'} />

            <Footer style={{ marginHorizontal: wp('5%'), marginTop: wp('5%'), alignSelf: 'center', backgroundColor: 'transparent' }} >
                <FooterTab style={{ backgroundColor: 'transparent' }} >
                    <Left>
                        <Button block onPress={() => toggleScreen(0)} style={screen == 0 ? styles.active : styles.passive}>
                            <Text >Fiş İçeriği</Text>
                        </Button>
                    </Left>
                    <Right>

                        <Button block onPress={() => toggleScreen(1)} style={screen == 1 ? styles.active : styles.passive}>
                            <Text>Fiş Fotoğrafı</Text>
                        </Button>
                    </Right>
                </FooterTab>

            </Footer>

            <View style={styles.divider} />
            <Content style={{ marginHorizontal: wp('0.5%') }}>
                <View style={{ margin: wp('5%') }} >
                    {
                        screen === 0 ? <BillList {...props} /> : <BillFoto{...props} />
                    }
                </View >
            </Content>
            <AppFooter {...props} />
        </Container>


    );
};
const styles = StyleSheet.create({
    active: {
        backgroundColor: 'crimson',
    },
    passive: {
        backgroundColor: 'lightgray',
    },
    divider: {
        height: 4,
        backgroundColor: 'crimson',
        marginHorizontal: wp('5%'),
        marginVertical: wp('1%')
    }
});
export default BillDetay;