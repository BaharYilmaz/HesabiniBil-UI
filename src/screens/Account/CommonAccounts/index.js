import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../provider/AppProvider'

import { Dimensions, ScrollView, FlatList, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Form, Item, Input, Title, Left, Right, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import { Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Modal from '../HomeAccount/HomeModal/JoinAccountModal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppFooter from '../../../components/Footer'

const CommonAccounts = (props) => {

    const state = useContext(AppContext);
    const accountList = state.accountList;

    useEffect(() => {
        state.getAccounts()

    }, [state.userId]);

    return (
        < Container  >
            <Header />
            <View style={styles.header}>
                <H3 style={styles.headerText}>Ortak Hesaplar</H3>
            </View>
            <Content style={styles.container} >

                <SafeAreaView >
                    {accountList.length > 0 ?
                        <List >

                            <ScrollView >

                                {
                                    accountList.map(list =>
                                        <ListItem thumbnail key={list.ortakHesapID} >
                                            <Body>
                                                <Text style={{ margin: hp('1%') }} onPress={() => props.navigation.navigate('HomeAccount', { account: list })}>{list.hesapAd}</Text>
                                                <Badge warning>
                                                    <Text style={{ color: 'white' }} note numberOfLines={1}>{list.hesapTurID == 1 ? 'Aile' : 'Ev Arkadaşları'}</Text>
                                                </Badge>
                                            </Body>
                                            <Right>
                                                <TouchableOpacity style={styles.button} transparent onPress={() => props.navigation.navigate('HomeAccount', { account: list })}>
                                                    {/* <Text style={styles.buttonText}>Hesaba Git</Text> */}
                                                    <Icon name='angle-right' type='font-awesome' color="steelblue" />

                                                </TouchableOpacity>
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            </ScrollView>
                        </List>
                        : <Text style={{ color: 'lightgray', textAlign: 'center' }}>Üyesi olduğunuz bir ev hesabı yok... </Text>
                    }
                </SafeAreaView >

            </Content>
            <Footer style={styles.footer}>
                <FooterTab style={styles.footer}>
                    <Left>
                        <Button rounded style={{ backgroundColor: 'darkseagreen' }} onPress={() => props.navigation.navigate('CreateHomeAccount')}>
                            <Text style={styles.text}>Hesap Oluştur</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button rounded style={{ backgroundColor: 'palevioletred' }}
                            onPress={() => state.setModalJoin({ modalVisible: true })}>
                            <Text style={styles.text}>Hesaba Üye Ol</Text>
                        </Button>
                        <Modal />
                    </Right>
                </FooterTab>
            </Footer>

            <AppFooter {...props} />

        </Container >
    );
}

export default CommonAccounts;


const styles = StyleSheet.create({
    header: {
        backgroundColor: 'lightblue', margin: hp('2%'), padding: wp('2%'), borderRadius: 5, alignItems: 'center'
    },
    headerText: {
        color: 'white', fontSize: wp('5%')
    },
    text: {
        fontSize: wp('3%')
    },
    container: {
        marginRight: hp('1.5%')
    },
    footer: {
        backgroundColor: 'transparent', margin: hp('1.5%')
    },
    button: {
        marginTop: hp('4%')
    },
    buttonText: {
        color: 'steelblue'
    }

})