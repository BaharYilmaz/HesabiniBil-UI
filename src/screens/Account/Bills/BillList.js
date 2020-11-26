import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, View, ScrollView, TouchableOpacity } from 'react-native';

import { AppContext } from '../../../provider/AppProvider'


const BillList = () => {
    return (
            <Container>
                <Text>list</Text>
            </Container>
    );
};

export default BillList;