import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../provider/AppProvider'

import { Dimensions, View, ScrollView, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import { Overlay } from 'react-native-elements';

const Debtor = () => {
    const state = useContext(AppContext);
    let debt = state.debt;
    const [modal, setModal] = useState(true)

    useEffect(() => {
        state.getAllDebts()
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <Container>
            <Content >

                <List >
                    {debt ?
                        <ScrollView>
                            {
                                debt.map(list =>
                                    <View>


                                        <ListItem thumbnail key={list.alacakliID}  >

                                            <Body>
                                                <Text style={{ color: 'slateblue', fontWeight: 'bold' }}>{list.toplamTutar} TL</Text>

                                                <Text note numberOfLines={1}>Kime: {list.alacaklıAdSoyad}</Text>
                                            </Body>

                                        </ListItem>
                                        <View>
                                        <Text >kk</Text>
                                        </View>
                                        
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