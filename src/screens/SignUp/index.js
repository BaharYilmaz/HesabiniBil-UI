import React, { useContext } from 'react';
import { AppContext } from '../../provider/AppProvider'

import {
    Dimensions,
    View,
} from 'react-native';



import { Container, Header, Content, Button, Form, Item, Input, Title, H2, Left, Text, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


//this.props.navigation.goBack();
const SignUp = (props) => {
    const register = useContext(AppContext);

    const emailChange = (val) => {
        register.setRegisterData({ ...register.registerData, email: val });
    }
    const passwordChange = (val) => {
        register.setRegisterData({ ...register.registerData, password: val });
    }
    const firstNameChange = (val) => {
        register.setRegisterData({ ...register.registerData, firstName: val });
    }
    const lastNameChange = (val) => {
        register.setRegisterData({ ...register.registerData, lastName: val });
    }
    const handleSubmit = () => {

        // if (userForm.valid) { 
        // } else {
        // }
        register.handleRegister();
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
            </Header>
            <Content >
                <View style={{ flex: 1, height: screenHeight, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <H2 style={{ color: 'gray', marginBottom: 50 }}>Aramıza Katıl  :) </H2>
                    </View>
                    <Form style={{ margin: 20 }}>
                        <Item style={{ margin: 20, padding: 5 }}>
                            <Input placeholder="İsim"  onChangeText={(val) => firstNameChange(val)} />
                        </Item>
                        <Item style={{ margin: 20, padding: 5 }}>
                            <Input placeholder="Soyisim"  onChangeText={(val) => lastNameChange(val)} />
                        </Item>
                        <Item style={{ margin: 20, padding: 5 }}>
                            <Input placeholder="E-posta"  onChangeText={(val) => emailChange(val)} />
                        </Item>
                        <Item style={{ margin: 20, padding: 5 }}>
                            <Input placeholder="Şifre"  onChangeText={(val) => passwordChange(val)} />
                        </Item>
                        <Button block rounded style={{ margin: 15, padding: 5 }} onPress={handleSubmit}  ><Text> Kayıt ol </Text></Button>
                    </Form>
                </View>
            </Content>
        </Container>
    );
}


//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default SignUp;
