import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, View, ScrollView, StyleSheet } from 'react-native';

import { AppContext } from '../../../provider/AppProvider'


const BillList = (props) => {
    const bill = props.route.params.list;

    return (
        <Container>
             <View style={{flexDirection:'row',marginHorizontal:wp('3%') }}>
                    <Left><Text  style={{fontSize:15,color:'dimgray',fontStyle:'italic'}}>Fiş Toplamı: { bill.toplamTutar} TL</Text></Left>
                    <Right><Text style={{fontSize:15,color:'dimgray',fontStyle:'italic'}}>Yüklenme Tarihi: { bill.tarih}</Text></Right>
                </View>
                <View style={styles.divider} />
            <Content >
               

                <List >
                    <ScrollView>
                        {
                            bill.alisverisFisDetay.map(list =>
                                <ListItem thumbnail key={list.alisverisFisDetayID} style={{ marginHorizontal: wp('2%') }}>
                                    <Body>
                                        <Text>{list.urunAd}</Text>
                                        <Text note numberOfLines={1}>Fiyatı: {list.urunFiyat} TL </Text>
                                    </Body>

                                </ListItem>
                            )
                        }
                    </ScrollView>
                </List>
            </Content>
        </Container>
    );
};

export default BillList;
const styles = StyleSheet.create({
   
    divider: {
        height: 2,
        backgroundColor: 'gray',
        marginHorizontal: wp('3%'),
        marginVertical: wp('1%')
    }
});