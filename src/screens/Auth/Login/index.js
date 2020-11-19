import React, { useContext } from 'react';
import { AppContext } from '../../../provider/AppProvider'
import { useForm, Controller } from 'react-hook-form'

import { Dimensions, View, TextInput,TouchableOpacity } from 'react-native';


import { Container, Header, Content, Button, Form, Item, Input, Title, H2, H3, Text, Body, Badge, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


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

        <Container style={{ flex: 1, height: screenHeight, justifyContent: 'center' }} >
            <Header />
            <Content style={{ margin: hp('5%') }}>
                <View >
                    <View style={{ alignItems: 'center' }}>
                        <H2 style={{ color: 'gray', margin: hp('5%') }}>HESABINI BİL</H2>
                    </View>
                    <View >
                        <Item style={{ padding: hp('1%') ,marginTop:hp('3%')}}>
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
                                            <Icon name='email-outline' size={hp('5%')} color="gray" />
                                        </Right>
                                    </View>
                                )}
                            />
                        </Item>
                        {errors.email && <Text style={{ color: 'red', marginLeft: 10 }}>Lütfen uygun bir mail adresi giriniz !</Text>}

                        <Item style={{ padding: hp('1%') ,marginTop:hp('3%') }}>
                            <Controller
                                control={control} name="password" defaultValue="" rules={{ required: true }}
                                render={({ onChange, onBlur, value }) => (
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput onChangeText={value => onChange(value)} value={value} placeholder='Şifre' secureTextEntry={true} style={{ fontSize: 20 }} />
                                        <Right>
                                            <Icon name='lock-outline' size={hp('5%')} color="gray" />
                                        </Right>
                                    </View>
                                )}
                            />
                        </Item>
                        {errors.password && <Text style={{ color: 'red', marginLeft: 10 }}>Lütfen şifrenizi giriniz !</Text>}

                        <Button block rounded style={{ marginTop: hp('5%')}} onPress={handleSubmit(onSubmit)} ><Text>Giriş Yap</Text></Button>
                        <TouchableOpacity style={{ alignItems: 'center', marginTop: hp('2%') }}  onPress={() => props.navigation.navigate('SignUp')} >
                            <Text style={{ textDecorationLine: 'underline', color: 'green' }}>Şifremi Unuttum</Text>
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center' ,marginTop: hp('2%') }}>
                            <Text> Hesabın yok mu ?</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')} >
                                <Text style={{ textDecorationLine: 'underline' , color: 'slateblue'}}>Kayıt Ol</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>

            </Content>
        </Container>
    );
}

//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default Login;
