import React, { useContext, useState } from 'react';
import { AppContext } from '../../../provider/AppProvider'
import { useForm, Controller } from 'react-hook-form'

import {
    Dimensions,
    View,
    Alert, TextInput
} from 'react-native';

import { Container, Header, Content, Button, Form, Item, Input, Title, H2, Left, Text, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from '../../../components/MessageModal';


//this.props.navigation.goBack();
const SignUp = (props) => {

    const { control, handleSubmit, errors } = useForm();
    const state = useContext(AppContext);
    const [password, setPasswordMatch] = useState(true)

    const onSubmit = (data) => {

        var passwordMatch = isPasswordMatch(data.password, data.passwordAgain)

        if (data != null && passwordMatch == true) {
            let registerModel = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            }
            state.handleRegister(registerModel);
        }
        else {
            console.log("hata register");
            //register.setModalVisible(true);
        }
    }
    const isPasswordMatch = (password, passwordAgain) => {
        if (password === passwordAgain) {
            setPasswordMatch(true);
            return true;
        }
        else {
            setPasswordMatch(false)
            return false;
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

                    <View style={{ margin: 30 }}>
                        <Item style={{ margin: 20, padding: 5 }}>
                            <Controller
                                control={control} name="firstName" rules={{ required: true }} defaultValue=""
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput onChangeText={value => onChange(value)} value={value} placeholder='İsim' style={{ fontSize: 20 }} />
                                )}
                            />
                        </Item >
                        {errors.firstName && <Text style={{ color: 'red', marginLeft: 10 }}>Lütfen adınızı giriniz !</Text>}

                        <Item style={{ margin: 20, padding: 5 }}>
                            <Controller
                                control={control} name="lastName" defaultValue="" rules={{ required: true }}
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput onChangeText={value => onChange(value)} value={value} placeholder='Soyisim' style={{ fontSize: 20 }} />
                                )}
                            />
                        </Item>
                        {errors.lastName && <Text style={{ color: 'red', marginLeft: 10 }}>Lütfen soyadınızı giriniz !</Text>}

                        <Item style={{ margin: 20, padding: 5 }}>
                            <Controller
                                control={control} name="email" defaultValue="" rules={{
                                    required: true, pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                                    }
                                }}
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput onChangeText={value => onChange(value)} value={value} placeholder='E-posta' style={{ fontSize: 20 }} />
                                )}
                            />
                        </Item>
                        {errors.email && <Text style={{ color: 'red', marginLeft: 10 }}>Lütfen uygun bir mail adresi giriniz !</Text>}

                        <Item style={{ margin: 20, padding: 5 }}>
                            <Controller
                                control={control} name="password" defaultValue="" rules={{ required: true }}
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput onChangeText={value => onChange(value)} value={value} placeholder='Şifre' secureTextEntry={true} style={{ fontSize: 20 }} />
                                )}
                            />
                        </Item>
                        {errors.password && <Text style={{ color: 'red', marginLeft: 10 }}>Lütfen şifrenizi giriniz !</Text>}
                        <Item style={{ margin: 20, padding: 5 }}>
                            <Controller
                                control={control} name="passwordAgain" defaultValue="" rules={{ required: true }}
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput onChangeText={value => onChange(value)} value={value} placeholder='Şifre(Tekrar)' secureTextEntry={true} style={{ fontSize: 20 }} />
                                )}
                            />
                        </Item>
                        {errors.passwordAgain && <Text style={{ color: 'red', marginLeft: 10 }}>Lütfen şifrenizi tekrar giriniz !</Text>}

                        {password ? null : <Text style={{ color: 'red', marginLeft: 10 }}>Şifre eşleşmedi !</Text>}
                        <Button block rounded style={{ margin: 20, padding: 5 }} onPress={handleSubmit(onSubmit)} ><Text>Kayıt Ol</Text></Button>
                    </View>
                    <Modal />
                </View>
            </Content>
        </Container>
    );
}

//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default SignUp;
