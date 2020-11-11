import React,{useContext, useEffect} from 'react';
import { AppContext } from '../../../provider/AppProvider';

import { Dimensions, View, ScrollView } from 'react-native';

import { Container, Header, Content, Button, Form, Item, Input, Title, Left, Right, Body, List, ListItem, Thumbnail, Separator, Text, H1, H2, H3, H4 } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from 'react-native-easy-grid';

const Members = () => {
    const state = useContext(AppContext);

    const member = state.accountMembers;

    return (
        <Container >
            <Content >

                <List >
                    <ScrollView>
                        {
                            member.map(list =>
                                <ListItem thumbnail key={list.kullaniciID} >

                                    <Body>
                                        <Text>{list.firstName}</Text>
                                        <Text note numberOfLines={2}>{list.lastName}</Text>

                                    </Body>
                                    <Right>
                                    <Icon  name='account' size={30} color="steelblue" />
                                    </Right>

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