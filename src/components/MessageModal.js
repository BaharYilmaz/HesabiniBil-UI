import React, { useContext } from 'react';
import { View, StyleSheet, TextInput ,TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { Button, Text } from 'native-base';
import Modal from 'react-native-modal';
import { AppContext } from '../provider/AppProvider'
import Toast from 'react-native-simple-toast';


const MessageModal = () => {

    const state = useContext(AppContext);

    const toggleModal = () => {
        state.setModal({ modalVisible: false, modalMessage: '' });
    };
    const copyToClipboard = (kod) => {
        Clipboard.setString(kod);
        Toast.showWithGravity('Davet kodu panoya kopyalandı.', Toast.LONG, Toast.TOP);
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
                            <TouchableOpacity onPress={() => copyToClipboard(state.modal.modalMessageDetail)}>
                            <Text  style={styles.textDetail}>{state.modal.modalMessageDetail}</Text>
                            </TouchableOpacity>
                            <View style={{ marginTop: 10, padding: 10 }}>
                                <Button block onPress={toggleModal} >
                                    <Text>Tamam</Text>
                                </Button>
                            </View>
                            <Text></Text>
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
        marginTop: 10,
        fontSize: 20,

    }

});
export default MessageModal;