import React, { useContext } from 'react';
import { AppContext } from '../../../provider/AppProvider'
import { useForm, Controller } from 'react-hook-form'

import { Dimensions, View, TextInput } from 'react-native';


import { Container, Header, Content, Button, Form, Item, Input, Title, H2, H3, Text, Body, Badge, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Login = (props) => {

    const state = useContext(AppContext);
    const { height: screenHeight } = Dimensions.get('window');
    const { control, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {

        if (data != null) {
            state.handleLogin(data);
        }
        else {
            console.log("hata login");
            //register.setModalVisible(true);
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
                    <View style={{ margin: 30 }}>
                        <Item style={{ margin: 20, padding: 5 }}>
                            <Controller
                                control={control} name="email" defaultValue="" rules={{
                                    required: true, pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                                    }
                                }}
                                render={({ onChange, onBlur, value }) => (
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput onChangeText={value => onChange(value)} value={value} placeholder='E-posta' style={{ fontSize: 20 }} />
                                        <Right>
                                            <Icon name='email-outline' size={30} color="gray" />
                                        </Right>
                                    </View>
                                )}
                            />
                        </Item>
                        {errors.email && <Text style={{ color: 'red', marginLeft: 10 }}>Lütfen uygun bir mail adresi giriniz !</Text>}

                        <Item style={{ margin: 20, padding: 5 }}>
                            <Controller
                                control={control} name="password" defaultValue="" rules={{ required: true }}
                                render={({ onChange, onBlur, value }) => (
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput onChangeText={value => onChange(value)} value={value} placeholder='Şifre' secureTextEntry={true} style={{ fontSize: 20 }} />
                                        <Right>
                                            <Icon name='lock-outline' size={30} color="gray" />
                                        </Right>
                                    </View>
                                )}
                            />
                        </Item>
                        {errors.password && <Text style={{ color: 'red', marginLeft: 10 }}>Lütfen şifrenizi giriniz !</Text>}

                        <Button block rounded style={{ margin: 5, padding: 5 }} onPress={handleSubmit(onSubmit)} ><Text>Giriş Yap</Text></Button>
                        <Button transparent block onPress={() => props.navigation.navigate('SignUp')} >
                            <Text style={{ textDecorationLine: 'underline', color: 'green' }}>Şifremi unuttum</Text>
                        </Button>
                        <View style={{ alignItems: 'center' }}>
                            <Text> Hesabın yok mu ?</Text>
                            <Button transparent block onPress={() => props.navigation.navigate('SignUp')} >
                                <Text style={{ textDecorationLine: 'underline' }}>Kayıt Ol</Text>
                            </Button>
                        </View>
                    </View>


                </View>

            </Content>
        </Container>
    );
}

//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default Login;
