import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../provider/AppProvider'

import { Dimensions, View, ScrollView, StyleSheet ,TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import { Overlay } from 'react-native-elements';

const Debtor = () => {
    const state = useContext(AppContext);
    let debt = state.debt;
    const [subList, setSubList] = useState({ visible: false, id: '' })

    useEffect(() => {
        state.getAllDebts()

    }, []);

    const toggleModal = (alacakliID, borcID) => {
        setSubList({ visible: !subList.visible, id: alacakliID });
        state.getDebtDetail(borcID, alacakliID)
    };

    return (
        <Container>
            <Content >

                <List >
                    {debt ?
                        <ScrollView>
                            {
                                debt.map(list =>
                                    <View key={list.alacakliID}>


                                        <ListItem thumbnail key={list.alacakliID}  >

                                            <Body>
                                                <Text style={{ color: 'slateblue', fontWeight: 'bold' }}>{list.toplamTutar} TL</Text>

                                                <Text note numberOfLines={1}>Kime: {list.alacaklıAdSoyad}</Text>
                                            </Body>
                                            <Right>
                                                <Text onPress={() => toggleModal(list.alacakliID, list.borcID)}>Detay</Text>
                                            </Right>

                                        </ListItem>
                                        {
                                            subList.visible == true && list.alacakliID == subList.id ?

                                                state.debtDetail ?
                                                    <List style={{ marginHorizontal: wp('5%') }}>
                                                        {state.debtDetail.map(list =>

                                                            <ListItem key={list.alisverisFisID}  >

                                                                <Body>
                                                                    <Text style={{ color: 'slateblue', fontWeight: 'bold' }}>{list.ortakHesapAd} </Text>
                                                                    <Text note numberOfLines={1}>{list.borcTutar} TL</Text>

                                                                    <Text note numberOfLines={1}>{list.borcTarih}</Text>
                                                                </Body>
                                                                <Right><TouchableOpacity><Text note>Ödeme Bildir</Text></TouchableOpacity></Right>

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
                        : <Text style={{ color: 'lightgray', textAlign: 'center' }}>Borcunuz yok... </Text>
                    }
                </List>



            </Content>
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
        borderRadius: 5
    },
    bodyText: {
        textAlign: 'center'
    },
    textDetail: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 20,
        fontSize: 20,
    }
});

export default Debtor;