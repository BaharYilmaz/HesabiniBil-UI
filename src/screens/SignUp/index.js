import React, { Component } from 'react';
import {
    Alert,
    LayoutAnimation,
    TouchableOpacity,
    Dimensions,
    Image,
    UIManager,
    KeyboardAvoidingView,
    StyleSheet,
    ScrollView,
    Linking,
    View,
} from 'react-native';



import { Container, Header, Content, Button, Form, Item, Input, Title, H2, Left, Text, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


//this.props.navigation.goBack();
class SignUp extends Component {
    constructor(props) {
        super(props); // super arguman geçmenizi sağlar eğer constructor kullanmak isterseniz kullanmak zorunlu oluyor.
        this.navigation = this.props.navigation; // index.ios.js de navigator diğer geçtiğimizi burada aldık
    }
    render() {
        const { height: screenHeight } = Dimensions.get('window');
        return (

            <Container >
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.navigation.navigate('Login')}>
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
                                <Input placeholder="İsim" />
                            </Item>
                            <Item style={{ margin: 20, padding: 5 }}>
                                <Input placeholder="Soyisim" />
                            </Item>
                            <Item style={{ margin: 20, padding: 5 }}>
                                <Input placeholder="E-posta" />
                            </Item>
                            <Item style={{ margin: 20, padding: 5 }}>
                                <Input placeholder="Kullanıcı Adı" />
                            </Item>
                            <Item style={{ margin: 20, padding: 5 }}>
                                <Input placeholder="Şifre" />
                            </Item>
                            <Button block rounded style={{ margin: 15, padding: 5 }} ><Text> Kayıt ol </Text></Button>
                        </Form>
                    </View>
                </Content>
            </Container>
        );
    }

}
//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default SignUp;
