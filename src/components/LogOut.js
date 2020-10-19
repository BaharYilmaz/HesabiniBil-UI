import React, { Component } from "react";
import { Modal, Text, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
import {Grid,Row} from 'native-base';




class LogOut extends Component {


    constructor(props) {
        super(props);
        this.state = {
        }
    }
    logOut = () => {
        console.log("çıkış yap")
    }
    cancel = () => {
        console.log("iptal")

    }
    render() {
        return (
            <View style={styles.container}>

                <Modal
                    transparent={false}
                    visible={true}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
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
                                            onPress={this.cancel}>
                                            <Text style={styles.actionText}>İptal</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ ...styles.actions, backgroundColor: "#21ba45" }} onPress={this.deleteAccount}>
                                            <Text style={styles.actionText}>Devam</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>


            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        backgroundColor: "#00000099",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    modalContainer: {
        backgroundColor: "#f9fafb",
        width: "80%",
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
        paddingHorizontal:30,
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

export default LogOut;