import React, { useContext,useState,useEffect } from 'react';
import { AppContext } from '../../../provider/AppProvider'

import {
    Dimensions,
    View,StyleSheet,SafeAreaView
} from 'react-native';


import { Container, Header, Content, Button, Form, Footer,FooterTab,Item, Input, Title, Left, Right, Body, List, ListItem, Thumbnail, Separator, Text, H1, H2, H3, H4 } from 'native-base';
import { Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AppFooter from '../../../components/Footer'
import Creditor from '../Creditor'
import Debtor from '../Debtor'
import AppHeader from '../../../components/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const DebtTracking = (props) => {

    const state = useContext(AppContext);
    const { height: screenHeight } = Dimensions.get('window');
    const [screen, chageScreen] = useState(1)

    useEffect(() => {
        state.getAllDebt()
    }, []);


    const [loginForm, setValid] = React.useState({ emailValid: true, passwordValid: true });
    const toggleScreen = (value) => {
        chageScreen(value)
    }


    return (

        <Container  >
      <AppHeader screenName={'CommonAccounts'} />

            <Footer style={{ marginHorizontal: wp('3%'),marginTop:wp('3%'), backgroundColor: 'transparent' }} >
                <FooterTab style={{ backgroundColor: 'transparent' }} >
                    <Left>
                        <Button block onPress={() => toggleScreen(1)} style={screen == 1 ? styles.creditor:styles.passive}>
                            <Text>Alacaklarım</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button block onPress={() => toggleScreen(0)} style={screen == 0 ? styles.debtor:styles.passive}>
                            <Text >Borçlarım</Text>
                        </Button>
                    </Right>
                </FooterTab>
            </Footer>
            <View style={screen == 0 ? styles.dividerDebtor:styles.dividerCreditor}/>

            <Content style={{ marginHorizontal: 10 }}>

                <SafeAreaView  >
                    {
                        screen === 1 ? <Creditor /> : <Debtor />
                    }
                </SafeAreaView >

            </Content>
            <AppFooter {...props} />

        </Container>
    );
}
//                                <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>
const styles = StyleSheet.create({
    creditor: {
        backgroundColor: 'limegreen',
    },
    debtor: {
        backgroundColor: 'lightsalmon',
    },
    passive: {
        backgroundColor: 'lightgray',
    },
    dividerCreditor:{
        height:4,
        backgroundColor:'limegreen',
        marginHorizontal:wp('3%'),
    },
    dividerDebtor:{
        height:4,
        backgroundColor:'lightsalmon',
        marginHorizontal: wp('3%')    }
});
export default DebtTracking;
