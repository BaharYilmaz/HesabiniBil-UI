import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../provider/AppProvider';
import Clipboard from '@react-native-community/clipboard';
import { Dimensions, View, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Form, Item, Input, Title, Left, Right, Body, List, ListItem, Thumbnail, Separator, Text, H1, H2, H3, H4 } from 'native-base';
import { Icon } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Members = (props) => {
    const state = useContext(AppContext);

    useEffect(() => {
        state.getAccountMembers(props.accountId)
    }, []);
    const member = state.accountMembers;


    const copyToClipboard = (kod) => {
        Clipboard.setString(kod);
        Toast.showWithGravity('Iban numarası panoya kopyalandı.', Toast.LONG, Toast.TOP);
    };
    return (
        <Container >
            <Content >

                <List >
                    <ScrollView>
                        {
                            member.map(list =>
                                <ListItem thumbnail key={list.kullaniciID} >

                                    <Body>
                                        <Text>{list.firstName} {list.lastName}</Text>
                                        {list.iban.map(iban =>
                                            <TouchableOpacity key={iban.ibanID} onPress={() => copyToClipboard(iban.ibanNo)}>
                                                <Text note numberOfLines={2}>TR {iban.ibanNo}</Text>
                                            </TouchableOpacity>
                                        )
                                        }
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

export default Members;