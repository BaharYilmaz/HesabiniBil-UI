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

    const [loginForm, setValid] = React.useState({ emailValid: true, passwordValid: true });

    const emailChange = (val) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(val) === false ) {
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
            <Header />
            <Content >
                <View style={{ flex: 1, height: screenHeight, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <H2 style={{ color: 'gray', marginBottom: 50 }}>HESABINI BİL</H2>
                    </View>

                    <Form style={{ margin: 20 }}>

                        <Item style={{ margin: 15, padding: 5 }}   >
                            <Input placeholder="E-posta" onChangeText={(val) => emailChange(val)} />
                            <Icon name='email-outline' size={30} color="gray" />
                        </Item>
                        {loginForm.emailValid ? null :
                            <Text style={{ margin: 15, padding: 5 ,color:'red' }}>Lütfen uygun bir mail adresi giriniz !</Text>
                        }

                        <Item style={{ margin: 15, padding: 5 }} >
                            <Input placeholder="Şifre" onChangeText={(val) => passwordChange(val)} />
                            <Icon name='lock-outline' size={30} color="gray" />
                        </Item>
                        {loginForm.passwordValid ? null :
                            <Text error style={{ margin: 15, padding: 5 ,color:'red' }}>Lütfen şifrenizi giriniz !</Text>
                        }

                        <Button block rounded style={{ margin: 25, padding: 5}} onPress={handleSubmit} ><Text> Giriş Yap </Text></Button>
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
