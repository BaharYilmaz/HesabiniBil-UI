import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../provider/AppProvider'

import { Dimensions, View, ScrollView, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';

const Notifications = () => {
    const state = useContext(AppContext);
    let notify = state.notify;

    useEffect(() => {
        state.getNotifications()
    }, []);

    return (
        <Container>
            <Content >
                {
                    notify ?
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
                                                <Text style={{color:'darkorange'}}>{list.bildirimBaslik}</Text>
                                                <Text note numberOfLines={5}>{list.bildirimMetin}</Text>
                                            </Body>

                                        </ListItem>

                                    )
                                }
                            </ScrollView>
                        </List>

                        : null
                }


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

export default Notifications;