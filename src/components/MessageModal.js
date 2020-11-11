import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import Modal from 'react-native-modal';
import { AppContext } from '../provider/AppProvider'



const MessageModal = () => {

    const state = useContext(AppContext);

    const toggleModal = () => {
        state.setModal({modalVisible:false,modalMessage:''});
    };
    return (
        <Modal
            isVisible={state.modal.modalVisible}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBody}>
                            <Text style={styles.bodyText}>{state.modal.modalMessage}</Text>

                            <View style={{ marginTop: 10, padding: 30 }}>
                                <Button block onPress={toggleModal} >
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

});
export default MessageModal;