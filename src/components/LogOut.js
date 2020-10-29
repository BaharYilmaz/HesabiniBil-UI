import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text,Left,Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Modal from 'react-native-modal';
import { AppContext } from '../provider/AppProvider'



const MessageModal = (props) => {

    const modal = useContext(AppContext);

    const toggleModal = () => {
        modal.setModalVisible(!modal.isModalVisible);
    };
    return (

        <Modal
            isVisible={true}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBody}>
                            <Text style={styles.bodyText}>Hesabınızı silmek üzeresiniz !</Text>

                            <View style={{ flexDirection: "row", marginVertical: 20, alignItems: 'center' }}>

                                <Left>
                                    <Button block  style={{ margin: 10}} >
                                        <Text >Devam</Text>
                                    </Button>
                                </Left>

                                <Right>
                                    <Button block  style={{ margin: 10 ,backgroundColor:'indianred' }}>
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
export default MessageModal;