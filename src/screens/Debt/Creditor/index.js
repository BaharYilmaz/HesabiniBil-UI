import React, {useContext, useEffect, useState}from 'react';
import { AppContext } from '../../../provider/AppProvider'


import { Dimensions, View, ScrollView, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';

const Creditor = () => {
    const state = useContext(AppContext);
    let credit = state.credit;
    useEffect(() => {
        state.getAllCredits()
    }, []);

    return (
        <Container>
            <Content >

                <List >
                {credit?
                    <ScrollView>
                        {
                            credit.map(list =>

                                <ListItem thumbnail key={list.borcluID}  >

                                    <Body>
                                        <Text  style={{color:'slateblue',fontWeight:'bold'}}>{list.toplamTutar} TL</Text>
                                        <Text note numberOfLines={1}>Kimden: {list.borcluAdSoyad}</Text>
                                    </Body>

                                </ListItem>

                            )
                        }

                    </ScrollView>
                    :                    <Text style={{ color: 'lightgray', textAlign: 'center' }}>Alacağınız yok... </Text>
}
                </List>




            </Content>
        </Container>
    );
};

export default Creditor;