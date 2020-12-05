import React, { useContext } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form'

import { Button, Text, Item, Left, Right } from 'native-base';
import { AppContext } from '../../../../provider/AppProvider'
import { Overlay } from 'react-native-elements';

const EditAccountModal = (props) => {

    const state = useContext(AppContext);
    const { control, handleSubmit, errors } = useForm();
    const hesap = state.modalEditAccount.hesap

    const toggleModal = () => {
        state.setModalEditAccount({ modalVisible: false });
    };
    const onSubmit = (data) => {

        let model = {
            hesapAd: data.value,
            ortakHesapID: hesap.ortakHesapID,
            hesapTurID: hesap.hesapTurID,
            hesapAktifDurum: hesap.hesapAktifDurum
        }
        state.updateAccount(model)
        toggleModal()

    }
    return (
        <Overlay isVisible={state.modalEditAccount.modalVisible} onBackdropPress={toggleModal} >


            <View style={styles.modalBody}>
                {hesap ?
                    <View>
                        <Text style={styles.bodyText}>Hesap adını değiştir</Text>
                        <Item style={{ marginBottom: 15 }}>
                            <Controller
                                control={control} name="value" defaultValue={hesap.hesapAd} rules={{ required: true }}
                                render={({ onChange, value }) => (
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput style={styles.textDetail} onChangeText={value => onChange(value)} value={value} />
                                    </View>
                                )}
                            />
                        </Item>
                        {errors.value && <Text style={{ color: 'red', marginLeft: 5 }}>Bu alan boş bırakılamaz !</Text>}
                    </View>
                    : null
                }

                <View style={{ marginTop: 10 }}>
                    <Button block onPress={handleSubmit(onSubmit)} style={{ backgroundColor: 'darkseagreen' }} >
                        <Text>Kaydet</Text>
                    </Button>

                    <Button transparent block onPress={toggleModal} >
                        <Text style={{ textDecorationLine: 'underline', color: 'darkseagreen' }}>İptal</Text>
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
        fontSize: 20,
        marginBottom: 10


    },
    textDetail: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 10,
        fontSize: 20,
    }
});
export default EditAccountModal;