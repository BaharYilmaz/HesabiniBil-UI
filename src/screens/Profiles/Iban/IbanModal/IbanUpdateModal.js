import React, { useContext } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form'

import Clipboard from '@react-native-community/clipboard';
import { Button, Text, Item, Left, Right } from 'native-base';
import Modal from 'react-native-modal';
import { AppContext } from '../../../../provider/AppProvider'
import Toast from 'react-native-simple-toast';
import { Overlay } from 'react-native-elements';


const IbanUpdateModal = () => {

    const state = useContext(AppContext);
    const { control, handleSubmit, errors } = useForm();

    const toggleModal = () => {
        state.setModalUpdateIban({ modalVisible: false });
    };
    const onSubmit = (data) => {
        toggleModal()
        let model = {
            ibanNo: data.value,
            ibanId: state.modalUpdateIban.ibanId
        }
        state.updateIban(model)
    }
    return (
        <Overlay
            isVisible={state.modalUpdateIban.modalVisible} onBackdropPress={toggleModal}
        >
            
                        <View style={styles.modalBody}>
                            <View>
                                <Text style={styles.bodyText}>Iban numarasını güncelle</Text>
                                <Item style={{ margin: 15 }} >
                                    <Text style={{ marginTop: 7, fontSize: 19 }}>TR</Text>
                                    <Controller
                                    
                                        control={control} name="value" defaultValue={state.modalUpdateIban.ibanNo} rules={{ required: true,minLength:24,maxLength:24,  pattern:{value:/^\d+$/ }}}
                                        render={({ onChange, value }) => (
                                            <View style={{ flexDirection: 'row' }}>
                                                <TextInput style={styles.textDetail} onChangeText={value => onChange(value)} value={value} />
                                            </View>
                                        )}
                                    />
                                </Item>
                                {errors.value && <Text style={{ color: 'red', marginLeft: 5 }}>Iban numarasını doğru ve eksiksiz giriniz !</Text>}

                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Button block onPress={handleSubmit(onSubmit)} style={{ backgroundColor: 'steelblue' }} >
                                    <Text>Güncelle</Text>
                                </Button>

                                <Button transparent block onPress={toggleModal} >
                                    <Text style={{ textDecorationLine: 'underline', color: 'steelblue' }}>İptal</Text>
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
        textAlign: 'center',
        color: 'dimgray',
        fontSize: 20
    },
    textDetail: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 10,
        fontSize: 20,
    }
});
export default IbanUpdateModal;