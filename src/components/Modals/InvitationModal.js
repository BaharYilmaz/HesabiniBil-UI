import React, { useContext } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form'

import Clipboard from '@react-native-community/clipboard';
import { Button, Text, Item } from 'native-base';
import Modal from 'react-native-modal';
import { AppContext } from '../../provider/AppProvider'
import Toast from 'react-native-simple-toast';


const InvitationModal = () => {

    const state = useContext(AppContext);
    const { control, handleSubmit, errors } = useForm();

    const toggleModal = () => {
        state.setModalInvitation({ modalVisible: false, modalMessage: '' });
    };

    const copyToClipboard = (kod) => {
        Clipboard.setString(kod);
        Toast.showWithGravity('Davet kodu panoya kopyalandı.', Toast.LONG, Toast.TOP);
    };

    
    return (
        <Modal
            isVisible={state.modalInvitation.modalVisible}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBody}>
                            <Text style={styles.bodyText}>GRUP DAVET KODU:</Text>

                            <TouchableOpacity onPress={() => copyToClipboard(state.modalInvitation.modalMessage)}>
                                <Text style={styles.textDetail}>{state.modalInvitation.modalMessage}</Text>
                            </TouchableOpacity>

                            <View style={{ marginTop: 15, padding: 10 }}>
                                <Button block onPress={toggleModal} style={{backgroundColor: 'darkseagreen'}} >
                                    <Text>Tamam</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',                   
        justifyContent: 'center',
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderRadius: 5,
    },
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