import React, { useContext, useState } from 'react';
import { AppContext } from '../../../provider/AppProvider'
import { useForm, Controller } from 'react-hook-form'

import { Dimensions, View, Alert, TextInput, StyleSheet } from 'react-native';
import { Container, Header, Content, Button, Form, Item, Input, Title, H2, Left, Text, Body, Right } from 'native-base';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


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

        <Container style={{ height: screenHeight }}>
            <Header>
                <Left>
                    <Button transparent onPress={() => props.navigation.navigate('Login')}>
                        <Icon name='angle-left' type='font-awesome' size={hp('5%')} color="white" />
                    </Button>
                </Left>
                <Body>
                    <Title>Kayıt Ekranı</Title>
                </Body>
            </Header>
            <Content>
                <View style={{ flex: 1,justifyContent: 'center',height: screenHeight*0.9,marginBottom: wp('10%')}}>
                    <View style={{ marginVertical: hp('3%'), marginHorizontal: hp('5%') }}>
                        <Item style={styles.item}>
                            <Controller
                                control={control} name="firstName" rules={{ required: true }} defaultValue=""
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput onChangeText={value => onChange(value)} value={value} placeholder='İsim' style={ styles.text} />
                                )}
                            />
                        </Item >
                        {errors.firstName && <Text style={styles.errorText}>Lütfen adınızı giriniz !</Text>}

                        <Item style={styles.item}>
                            <Controller
                                control={control} name="lastName" defaultValue="" rules={{ required: true }}
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput onChangeText={value => onChange(value)} value={value} placeholder='Soyisim' style={ styles.text} />
                                )}
                            />
                        </Item>
                        {errors.lastName && <Text style={styles.errorText}>Lütfen soyadınızı giriniz !</Text>}

                        <Item style={styles.item}>
                            <Controller
                                control={control} name="email" defaultValue="" rules={{
                                    required: true, pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                                    }
                                }}
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput onChangeText={value => onChange(value)} value={value} placeholder='E-posta' style={ styles.text} />
                                )}
                            />
                        </Item>
                        {errors.email && <Text style={styles.errorText}>Lütfen uygun bir mail adresi giriniz !</Text>}

                        <Item style={styles.item}>
                            <Controller
                                control={control} name="password" defaultValue="" rules={{ required: true }}
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput onChangeText={value => onChange(value)} value={value} placeholder='Şifre' secureTextEntry={true}style={ styles.text} />
                                )}
                            />
                        </Item>
                        {errors.password && <Text style={styles.errorText}>Lütfen şifrenizi giriniz !</Text>}
                        <Item style={styles.item}>
                            <Controller
                                control={control} name="passwordAgain" defaultValue="" rules={{ required: true }}
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput onChangeText={value => onChange(value)} value={value} placeholder='Şifre(Tekrar)' secureTextEntry={true} style={ styles.text} />
                                )}
                            />
                        </Item>
                        {errors.passwordAgain && <Text style={styles.errorText}>Lütfen şifrenizi tekrar giriniz !</Text>}

                        {password ? null : <Text style={styles.errorText}>Şifre eşleşmedi !</Text>}
                        <Button block rounded style={{ marginTop: hp('3%')}} onPress={handleSubmit(onSubmit)} ><Text>Kayıt Ol</Text></Button>
                    </View>
                </View>
            </Content>
        </Container>
    );
}


export default SignUp;

const styles = StyleSheet.create({

    item: {
        marginTop: hp('5%')
    },
    text: {
        fontSize: 20
    },
    errorText:{
        color: 'red', marginLeft: 10 
    }
})