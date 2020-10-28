import React, { useContext } from 'react';
import { AppContext } from '../../provider/AppProvider'

import {
    Dimensions,
    View,
    Alert,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


import { Container, Header, Content, Button, Form, Item, Input, Title, H2, H3, Text, Body, Badge } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from '../../components/MessageModal';


const Login = (props) => {

    const login = useContext(AppContext);
    const { height: screenHeight } = Dimensions.get('window');

    const [loginForm, setValid] = React.useState({ emailValid: false, passwordValid: false, emailError: false, passwordError: false });
    const [isModalVisible, setModalVisible] = React.useState(false);

    const emailChange = (val) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(val) === false) {
            login.setLoginData({ ...login.loginData, email: val });
            setValid({ ...loginForm, emailValid: false, emailError: true });
        }
        else {
            login.setLoginData({ ...login.loginData, email: val });
            setValid({ ...loginForm, emailValid: true, emailError: false });
        }
    }
    const passwordChange = (val) => {

        if (val.trim().length > 0) {
            login.setLoginData({ ...login.loginData, password: val });
            setValid({ ...loginForm, passwordValid: true, passwordError: false });
        }
        else {
            login.setLoginData({ ...login.loginData, password: val });
            setValid({ ...loginForm, passwordValid: false, passwordError: true });
        }
    }

    const handleSubmit = () => {

        if (loginForm.passwordValid == true && loginForm.emailValid == true) {
            login.handleLogin();

        }
        else {
            // mesaj
            console.log("hata")
           login.setModalVisible(true);
            // Alert.alert(
            //     'Uyarı !',
            //     'Bu form boş bırakılamaz',
            //     [
            //         //   {
            //         //     text: 'Ask me later',
            //         //     onPress: () => console.log('Ask me later pressed')
            //         //   },
            //         //   {
            //         //     text: 'Cancel',
            //         //     onPress: () => console.log('Cancel Pressed'),
            //         //     style: 'cancel'
            //         //   },
            //         { text: 'Tamam', onPress: () => console.log('OK Pressed') }
            //     ],
            //     { cancelable: false }
            // );
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
                        {loginForm.emailError ? <Text style={{ margin: 15, padding: 5, color: 'red' }}>Lütfen uygun bir mail adresi giriniz !</Text> : null}

                        <Item style={{ margin: 15, padding: 5 }} >
                            <Input placeholder="Şifre" onChangeText={(val) => passwordChange(val)} />
                            <Icon name='lock-outline' size={30} color="gray" />
                        </Item>
                        {loginForm.passwordError ? <Text error style={{ margin: 15, padding: 5, color: 'red' }}>Lütfen şifrenizi giriniz !</Text> : null}

                        <Button block rounded disabled={loginForm.formInvalid} style={{ margin: 25, padding: 5 }} onPress={handleSubmit} ><Text> Giriş Yap </Text></Button>
                        <View style={{ alignItems: 'center' }}>
                            <Text> Hesabın yok mu ?</Text>
                            <Button transparent block onPress={() => props.navigation.navigate('SignUp')} >
                                <Text style={{ textDecorationLine: 'underline' }}>Kayıt Ol</Text>
                            </Button>
                        </View>
                    </Form>

                   <Modal/>

                </View>

            </Content>
        </Container>
    );
}

//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default Login;
