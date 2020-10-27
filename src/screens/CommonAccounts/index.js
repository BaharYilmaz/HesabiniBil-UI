import React, { useContext } from 'react';
import { AppContext } from '../../provider/AppProvider'

import {
    Dimensions,
    View,
} from 'react-native';


import { Container, Header, Content, Button, Form, Item, Input, Title, Left, Right, Body, List, ListItem, Thumbnail, Separator, Text,H1, H2 ,H3,H4} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from 'react-native-easy-grid';



const CommonAccounts = (props) => {

    return (

        <Container >

            <Content >
                <Grid  style={{marginTop:20}} >
                    {/* <Col style={{}}>
                        
                        <Separator style={{backgroundColor:'lightgreen',margin:5}}>
                        <H3 style={{color:'white'}}>Alacaklarım</H3> 
                        </Separator>
                        <List >
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
                        </List>
                    </Col>
                    <Col style={{}}>
                        <Separator  style={{backgroundColor:'lightsalmon',margin:5}}>
                            <H3 style={{color:'white'}}>Borçlarım</H3>
                        </Separator>
                        <List>
                            <ListItem thumbnail>

                                <Body>
                                    <Text>100 TL</Text>
                                    <Text note numberOfLines={1}>Mustafa Taha Soydan</Text>
                                </Body>
                                <Right>
                                    <Button transparent>
                                        <Text>Ödeme{"\n"} Bildir</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                            <ListItem thumbnail>
                                <Body>
                                    <Text>100 TL</Text>
                                    <Text note numberOfLines={1}>Mustafa Taha Soydan</Text>
                                </Body>
                                <Right>
                                    <Button transparent>
                                        <Text>Ödeme{"\n"} Bildir</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                        </List>
                    </Col> */}
                </Grid>
            </Content>
        </Container>
    );
}
//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default CommonAccounts;
