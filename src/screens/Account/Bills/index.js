import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../provider/AppProvider';

import { Dimensions, View, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Form, Item, Input, Title, Left, Right, Body, List, ListItem, Thumbnail, Separator, Text, H1, H2, H3, H4 } from 'native-base';
import { Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Bills = (props) => {

    const state = useContext(AppContext);
    // useEffect(() => {
    //     state.getBill(props.accountId)
    // }, []);
    const bills = state.bills;

    return (
        <Container >
            <Content >
                {bills ?

                    <List >
                        <ScrollView>
                            {
                                bills.map(list =>
                                    <ListItem onPress={() => props.props.navigation.navigate('BillDetay', { list: list })} thumbnail key={list.alisverisFisID} style={{ marginHorizontal: wp('2%') }}>
                                        <Body>
                                            <Text>{list.toplamTutar} TL</Text>
                                            <Text note numberOfLines={1}>Yükleyen: {list.kullaniciAd} {list.kullaniciSoyad}</Text>
                                        </Body>
                                        <Right>
                                            <Text note numberOfLines={1}>{list.tarih}</Text>
                                        </Right>
                                    </ListItem>
                                )
                            }
                        </ScrollView>
                    </List>
                    : <Text style={{ color: 'lightgray', textAlign: 'center' }}>Gösterilecek fiş yok... </Text>
                }
            </Content>
        </Container>
    );
};


export default Bills;

