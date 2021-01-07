import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../provider/AppProvider'

import { Dimensions, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import { Icon, Overlay } from 'react-native-elements';

const Notifications = () => {
    const state = useContext(AppContext);
    let notify = state.notify;
    const [modal, setModal] = useState({ modalVisible: false, data: '' })

    useEffect(() => {
        state.getNotifications()
    }, []);

    const toggleModal = (data) => {
        setModal({ modalVisible: !modal.modalVisible, data: data });
    };

    const confirmNotify = (data) => {
        // state.confirmPayment(data)
        state.confirmPayment(data)

        toggleModal('')

    };
console.log(notify)

    return (
        <Container>
            <Content >
                {
                    notify.length > 0 ?
                        <List >
                            <ScrollView>
                                {
                                    notify.map(list =>
                                        <ListItem thumbnail key={list.bildirimID} >
                                            {
                                                list.isCheck ? null
                                                    : <View style={styles.divider} />
                                            }

                                            <Body>
                                                {list.bildirimTurID === 2 ?
                                                    <Text style={{ color: 'darkorange' }}>{list.bildirimBaslik}</Text>

                                                    : <View style={{ flexDirection: "row", marginRight: wp('10%') }}>
                                                        <Left><Text style={{ color: 'green' }}>{list.bildirimBaslik}</Text></Left>
                                                        <Right><TouchableOpacity onPress={() => toggleModal(list.bildirimID,list.bildirimIcerikID)}><Text style={{ textDecorationLine: 'underline', color: 'darkorange' }} >Onayla</Text></TouchableOpacity></Right>
                                                    </View>


                                                }
                                                <Text note numberOfLines={5}>{list.bildirimMetin}</Text>
                                            </Body>

                                        </ListItem>

                                    )
                                }
                            </ScrollView>
                        </List>

                        : <Text style={{ color: 'lightgray', textAlign: 'center' ,margin:wp('10%') }}>Bildirim yok... </Text>
                }


            </Content>
            <Overlay
                isVisible={modal.modalVisible} onBackdropPress={() => toggleModal('')}
            >

                <View style={styles.modalBody}>
                    <Text numberOfLines={4} style={styles.bodyText}>Ödemenin tarafınıza yapıldığını onaylıyor musunuz ?</Text>

                    <View style={{ flexDirection: "row", marginVertical: 20, alignItems: 'center' }}>

                        <Left>
                            <Button block style={{ margin: 10, backgroundColor: 'slateblue' }} onPress={() => confirmNotify(modal.data)} >
                                <Text >Evet</Text>
                            </Button>
                        </Left>

                        <Right>
                            <Button block style={{ margin: 10, backgroundColor: 'indianred' }} onPress={() => toggleModal('')}>
                                <Text >Hayır</Text>
                            </Button>
                        </Right>

                    </View>

                </View>
            </Overlay>
        </Container>
    );
};
const styles = StyleSheet.create({

    divider: {
        height: wp('20%'),
        width: 4,
        backgroundColor: 'steelblue',
    },
    modalBody: {
        backgroundColor: "#fff",
        paddingVertical: 30,
        paddingHorizontal: 20,
        width: wp('60%'),
        borderRadius: 5
    },
});

export default Notifications;