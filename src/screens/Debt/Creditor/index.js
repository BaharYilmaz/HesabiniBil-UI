import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../provider/AppProvider'


import { Dimensions, View, ScrollView, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import { Icon } from 'react-native-elements';

const Creditor = () => {
    const state = useContext(AppContext);
    let credit = state.credit;
    const [subList, setSubList] = useState({ visible: false, id: '' })


    useEffect(() => {
        state.getAllCredits()
    }, []);

    const toggleModal = (userId, borcID) => {
        if (userId == subList.id) {
            setSubList({ visible: !subList.visible, id: userId });

        }
        else {
            setSubList({ visible: true, id: userId });

        }
        state.getDebtDetail(borcID, userId)
    };
    return (
        <Container>
            <Content >

                <List >
                    {credit ?
                        <ScrollView>
                            {
                                credit.map(list =>
                                    <View key={list.borcluID}>
                                        <ListItem thumbnail key={list.borcluID}  >

                                            <Body>
                                                <Text style={{ color: 'limegreen', fontWeight: 'bold' }}>{list.toplamTutar} TL</Text>
                                                <Text note numberOfLines={1}>Kimden: {list.borcluAdSoyad}</Text>
                                            </Body>
                                            <Right>
                                                {
                                                    subList.visible == true && list.borcluID == subList.id ?

                                                        <Icon name='angle-down' type='font-awesome' color="gray" onPress={() => toggleModal(list.borcluID, list.borcID)} />
                                                        :
                                                        <Icon name='angle-right' type='font-awesome' color="gray" onPress={() => toggleModal(list.borcluID, list.borcID)} />
                                                }
                                            </Right>

                                        </ListItem>
                                        {
                                            subList.visible == true && list.borcluID == subList.id ?

                                                state.debtDetail ?
                                                    <List style={{ marginHorizontal: wp('5%') }}>
                                                        {state.debtDetail.map(list =>

                                                            <ListItem key={list.alisverisFisID}  >

                                                                <Body>
                                                                    <Text note>Grup: <Text note style={{ color: 'limegreen', fontWeight: 'bold' }}>{list.ortakHesapAd} </Text></Text>
                                                                    <Text note numberOfLines={1}>Tutar: {list.borcTutar} TL</Text>

                                                                    <Text note numberOfLines={1}>Tarih: {list.borcTarih}</Text>
                                                                </Body>
                                                                {/* <Right><TouchableOpacity><Text note>Ödeme Bildir</Text></TouchableOpacity></Right> */}

                                                            </ListItem>
                                                        )}
                                                    </List>
                                                    : null


                                                : null
                                        }


                                    </View>
                                )
                            }

                        </ScrollView>
                        : <Text style={{ color: 'lightgray', textAlign: 'center' }}>Alacağınız yok... </Text>
                    }
                </List>




            </Content>
        </Container>
    );
};

export default Creditor;