import React, { Component } from 'react';

import { StyleSheet } from 'react-native'
import { Container, Content, Button, Form, Right, Left, Title, Footer, FooterTab, Text, Tab, Tabs, Body } from 'native-base';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-elements'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AppFooter = (props) => {

    return (
        <Footer >
            <FooterTab style={styles.container} >
                <Button onPress={() => props.navigation.navigate('CommonAccounts')}>
                    <Text style={styles.text}>Gruplar</Text>
                </Button>
                <Button vertical onPress={() => props.navigation.navigate('Profile')} >
                    <Icon name='person' type='metarial' color='white' />
                </Button>
                <Button onPress={() => props.navigation.navigate('DebtTracking')} >
                    <Text style={styles.text}>Borç Takibi</Text>
                </Button>
            </FooterTab>
        </Footer>

    );
}

export default AppFooter;

const styles = StyleSheet.create({
    text: {
        fontSize: wp('3%')
    },
    container: {
        marginHorizontal: hp('1%')
    }

})