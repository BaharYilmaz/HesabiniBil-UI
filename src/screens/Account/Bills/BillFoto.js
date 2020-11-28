import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, View, ScrollView, TouchableOpacity,ImageBackground} from 'react-native';

import { AppContext } from '../../../provider/AppProvider'

const BillFoto = (props) => {

    const state = useContext(AppContext);
    const bill = props.route.params.list;
    const { height: screenHeight } = Dimensions.get('window');
    const screenWidth = Math.round(Dimensions.get('window').width);
    console.log(bill.alisverisFoto)


    return (
        <Container style={{flex:1,alignItems:'center'}}>
       

            <ImageBackground
                source={{ uri: bill.alisverisFoto }} imageStyle={{ resizeMode: 'contain' }}
                style={{marginTop:-200, width:550,height:'100%',transform: [{ rotate: '90deg' }] }} />
          
        </Container>
    );
};

export default BillFoto;