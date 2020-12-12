import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../provider/AppProvider'

import { Dimensions, View, ScrollView, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';

const Debtor = () => {
    const state = useContext(AppContext);
    let debt = state.debt;
    let creditor = []

    useEffect(() => {
        state.getAllDebt()
        //creditor = groupBy(state.debt, 'borcluID')
    }, []);

    // const sumOfDebts = state.debt.reduce((sum, currentValue) => {
    //     return sum + currentValue.borcTutar;
    // }, 0);
    const sumOfDebts = (id) => {
        return state.debt.filter(item => item.borcTutar = id).reduce((sum, currentValue) => {
            return sum +currentValue.borcTutar;
        },0)
         
    }
    //console.log(sumOfDebts)
    let id = [];

    const groupBy = (array, key) => {
        var num = 0
        return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
            id.push({ id: currentValue[key] })
            return result;
        }, {});
    };

    // Group by color as key to the person array
    creditor = groupBy(state.debt, 'borcTarih')
    console.log(id)

    return (
        <Container>
            <Content >

                <List >
                    <ScrollView>
                        {
                            id.map(list =>

                                <ListItem thumbnail  >

                                    <Body>
                                        <Text style={{ color: 'darkorange' }}>{list.id}</Text>
                                        <Text note numberOfLines={1}>Toplam borcunuz: {sumOfDebts(list.id)} TL</Text>
                                    </Body>

                                </ListItem>

                            )
                        }

                    </ScrollView>
                </List>

                {/* : <Text>gg</Text> */}



            </Content>
        </Container>
    );
};
const styles = StyleSheet.create({

    divider: {
        height: wp('20%'),
        width: 4,
        backgroundColor: 'steelblue',
    }
});

export default Debtor;