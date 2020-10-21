import React, { useContext } from 'react';
import { AppContext } from '../../provider/AppProvider'

import {
    Dimensions,
    View,
} from 'react-native';



import { Container, Header, Content, Button, Form, Item, Input, Title, H2, H3, Text, Body, Badge } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const Login = (props) => {

    const login = useContext(AppContext);
    const { height: screenHeight } = Dimensions.get('window');

    const emailChange = (val) => {
        login.setLoginData({ ...login.loginData, email: val });
    }
    const passwordChange = (val) => {
        login.setLoginData({ ...login.loginData, password: val });
    }
    const handleSubmit = () => {

        // if (userForm.valid) { 
        // } else {
        // }
        login.handleLogin();
    }

    return (

        <Container >
            <Header />
            {/* <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-left-thick' size={30} color="white" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Title</Title>
                        color="#635DB7"
                    </Body> 
                </Header>*/}
            <Content >
                <View style={{ flex: 1, height: screenHeight, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <H2 style={{ color: 'gray', marginBottom: 50 }}>HESABINI BİL</H2>
                    </View>

                    <Form style={{ margin: 20 }}>
                        <Item style={{ margin: 20, padding: 5 }}>
                            <Input placeholder="E-posta" onChangeText={(val) => emailChange(val)} />
                            <Icon name='account-outline' size={30} color="gray" />

                        </Item>
                        <Item style={{ margin: 20, padding: 5 }}>
                            <Input placeholder="Şifre" onChangeText={(val) => passwordChange(val)} />
                            <Icon name='lock-outline' size={30} color="gray" />
                        </Item>
                        <Button block rounded style={{ margin: 15, padding: 5 }} onPress={handleSubmit} ><Text> Giriş Yap </Text></Button>
                        <View style={{ alignItems: 'center' }}>
                            <Text> Hesabın yok mu ?</Text>
                            <Button transparent block onPress={() => props.navigation.navigate('SignUp')} >
                                <Text style={{ textDecorationLine: 'underline' }}>Kayıt Ol</Text>
                            </Button>
                        </View>
                    </Form>
                </View>
            </Content>
        </Container>
    );
}
//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default Login;
