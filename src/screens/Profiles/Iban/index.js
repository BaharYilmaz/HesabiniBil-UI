import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import { Icon } from 'react-native-elements';
import { Dimensions, ScrollView, FlatList, View, SafeAreaView, StyleSheet, Clipboard,TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { AppContext } from '../../../provider/AppProvider'

import AddIban from './IbanModal/IbanAddModal'
import EditIban from './IbanModal/IbanUpdateModal'
import DeleteIban from './IbanModal/IbanDeleteModal'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Iban = (props) => {

    const state = useContext(AppContext);
    const [screen, chageScreen] = useState(1)
    const [ibanMenu, changeIbanMenu] = useState(0)


    useEffect(() => {
        state.getIban()
    }, [state.iban]);
    const toggleScreen = (value) => {

        chageScreen(value)
    }
    const toggleMenu = () => {
    }
    return (

        <View style={{ margin: wp('2%'), padding: wp('2%'), alignItems: 'center', borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}>

            {state.iban == '' ?

                <View style={{ flexDirection: 'row' }} >
                    <Left>
                        <H3 style={{ color: 'gray', marginVertical: hp('2%') }}>Iban Numarası</H3>
                    </Left>

                    <TouchableOpacity onPress={() => state.setModalAddIban({ modalVisible: true })} style={{ marginTop: hp('2%')  }}><Text>
                        <Icon name='plus-circle' type='font-awesome' size={wp('5%')} color="steelblue" />
                    </Text>
                    </TouchableOpacity>
                    <AddIban />

                </View>
                :
                <View style={{ flexDirection: "row" }}>
                    <Left >
                        <H3 style={{ color: 'gray', marginVertical:  hp('1%') }}>Iban Numarası</H3>
                        <View style={{ backgroundColor: 'steelblue', padding: hp('1%'), borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontWeight: "bold" }}>TR {state.iban[0].ibanNo}</Text>
                        </View>
                    </Left>
                    <TouchableOpacity onPress={() => state.setModalUpdateIban({ modalVisible: true, ibanNo:  state.iban[0].ibanNo ,ibanId:state.iban[0].ibanID})} style={{ marginTop: hp('6%'), marginRight: wp('3%')  }} ><Text>
                        <Icon name='pencil-square' type='font-awesome'size={wp('7%')} color="steelblue" />
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => state.setModalDeleteIban({ modalVisible: true, ibanId:state.iban[0].ibanID })} style={{ marginTop:  hp('6%') }}><Text>
                        <Icon name='trash'type='font-awesome' size={wp('7%')} color="steelblue" />
                    </Text>
                    </TouchableOpacity>
                    <EditIban />
                    <DeleteIban />

                </View>
            }
            <AddIban />
        </View>



    );
};
const styles = StyleSheet.create({
    active: {
        backgroundColor: 'darkorange',
    },
    passive: {
        backgroundColor: 'lightgray',
    },
    divider: {
        height: 3,
        backgroundColor: 'darkorange',
        marginHorizontal: 0,
    },
    menu: {
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'darkseagreen',
        borderRadius: 3,
        color: 'white'
    }

});

export default Iban;