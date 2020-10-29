import React, { useContext } from 'react';
import { AppContext } from '../../provider/AppProvider'

import {
    Dimensions,
    View,
} from 'react-native';


import { Container, Header, Content, Button, Form, Item, Input, Title, Left, Right, Body, List, ListItem, Thumbnail, Separator, Text,H1, H2 ,H3,H4} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from 'react-native-easy-grid';



const DebtTracking = (props) => {

    const login = useContext(AppContext);
    const { height: screenHeight } = Dimensions.get('window');

    const [loginForm, setValid] = React.useState({ emailValid: true, passwordValid: true });

    const emailChange = (val) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(val) === false) {
            login.setLoginData({ ...login.loginData, email: val });
            setValid({ ...loginForm, emailValid: false });
        }
        else {
            login.setLoginData({ ...login.loginData, email: val });
            setValid({ ...loginForm, emailValid: true });
        }
    }
    const passwordChange = (val) => {

        if (val.trim().length > 0) {
            login.setLoginData({ ...login.loginData, password: val });
            setValid({ ...loginForm, passwordValid: true });
        }
        else {
            login.setLoginData({ ...login.loginData, password: val });
            setValid({ ...loginForm, passwordValid: false });
        }
    }

    const handleSubmit = () => {

        if (login.password != null && login.email != null) {
            login.handleLogin();
        }
        else {
            setValid({ emailValid: false, passwordValid: false });
        }
    }
    return (

        <Container >

            <Content >
                <Grid  style={{marginTop:20}} >
                    <Col style={{}}>
                        
                        <Separator style={{backgroundColor:'lightgreen',margin:5,borderRadius: 5}}>
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
                        <Separator  style={{backgroundColor:'lightsalmon',margin:5,borderRadius: 5}}>
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
                    </Col>
                </Grid>
            </Content>
        </Container>
    );
}
//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default DebtTracking;
