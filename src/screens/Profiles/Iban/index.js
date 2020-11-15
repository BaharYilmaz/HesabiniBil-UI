import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Content, Button, Form, Item, Input, Title, Picker, Left, Right, TabHeading, Body, List, ListItem, Badge, Tabs, Tab, Footer, FooterTab, Text, H1, H2, H3, H4 } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, ScrollView, FlatList, View, SafeAreaView, StyleSheet, Clipboard } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { AppContext } from '../../../provider/AppProvider'

import AddIban from '../../../components/Modals/IbanModal/IbanAddModal'
import EditIban from '../../../components/Modals/IbanModal/IbanUpdateModal'
import DeleteIban from '../../../components/Modals/IbanModal/IbanDeleteModal'

import { TouchableOpacity } from 'react-native-gesture-handler';


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

        <View style={{ margin: 40, padding: 20, alignItems: 'center', borderColor: 'lightgray', borderWidth: 2, borderRadius: 5 }}>

            {state.iban == '' ?

                <View style={{ flexDirection: 'row' }} >
                    <Left>
                        <H3 style={{ color: 'gray', marginVertical: 10 }}>Iban Numarası</H3>
                    </Left>

                    <TouchableOpacity onPress={() => state.setModalAddIban({ modalVisible: true })} style={{ marginTop: 5 }}><Text>
                        <Icon name='plus-circle' size={35} color="steelblue" />
                    </Text>
                    </TouchableOpacity>
                    <AddIban />

                </View>
                :
                <View style={{ flexDirection: "row" }}>
                    <Left>
                        <H3 style={{ color: 'gray', marginVertical: 10 }}>Iban Numarası</H3>
                        <View style={{ backgroundColor: 'steelblue', padding: 10, borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontWeight: "bold" }}>TR {state.iban[0].ibanNo}</Text>
                        </View>
                    </Left>
                    <TouchableOpacity onPress={() => state.setModalUpdateIban({ modalVisible: true, ibanNo:  state.iban[0].ibanNo ,ibanId:state.iban[0].ibanID})} style={{ marginTop: 45 }} ><Text>
                        <Icon name='file-document-edit' size={35} color="steelblue" />
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => state.setModalDeleteIban({ modalVisible: true, ibanId:state.iban[0].ibanID })} style={{ marginTop: 45 }}><Text>
                        <Icon name='delete' size={35} color="steelblue" />
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
        marginHorizontal: 40,
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