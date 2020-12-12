import React, { useContext } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form'

import Clipboard from '@react-native-community/clipboard';
import { Button, Text, Item } from 'native-base';
import Modal from 'react-native-modal';
import { AppContext } from '../../../../provider/AppProvider'
import Toast from 'react-native-simple-toast';
import { RNToasty } from 'react-native-toasty'

import { Overlay } from 'react-native-elements';
import { duration } from 'moment';

const InvitationModal = (props) => {

    const state = useContext(AppContext);
    const { control, handleSubmit, errors } = useForm();

    const toggleModal = () => {
        state.setModalInvitation({ modalVisible: false, modalMessage: '' });
    };

    const copyToClipboard = (kod) => {
        Clipboard.setString(kod);
        RNToasty.Info({ title: 'Davet kodu panoya kopyalandı.', duration: 1, position: 'top' });
    };
    //onbackdrop press
    console.log(props)
    return (
        <View>
            {/* <Button title="Open Overlay"  />
  
        <Overlay isVisible={state.modalInvitation.modalVisible} >
          <Text>Hello from Overlay!</Text>
        </Overlay> */}

            <Overlay isVisible={state.modalInvitation.modalVisible} onBackdropPress={toggleModal} >

                <View style={styles.modalBody}>
                    <Text style={styles.bodyText}>GRUP DAVET KODU:</Text>
                    <Text selectable style={styles.textDetail}>{state.modalInvitation.modalMessage}</Text>
                    {/* 
                    <TouchableOpacity onPress={() => copyToClipboard(state.modalInvitation.modalMessage)}>
                    </TouchableOpacity> */}

                    <View style={{ marginTop: 15, padding: 10 }}>
                        <Button block onPress={toggleModal} style={{ backgroundColor: 'darkseagreen' }} >
                            <Text>Tamam</Text>
                        </Button>
                    </View>

                </View>
            </Overlay>
        </View>
    );
};
const styles = StyleSheet.create({

    modalBody: {
        backgroundColor: "#fff",
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    bodyText: {
        textAlign: 'center'
    },
    textDetail: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 20,
        fontSize: 20,
    }
});
export default InvitationModal;