import React, { useContext } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form'

import Clipboard from '@react-native-community/clipboard';
import { Button, Text, Item, Left, Right } from 'native-base';
import Modal from 'react-native-modal';
import { AppContext } from '../../../../provider/AppProvider'
import Toast from 'react-native-simple-toast';
import { Overlay } from 'react-native-elements';


const JoinAccount = () => {

    const state = useContext(AppContext);
    const { control, handleSubmit, errors } = useForm();

    const toggleModal = () => {
        state.setModalJoin({ modalVisible: false });
    };

    const onSubmit = (data) => {
        toggleModal()
        console.log(data)
    }

    return (
        <Overlay
            isVisible={state.modalJoin.modalVisible} onBackdropPress={toggleModal}
        >

            <View style={styles.modalBody}>
                <View>
                    <Item style={{ marginBottom: 15 }}>
                        <Controller
                            control={control} name="value" defaultValue="" rules={{ required: true }}
                            render={({ onChange, value }) => (
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput style={styles.textDetail} onChangeText={value => onChange(value)} value={value} placeholder='Davet kodu giriniz' />
                                </View>
                            )}
                        />
                    </Item>
                    {errors.value && <Text style={{ color: 'red', marginLeft: 5 }}>Bu alan boş bırakılamaz !</Text>}

                </View>


                <View style={{ marginTop: 10 }}>
                    <Button block onPress={handleSubmit(onSubmit)} style={{ backgroundColor: 'palevioletred' }} >
                        <Text>Gruba Katıl</Text>
                    </Button>

                    <Button transparent block onPress={toggleModal} >
                        <Text style={{ textDecorationLine: 'underline', color: 'palevioletred' }}>İptal</Text>
                    </Button>

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
export default JoinAccount;