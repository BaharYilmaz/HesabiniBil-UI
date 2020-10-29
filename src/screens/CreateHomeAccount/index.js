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
import AppFooter from '../../components/Footer'


const CreateHomeAccount = (props) => {

    const login = useContext(AppContext);
    const { height: screenHeight } = Dimensions.get('window');
  
    return (

        <Container >
            <Header />
            <Content >
                <View style={{ flex: 1, height: screenHeight, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <H2 style={{ color: 'gray', marginBottom: 50 }}>HESABINI BİL</H2>
                    </View>

                   
               </View>

            </Content>
            <AppFooter {...props} />
        </Container>
    );
}

//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>

export default CreateHomeAccount;
