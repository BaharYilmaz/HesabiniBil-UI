import React, { useContext } from 'react';
import { AppContext } from '../../../provider/AppProvider';

import { Dimensions, View, ScrollView} from 'react-native';

import { Container, Header, Content, Button, Form, Item, Input, Title, Left, Right, Body, List, ListItem, Thumbnail, Separator, Text, H1, H2, H3, H4 } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from 'react-native-easy-grid';


const Bills = (props) => {

    const state = useContext(AppContext);

    return (
        <Container >
            <Content >

                <List >
                    <ScrollView>
                    <ListItem thumbnail >

                        <Body>
                            <Text>100 TL</Text>
                            <Text note numberOfLines={2}>Taha Soydan</Text>

                        </Body>
                        <Right>

                        </Right>

                    </ListItem>
                    <ListItem thumbnail>

                        <Body>
                            <Text>100 TL</Text>
                            <Text note numberOfLines={2}>Taha Soydan</Text>

                        </Body>
                        <Right>

                        </Right>

                    </ListItem>
                    </ScrollView>
                </List>

            </Content>
        </Container>
    );
};

export default Bills;

