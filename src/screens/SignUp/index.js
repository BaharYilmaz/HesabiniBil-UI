import React, { useContext } from 'react';
import { AppContext } from '../../provider/AppProvider'

import {
    Dimensions,
    View,
    Alert
} from 'react-native';



import { Container, Header, Content, Button, Form, Item, Input, Title, H2, Left, Text, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from '../../components/MessageModal';


//this.props.navigation.goBack();
const SignUp = (props) => {

    const [registerForm, setValid] = React.useState({
        emailValid: true, passwordValid: true, firstNameValid: true, lastNameValid: true,
        emailError: false, passwordError: false, firstNameError: false, lastNameError: false
    });

    const register = useContext(AppContext);

    const emailChange = (val) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(val) === false) {
            register.setRegisterData({ ...register.registerData, email: val });
            setValid({ ...registerForm, emailValid: false, emailError: true });
        }
        else {
            register.setRegisterData({ ...register.registerData, email: val });
            setValid({ ...registerForm, emailValid: true, emailError: false });
        }
    }
    const passwordChange = (val) => {
        if (val.trim().length > 0) {
            register.setRegisterData({ ...register.registerData, password: val });
            setValid({ ...registerForm, passwordValid: true, passwordError: false });
        }
        else {
            register.setRegisterData({ ...register.registerData, password: val });
            setValid({ ...registerForm, passwordValid: false, passwordError: true });
        }
    }
    const firstNameChange = (val) => {
        if (val.trim().length > 0) {
            register.setRegisterData({ ...register.registerData, firstName: val });
            setValid({ ...registerForm, firstNameValid: true, firstNameError: false });
        }
        else {
            register.setRegisterData({ ...register.registerData, firstName: val });
            setValid({ ...registerForm, firstNameValid: false, firstNameError: true });
        }
    }
    const lastNameChange = (val) => {
        if (val.trim().length > 0) {
            register.setRegisterData({ ...register.registerData, lastName: val });
            setValid({ ...registerForm, lastNameValid: true, lastNameError: false });
        }
        else {
            register.setRegisterData({ ...register.registerData, lastName: val });
            setValid({ ...registerForm, lastNameValid: false, lastNameError: true });
        }
    }
    const handleSubmit = () => {

        if (register.passwordValid == true && register.emailValid == true && register.firstNameValid == true && register.lastNameValid == true) {
            register.handleRegister();
        }
        else {
            console.log("hata register");
            register.setModalVisible(true);
        }
    }

    const { height: screenHeight } = Dimensions.get('window');

    return (

        <Container >
            <Header>
                <Left>
                    <Button transparent onPress={() => props.navigation.navigate('Login')}>
                        <Icon name='arrow-left-thick' size={30} color="white" />
                    </Button>
                </Left>
                <Body>
            <Title>Kayıt Ekranı</Title>
          </Body>
            </Header>
            <Content >
                <View style={{ flex: 1, height: screenHeight, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <H2 style={{ color: 'gray', marginBottom: 50 }}>Aramıza Katıl  :) </H2>
                    </View>
                    <Form style={{ margin: 20 }}>
                        <Item style={{ margin: 20, padding: 5 }}>
                            <Input placeholder="İsim" onChangeText={(val) => firstNameChange(val)} />
                        </Item>
                        {registerForm.firstNameError ? <Text style={{ margin: 15, padding: 5, color: 'red' }}>Lütfen adınızı giriniz !</Text> : null}
                        <Item style={{ margin: 20, padding: 5 }}>
                            <Input placeholder="Soyisim" onChangeText={(val) => lastNameChange(val)} />
                        </Item>
                        {registerForm.lastNameError ? <Text style={{ margin: 15, padding: 5, color: 'red' }}>Lütfen soyadınızı giriniz !</Text> : null}
                        <Item style={{ margin: 20, padding: 5 }}>
                            <Input placeholder="E-posta" onChangeText={(val) => emailChange(val)} />
                        </Item>
                        {registerForm.emailError ? <Text style={{ margin: 15, padding: 5, color: 'red' }}>Lütfen uygun bir mail adresi giriniz !</Text> : null}
                        <Item style={{ margin: 20, padding: 5 }}>
                            <Input placeholder="Şifre" onChangeText={(val) => passwordChange(val)} />
                        </Item>
                        {registerForm.passwordError ? <Text style={{ margin: 15, padding: 5, color: 'red' }}>Lütfen şifrenizi giriniz !</Text> : null}

                        <Button block rounded style={{ margin: 15, padding: 5 }} onPress={handleSubmit}  ><Text> Kayıt ol </Text></Button>
                    </Form>
                    <Modal/>
                </View>
            </Content>
        </Container>
    );
}


//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default SignUp;
