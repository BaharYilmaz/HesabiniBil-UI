import React, { useContext } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form'

import Clipboard from '@react-native-community/clipboard';
import { Button, Text, Item, Left, Right } from 'native-base';
import Modal from 'react-native-modal';
import { AppContext } from '../../provider/AppProvider'
import Toast from 'react-native-simple-toast';


const EditAccountModal = () => {

    const state = useContext(AppContext);
    const { control, handleSubmit, errors } = useForm();

    const toggleModal = () => {
        state.setModalEditAccount({ modalVisible: false });
    };

    const onSubmit = (data) => {
        toggleModal()
        console.log(data)
    }
    const data = state.modalEditAccount.modalValue
    return (
        <Modal
            isVisible={state.modalEditAccount.modalVisible}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBody}>
                            <View>
                            <Text style={styles.bodyText}>Hesap adını değiştir</Text>

                                <Item style={{ marginBottom: 15 }}>
                                    <Controller
                                        control={control} name="value" defaultValue={data} rules={{ required: true }}
                                        render={({ onChange, value }) => (
                                            <View style={{ flexDirection: 'row' }}>
                                                <TextInput style={styles.textDetail} onChangeText={value => onChange(value)} value={value} />
                                            </View>
                                        )}
                                    />
                                </Item>
                                {errors.value && <Text style={{ color: 'red', marginLeft: 5 }}>Bu alan boş bırakılamaz !</Text>}

                            </View>


                            <View style={{ marginTop: 10 }}>
                                <Button block onPress={handleSubmit(onSubmit)} style={{ backgroundColor: 'darkseagreen' }} >
                                    <Text>Kaydet</Text>
                                </Button>

                                <Button transparent block onPress={toggleModal} >
                                    <Text style={{ textDecorationLine: 'underline', color: 'darkseagreen' }}>İptal</Text>
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
        textAlign: 'center',
        fontSize: 20,
        marginBottom:10
        

    },
    textDetail: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 10,
        fontSize: 20,
    }
});
export default EditAccountModal;