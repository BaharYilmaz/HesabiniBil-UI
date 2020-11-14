
import React, { useContext, useState } from "react";
import { View, StyleSheet } from 'react-native';
import { Button, Text, Left, Right } from 'native-base';

import Modal from 'react-native-modal';
import { AppContext } from '../../../provider/AppProvider'

const IbanDeleteModal = (props) => {

    const state = useContext(AppContext);

    const deleteIban = () => {
        console.log("delete")
        state.setModalDeleteIban({ modalVisible: false });

    }
    const toggleModal = () => {
        state.setModalDeleteIban({ modalVisible: false });
    };

    return (

        <Modal
            isVisible={state.modalDeleteIban.modalVisible}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBody}>
                            <Text style={styles.bodyText}>Iban numarasını silmek üzeresiniz !</Text>

                            <View style={{ flexDirection: "row", marginVertical: 20, alignItems: 'center' }}>

                                <Left>
                                    <Button block style={{ margin: 10,backgroundColor: 'steelblue' }} onPress={deleteIban} >
                                        <Text >Devam</Text>
                                    </Button>
                                </Left>

                                <Right>
                                    <Button block style={{ margin: 10, backgroundColor: 'indianred' }} onPress={toggleModal}>
                                        <Text >İptal</Text>
                                    </Button>
                                </Right>

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

});
export default IbanDeleteModal;