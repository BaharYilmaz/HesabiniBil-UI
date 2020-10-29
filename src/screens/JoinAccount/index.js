import React, { useContext } from 'react';
import { AppContext } from '../../provider/AppProvider'

import {
    Dimensions,
    View,
} from 'react-native';


import { Container, Header, Content, Button, Form, Item, Input, Title, Left, Right, Body, List, ListItem, Thumbnail, Separator, Text,H1, H2 ,H3,H4} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AppFooter from '../../components/Footer'



const JoinAccount = (props) => {

    const login = useContext(AppContext);
    const { height: screenHeight } = Dimensions.get('window');

    const [loginForm, setValid] = React.useState({ emailValid: true, passwordValid: true });

   
    return (

        <Container >
                <Header />

            <Content >
               
                        
                        <H3 style={{color:'white'}}>join</H3> 
                       
                   
            </Content>
            <AppFooter {...props} />

        </Container>
    );
}
//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default JoinAccount;
