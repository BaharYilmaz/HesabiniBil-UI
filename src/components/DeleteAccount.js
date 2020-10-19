import React, { Component, useState } from "react";
import { AppContext } from '../provider/AppProvider'

import { Modal, Text, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';




function DeleteAccount(props) {


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //     }
    // }
    function deleteAccount() {
        // login.changeLoginState(null)
    }
    function cancel() {
        props.navigation.navigate('Ana Sayfa');

    }

    return (
        <AppContext.Consumer>
            {
                login =>
                    <View style={styles.container}>


                        <View style={styles.modal}>
                            <View>
                                <View style={styles.modalContainer}>
                                    {/* <View style={styles.modalHeader}>
                                    <Text style={styles.title}>Hesabı Sil</Text>
                                    <View style={styles.divider}></View>
                                </View> */}
                                    <View style={styles.modalBody}>
                                        <Text style={styles.bodyText}>Hesabınızı Silmek Üzeresiniz !</Text>
                                    </View>
                                    <View >
                                        <View style={styles.divider}></View>
                                        <View style={{ flexDirection: "row-reverse", margin: 10 }}>
                                            <TouchableOpacity style={{ ...styles.actions, backgroundColor: "#db2828" }}
                                                onPress={cancel}>
                                                <Text style={styles.actionText}>İptal</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ ...styles.actions, backgroundColor: "#21ba45" }} onPress={() => login.changeLoginState(null)}>
                                                <Text style={styles.actionText}>Devam</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>



                    </View>
            }
        </AppContext.Consumer>
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