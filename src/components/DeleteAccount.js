import React, { useContext, useState } from "react";
import { AppContext } from '../provider/AppProvider'

import { Modal, Text, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';

const DeleteAccount = (props) => {

    const user = useContext(AppContext);

    return (

        <View style={styles.container}>
            <View style={styles.modal}>
                <View>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBody}>
                            <Text style={styles.bodyText}>Hesabınızı Silmek Üzeresiniz !</Text>
                        </View>
                        <View >
                            <View style={styles.divider}></View>
                            <View style={{ flexDirection: "row-reverse", margin: 10 }}>
                                <TouchableOpacity style={{ ...styles.actions, backgroundColor: "#db2828" }}
                                    onPress={() => props.navigation.navigate('Ana Sayfa')}>
                                    <Text style={styles.actionText}>İptal</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ ...styles.actions, backgroundColor: "#21ba45" }} onPress={() => user.changeLoginState(0)}>
                                    <Text style={styles.actionText}>Devam</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

}

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
        backgroundColor: "#f9fafb",
        // borderWidth:5,
        // borderColor:'#635DB7',
        borderRadius: 5,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "lightgray"
    },
    modalBody: {
        backgroundColor: "#fff",
        paddingVertical: 40,
        paddingHorizontal: 30,
        borderRadius: 5
    },
    actions: {
        borderRadius: 5,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    actionText: {
        color: "#fff"
    }
});

export default DeleteAccount;