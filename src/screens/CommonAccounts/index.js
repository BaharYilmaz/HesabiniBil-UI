import React, { useContext } from 'react';
import { AppContext } from '../../provider/AppProvider'

import {
    Dimensions,
    View,
} from 'react-native';


import { Container, Header, Content, Button, Form, Item, Input, Title, Left, Right, Body, List, ListItem, Badge, Thumbnail, Separator, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from 'react-native-easy-grid';



const CommonAccounts = (props) => {

    return (

        <Container >

            <Content style={{ margin: 20 }}>

                <View style={{ backgroundColor: 'lightblue', margin: 5, padding: 10, alignItems: 'center', borderRadius: 5 }}>
                    <H3 style={{ color: 'white' }}>Ortak Hesaplar</H3>
                </View>
                <List >
                    <ListItem thumbnail >

                        <Body>
                            <Text style={{ marginBottom: 10 }}>Hesap 1</Text>
                            <Badge warning>
                                <Text style={{ color: 'white' }} note numberOfLines={1}>Aile</Text>
                            </Badge>

                        </Body>
                        <Right>
                            <Button transparent>
                                <Text>Hesaba Git</Text>
                            </Button>
                        </Right>

                    </ListItem>
                    <ListItem thumbnail>

                        <Body>
                            <Text style={{ marginBottom: 10 }}>Hesap 2</Text>
                            <Badge warning>
                                <Text style={{ color: 'white' }} note numberOfLines={1}>Ev Arkadaşları</Text>
                            </Badge>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text>Hesaba Git</Text>
                            </Button>
                        </Right>
                    </ListItem>

                </List>
            </Content>
            <Footer style={{ backgroundColor: 'transparent', margin: 30 }}>
                <FooterTab style={{ backgroundColor: 'transparent', margin: 20 }}>
                    <Left>
                        <Button rounded style={{ backgroundColor: 'lightgreen' }}>
                            <Text>Hesap Oluştur</Text>

                        </Button>
                    </Left>

                    <Right>
                        <Button rounded style={{ backgroundColor: 'lightpink' }}>
                            <Text>Hesaba Üye Ol</Text>
                        </Button>
                    </Right>

                </FooterTab>
            </Footer>

        </Container>
    );
}
//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default CommonAccounts;
