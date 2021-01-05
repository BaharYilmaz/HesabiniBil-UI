
import React, { useContext, useState } from "react";
import { View, StyleSheet } from 'react-native';
import { Button, Text, Left, Right } from 'native-base';

import Modal from 'react-native-modal';
import { AppContext } from '../../../../provider/AppProvider'
import { Overlay } from 'react-native-elements';

const IbanDeleteModal = (props) => {

    const state = useContext(AppContext);

    const deleteIban = () => {
       // console.log("delete")
        state.setModalDeleteIban({ modalVisible: false });
        state.deleteIban(state.modalDeleteIban.ibanId)

    }
    const toggleModal = () => {
        state.setModalDeleteIban({ modalVisible: false });
    };

    return (

        <Overlay
            isVisible={state.modalDeleteIban.modalVisible} onBackdropPress={toggleModal}
        >
            
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
        </Overlay>
    );
};
const styles = StyleSheet.create({
  
    modalBody: {
        backgroundColor: "#fff",
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 5
    },

});
export default IbanDeleteModal;